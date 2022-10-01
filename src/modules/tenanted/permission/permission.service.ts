import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { Permission } from './entities/permission.entity'

@Injectable()
export class PermissionService extends BaseService {
  constructor() {
    super(Permission)
  }

  create(createPermissionDto: CreatePermissionDto) {
    return 'This action adds a new permission'
  }

  async update(id: number, dto: UpdatePermissionDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Permission)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Permission)
    return repository.delete({ id })
  }
}
