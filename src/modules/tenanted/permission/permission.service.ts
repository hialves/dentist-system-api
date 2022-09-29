import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { Permission } from './entities/permission.entity'

@Injectable()
export class PermissionService {
  create(createPermissionDto: CreatePermissionDto) {
    return 'This action adds a new permission'
  }

  findAll(tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Permission)
    return repository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`
  }

  remove(id: number) {
    return `This action removes a #${id} permission`
  }
}
