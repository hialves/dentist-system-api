import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MaterialCategoryService } from './material-category.service'
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto'
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantService } from '../../public/tenant/tenant.service'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'

@Controller('material-category')
export class MaterialCategoryController {
  constructor(private readonly service: MaterialCategoryService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.materialCategory.Create)
  @Post()
  async create(@Body() dto: CreateMaterialCategoryDto, @TenantSchema() tenantSchema: string) {
    const materialCategories = MaterialCategoryService.createEntities(dto)
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.create(materialCategories, tenantDataSource)
  }

  @RequiredPermission(permissions.materialCategory.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
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
