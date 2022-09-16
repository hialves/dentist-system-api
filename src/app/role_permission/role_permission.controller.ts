import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RolePermissionService } from './role_permission.service'
import { CreateRolePermissionDto } from './dto/create-role_permission.dto'
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto'

@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Post()
  create(@Body() dto: CreateRolePermissionDto) {
    return this.rolePermissionService.create(dto)
  }

  @Get()
  findAll() {
    return this.rolePermissionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolePermissionService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRolePermissionDto) {
    return this.rolePermissionService.update(+id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolePermissionService.remove(+id)
  }
}
