import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RolePermissionService } from './role_permission.service'
import { CreateRolePermissionDto } from './dto/create-role_permission.dto'
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto'
import { permissions } from '../../config/permissions'
import { RequiredPermission } from '../../decorators/permission.decorator'

@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly service: RolePermissionService) {}

  @RequiredPermission(permissions.rolePermission.Create)
  @Post()
  create(@Body() dto: CreateRolePermissionDto) {
    return this.service.create(dto)
  }

  @RequiredPermission(permissions.rolePermission.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.rolePermission.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.rolePermission.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRolePermissionDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.rolePermission.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
