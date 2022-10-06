import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { BaseService } from '../../../common/service.repository'
import { getPermissionsQuery } from '../../../config/permissions'
import { AppDataSourceTenant } from '../../../data-source.tenant'
import { generateRandomCharacters } from '../../../utils/random-characters'
import { removeSpecialValues } from '../../../utils/regex'
import { ClinicService } from '../../tenanted/clinic/clinic.service'
import { Clinic } from '../../tenanted/clinic/entities/clinic.entity'
import { EmployeeService } from '../../tenanted/employee/employee.service'
import { Employee } from '../../tenanted/employee/entities/employee.entity'
import { EmployeeClinicService } from '../../tenanted/employee_clinic/employee-clinic.service'
import { RoleSlugEnum } from '../../tenanted/role/entities/role.domain'
import { RoleService } from '../../tenanted/role/role.service'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { UpdateTenantDto } from './dto/update-tenant.dto'
import { Tenant } from './entities/tenant.entity'

@Injectable()
export class TenantService extends BaseService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Tenant)
    private readonly repo: Repository<Tenant>,
    private roleService: RoleService,
    private clinicService: ClinicService,
    private employeeService: EmployeeService,
    private employeeClinicService: EmployeeClinicService,
  ) {
    super(Tenant)
  }

  async create(tenant: Tenant, clinic: Clinic, employee: Employee) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const t = queryRunner.manager

    try {
      await queryRunner.manager.save(tenant)
      await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${tenant.schemaName}"`)

      const tenantDataSource = await TenantService.getTenantConnection(tenant.schemaName)
      await tenantDataSource.runMigrations()
      await this.firstQueriesNewTenant(tenantDataSource, tenant.schemaName)
      const role = await this.roleService.findOneBySlug(RoleSlugEnum.ClinicOwner, tenantDataSource)
      await this.employeeService.create(employee, tenantDataSource)
      await this.clinicService.create(clinic, tenantDataSource)
      const employeeClinic = EmployeeClinicService.createEntity(employee, clinic, role)
      await this.employeeClinicService.create(employeeClinic, tenantDataSource)

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
    tenant.name = dto.clinic.name
    tenant.schemaName = TenantService.createUniqueSchemaName(tenant)
    const formmatedTenantName = TenantService.getFormattedSchemaName(tenant.name)
    tenant.schemaExternalRef = await this.getValidSchemaExternalRef(formmatedTenantName, formmatedTenantName)

    return tenant
  }

  findAll() {
    return this.repo.find()
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id })
  }

  update(id: number, dto: UpdateTenantDto) {
    return this.repo.update(id, dto)
  }

  remove(id: number) {
    return this.repo.delete(id)
  }

  static createUniqueSchemaName(tenant: Tenant) {
    const tenantName = TenantService.getFormattedSchemaName(tenant.name)
    return `tenant_${tenantName}_${uuid()}`
  }

  static getFormattedSchemaName(value: string) {
    let tenantName = removeSpecialValues(value)
    tenantName = tenantName.split(' ').join('-')
    return tenantName.toLowerCase()
  }

  /**
   *
   * Used in signed calls
   */
  static async getTenantConnection(schemaName: string) {
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
      const randomCharacters = generateRandomCharacters(5)
      return `${originalName}-${randomCharacters}`
    }
  }

  async firstQueriesNewTenant(tenantDataSource: DataSource, schema: string) {
    await tenantDataSource.query(`
      CREATE OR REPLACE FUNCTION aux_function${schema.replace(/-/g, '_')}() RETURNS TRIGGER AS 
        $$
          BEGIN
            INSERT INTO "${schema}".role_permission ("roleId", "permissionId") VALUES (1, NEW.id);
            RETURN NEW;
          END;
        $$
      LANGUAGE 'plpgsql';
      `)

    await tenantDataSource.query(`
      CREATE OR REPLACE TRIGGER TRG_ON_ADD_PERMISSION_ADD_TO_ADMIN_ROLE_${schema.replace(
        /-/g,
        '_',
      )} AFTER INSERT ON "${schema}".permission
      FOR EACH ROW
      EXECUTE PROCEDURE aux_function${schema.replace(/-/g, '_')}()
    `)

    await tenantDataSource.query(`
      INSERT INTO "${schema}"."role"
      ("createdAt", "updatedAt", "name", slug)
      VALUES(now(), now(), 'Clinic Owner', '${RoleSlugEnum.ClinicOwner}'), (now(), now(), 'Employee Dentist', 'employee_dentist'), (now(), now(), 'Employee Manager', 'employee_manager');
    `)

    await tenantDataSource.query(getPermissionsQuery(schema))
  }
}
