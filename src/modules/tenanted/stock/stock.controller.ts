import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { StockService } from './stock.service'
import { CreateStockDto } from './dto/create-stock.dto'
import { UpdateStockDto } from './dto/update-stock.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { DataSource } from 'typeorm'

@Controller('stock')
export class StockController {
  constructor(private readonly service: StockService) {}

  @RequiredPermission(permissions.stock.Create)
  @Post()
  async create(@Body() dto: CreateStockDto, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    const stock = StockService.createEntity(dto)

    return this.service.create(stock, await tenantDataSource)
  }

  @RequiredPermission(permissions.stock.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.stock.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.stock.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStockDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.stock.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
