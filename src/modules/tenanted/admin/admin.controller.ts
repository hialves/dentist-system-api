import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'

@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @RequiredPermission(permissions.admin.Create)
  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.service.create(dto)
  }

  @RequiredPermission(permissions.admin.Read)
  @Get()
  findAll(@Query() query: any) {
    // return this.service.findAll(query)
  }

  @RequiredPermission(permissions.admin.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.admin.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
    // return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.admin.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.service.remove(+id)
  }
}
