import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateAdminDto } from './dto/create-admin.dto'
import { Admin } from './entities/admin.entity'
import { hashPassword } from '../../../utils/hash-password'
import { TenantService } from '../../public/tenant/tenant.service'

@Injectable()
export class AdminService extends BaseService<Admin> {
  constructor(
    @InjectRepository(Admin)
    private readonly repo: Repository<Admin>,
  ) {
    super(repo)
  }

  async create(dto: CreateAdminDto, tenantDataSource: DataSource) {
    await this.validateIfExists(
      {
        where: { email: dto.email },
        errorMessage: 'Email já cadastrado',
      },
      tenantDataSource.getRepository(Admin),
    )

    const hashedPassword = await hashPassword(dto.password)

    return this.repo.save({
      ...dto,
      password: hashedPassword,
    })
  }

  getCredentials(email: string) {
    return this.repo.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    })
  }
}
