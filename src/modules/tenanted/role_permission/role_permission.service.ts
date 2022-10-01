import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateRolePermissionDto } from './dto/create-role_permission.dto'
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto'
import { RolePermission } from './entities/role_permission.entity'

@Injectable()
export class RolePermissionService extends BaseService {
  constructor() {
    super(RolePermission)
  }
  create(createRolePermissionDto: CreateRolePermissionDto) {
    return 'This action adds a new rolePermission'
  }

  async update(id: number, dto: UpdateRolePermissionDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(RolePermission)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(RolePermission)
    return repository.delete({ id })
  }
}
