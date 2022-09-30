import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RolePermissionService } from './role_permission.service'
import { CreateRolePermissionDto } from './dto/create-role_permission.dto'
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'
import { TenantService } from '../../public/tenant/tenant.service'

@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly service: RolePermissionService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.rolePermission.Create)
  @Post()
  create(@Body() dto: CreateRolePermissionDto) {
    return this.service.create(dto)
  }

  @RequiredPermission(permissions.rolePermission.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
  }

  @RequiredPermission(permissions.rolePermission.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findOne(+id, tenantDataSource)
  }

  @RequiredPermission(permissions.rolePermission.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRolePermissionDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.rolePermission.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.remove(+id, tenantDataSource)
  }
}
