import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { BaseService } from '../../../common/service.repository'
import { AppDataSourceTenant } from '../../../data-source.tenant'
import { removeSpecialValues } from '../../../utils/regex'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { UpdateTenantDto } from './dto/update-tenant.dto'
import { Tenant } from './entities/tenant.entity'

@Injectable()
export class TenantService extends BaseService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Tenant)
    private readonly repo: Repository<Tenant>,
  ) {
    super()
  }

  async create(tenant: Tenant) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.save(tenant)
      await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${tenant.schemaName}"`)

      const tenantDataSource = await this.getTenantConnection(tenant.schemaName)
      // TODO: uncomment
      // await tenantDataSource.runMigrations()
      await tenantDataSource.destroy()
      await queryRunner.commitTransaction()

      return tenant
    } catch (e) {
      await this.dataSource.query(`DROP SCHEMA IF EXISTS "${tenant.schemaName}" CASCADE`)
      await queryRunner.rollbackTransaction()
      throw e
    } finally {
      await queryRunner.release()
    }
  }

  async createEntity(dto: CreateTenantDto) {
    const tenant = new Tenant()
    tenant.name = dto.name
    tenant.schemaName = TenantService.createUniqueSchemaName(tenant)
    const formmatedTenantName = TenantService.getFormattedSchemaName(tenant.name)
    tenant.schemaExternalRef = await this.getValidSchemaExternalRef(formmatedTenantName, formmatedTenantName)

    return tenant
  }

  findAll() {
    return `This action returns all tenant`
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`
  }

  static createUniqueSchemaName(tenant: Tenant) {
    const tenantName = TenantService.getFormattedSchemaName(tenant.name)
    return `tenant_${tenantName}_${uuid()}`
  }

  static getFormattedSchemaName(value: string) {
    let tenantName = removeSpecialValues(value)
    tenantName = tenantName.split(' ')[0]
    return tenantName.toLowerCase()
  }

  /**
   *
   * Used in signed calls
   */
  async getTenantConnection(schemaName: string) {
    const tenantDataSource = AppDataSourceTenant(schemaName)
    await tenantDataSource.initialize()

    return tenantDataSource
  }

  /**
   *
   * Used in non-signed calls
   */
  async getTenantConnectionByExternalRef(schemaExternalRef: string) {
    const tenant = await this.repo.findOneBy({ schemaExternalRef })
    const tenantDataSource = AppDataSourceTenant(tenant.schemaName)
    await tenantDataSource.initialize()

    return tenantDataSource
  }

  async getValidSchemaExternalRef(
    originalName: string,
    currentName: string,
    attemptNumber: number = 1,
  ): Promise<string> {
    const maxTries = 3
    if (attemptNumber <= maxTries) {
      const exists = await this.handleIfExists(
        {
          where: { schemaExternalRef: `${currentName}` },
          errorMessage: '',
        },
        this.repo,
      )

      if (exists !== false) {
        return this.getValidSchemaExternalRef(originalName, `${originalName}-${attemptNumber + 1}`, attemptNumber + 1)
      }

      return currentName
    } else {
      const randomCharacters = (Math.random() + 1).toString(36).slice(2, 7)
      return `${originalName}-${randomCharacters}`
    }
  }
}
