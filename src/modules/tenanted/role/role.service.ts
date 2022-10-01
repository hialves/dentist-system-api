import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RoleSlugEnum } from './entities/role.domain'
import { Role } from './entities/role.entity'

@Injectable()
export class RoleService extends BaseService {
  constructor() {
    super(Role)
  }

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role'
  }

  findOneBySlug(slug: RoleSlugEnum, tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(Role).findOneBy({ slug })
  }

  async update(id: number, dto: UpdateRoleDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Role)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Role)
    return repository.softDelete({ id })
  }

  async getRolePermissions(roleId: number, tenantDataSource: DataSource): Promise<string[]> {
    const oneSec = 1000
    const seconds = oneSec * 30

    const role = await tenantDataSource.getRepository(Role).findOne({
      where: { id: roleId },
      relations: ['rolePermissions', 'rolePermissions.permission'],
      cache: {
        id: 'getRolePermissions',
        milliseconds: seconds,
      },
    })

    return role?.rolePermissions?.map((item) => item.permission.name) || []
  }
}
