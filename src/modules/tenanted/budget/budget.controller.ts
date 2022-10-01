import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { TenantService } from '../../public/tenant/tenant.service'
import { BudgetService } from './budget.service'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'

@Controller('budget')
export class BudgetController {
  constructor(private readonly service: BudgetService) {}

  @RequiredPermission(permissions.budget.Create)
  @Post()
  async create(@Body() dto: CreateBudgetDto, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    const budget = BudgetService.createEntity(dto)

    return this.service.create(budget, dto.procedureIds, await tenantDataSource)
  }

  @RequiredPermission(permissions.budget.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.budget.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.budget.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBudgetDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.budget.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
