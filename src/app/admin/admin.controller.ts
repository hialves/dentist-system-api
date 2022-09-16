import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'

@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll(@Query() query: any) {
    return this.service.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.service.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
    // return this.service.update(+id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
