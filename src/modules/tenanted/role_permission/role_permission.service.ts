import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { CreateRolePermissionDto } from './dto/create-role_permission.dto'
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto'
import { RolePermission } from './entities/role_permission.entity'

@Injectable()
export class RolePermissionService {
  create(createRolePermissionDto: CreateRolePermissionDto) {
    return 'This action adds a new rolePermission'
  }

  findAll(tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(RolePermission)
    return repository.find()
  }

  findOne(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(RolePermission)
    return repository.findOneBy({ id })
  }

  update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
    return `This action updates a #${id} rolePermission`
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(RolePermission)
    return repository.delete({ id })
  }
}
