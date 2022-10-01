import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MaterialCategoryService } from './material-category.service'
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto'
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { DataSource } from 'typeorm'

@Controller('material-category')
export class MaterialCategoryController {
  constructor(private readonly service: MaterialCategoryService) {}

  @RequiredPermission(permissions.materialCategory.Create)
  @Post()
  async create(@Body() dto: CreateMaterialCategoryDto, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    const materialCategories = MaterialCategoryService.createEntities(dto)

    return this.service.create(materialCategories, await tenantDataSource)
  }

  @RequiredPermission(permissions.materialCategory.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.materialCategory.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.materialCategory.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMaterialCategoryDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.materialCategory.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
