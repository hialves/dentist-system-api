import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { StockCategoryService } from './stock-category.service'
import { CreateStockCategoryDto } from './dto/create-stock-category.dto'
import { UpdateStockCategoryDto } from './dto/update-stock-category.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { DataSource } from 'typeorm'

@Controller('stock-category')
export class StockCategoryController {
  constructor(private readonly service: StockCategoryService) {}

  @RequiredPermission(permissions.stockCategory.Create)
  @Post()
  async create(@Body() dto: CreateStockCategoryDto, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    const stockCategories = StockCategoryService.createEntities(dto)

    return this.service.create(stockCategories, await tenantDataSource)
  }

  @RequiredPermission(permissions.stockCategory.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.stockCategory.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.stockCategory.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStockCategoryDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.stockCategory.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
