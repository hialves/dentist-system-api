import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RolePermissionService } from './role_permission.service'
import { CreateRolePermissionDto } from './dto/create-role_permission.dto'
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { DataSource } from 'typeorm'

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
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.rolePermission.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.rolePermission.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRolePermissionDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.rolePermission.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
