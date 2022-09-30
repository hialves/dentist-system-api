import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'
import { TenantService } from '../../public/tenant/tenant.service'

@Controller('permission')
export class PermissionController {
  constructor(private readonly service: PermissionService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.permission.Create)
  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.service.create(dto)
  }

  @RequiredPermission(permissions.permission.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
  }

  @RequiredPermission(permissions.permission.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findOne(+id, tenantDataSource)
  }

  @RequiredPermission(permissions.permission.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.permission.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.remove(+id, tenantDataSource)
  }
}
