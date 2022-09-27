import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'

@Controller('permission')
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  @RequiredPermission(permissions.permission.Create)
  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.service.create(dto)
  }

  @RequiredPermission(permissions.permission.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.permission.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.permission.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.permission.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
