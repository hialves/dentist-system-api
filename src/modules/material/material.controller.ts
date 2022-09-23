import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MaterialService } from './material.service'
import { CreateMaterialDto } from './dto/create-material.dto'
import { UpdateMaterialDto } from './dto/update-material.dto'
import { permissions } from '../../config/permissions'
import { RequiredPermission } from '../../decorators/permission.decorator'

@Controller('material')
export class MaterialController {
  constructor(private readonly service: MaterialService) {}

  @RequiredPermission(permissions.material.Create)
  @Post()
  create(@Body() dto: CreateMaterialDto) {
    return this.service.create(dto)
  }

  @RequiredPermission(permissions.material.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.material.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.material.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMaterialDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.material.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
