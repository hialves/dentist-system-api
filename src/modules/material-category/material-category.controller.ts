import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MaterialCategoryService } from './material-category.service'
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto'
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto'
import { permissions } from '../../config/permissions'
import { RequiredPermission } from '../../decorators/permission.decorator'

@Controller('material-category')
export class MaterialCategoryController {
  constructor(private readonly service: MaterialCategoryService) {}

  @RequiredPermission(permissions.materialCategory.Create)
  @Post()
  create(@Body() dto: CreateMaterialCategoryDto) {
    return this.service.create(dto)
  }

  @RequiredPermission(permissions.materialCategory.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.materialCategory.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.materialCategory.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMaterialCategoryDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.materialCategory.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
