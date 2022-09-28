import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RoleSlugEnum } from './entities/role.domain'
import { Role } from './entities/role.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role'
  }

  findAll() {
    return `This action returns all role`
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id })
  }

  findOneBySlug(slug: RoleSlugEnum) {
    return this.repo.findOneBy({ slug })
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`
  }

  remove(id: number) {
    return `This action removes a #${id} role`
  }

  async getRolePermissions(roleId: number, tenantDataSource: DataSource): Promise<string[]> {
    const role = await tenantDataSource.getRepository(Role).findOne({
      where: { id: roleId },
      relations: ['rolePermissions', 'rolePermissions.permission'],
      cache: {
        id: 'getRolePermissions',
        milliseconds: 1000 * 30,
      },
    })

    return role?.rolePermissions?.map((item) => item.permission.name) || []
  }
}
