import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { permissions } from '../../../config/permissions'

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @RequiredPermission(permissions.role.Create)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.service.create(dto)
  }

  @RequiredPermission(permissions.role.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.role.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.role.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.role.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}