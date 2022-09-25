import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseService } from '../../common/service.repository'
import { CreateAdminDto } from './dto/create-admin.dto'
import { Admin } from './entities/admin.entity'
import { hashPassword } from '../../utils/hash-password'

@Injectable()
export class AdminService extends BaseService<Admin> {
  constructor(
    @InjectRepository(Admin)
    private readonly repo: Repository<Admin>,
  ) {
    super(repo)
  }

  async create(dto: CreateAdminDto) {
    await this.validateIfExists({
      where: { email: dto.email },
      errorMessage: 'Email já cadastrado',
    })

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
