import { Controller, Post, Body, Param, Delete } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { BudgetItemService } from './budget-item.service'
import { CreateBudgetItemDto } from './dto/create-budget-item.dto'

@Controller('budget-item')
export class BudgetItemController {
  constructor(private readonly service: BudgetItemService) {}

  @RequiredPermission(permissions.budgetItem.Create)
  @Post()
  async create(@Body() dto: CreateBudgetItemDto, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    const budgetItems = BudgetItemService.createEntities(dto)

    return this.service.create(budgetItems, await tenantDataSource)
  }

  @RequiredPermission(permissions.budgetItem.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
