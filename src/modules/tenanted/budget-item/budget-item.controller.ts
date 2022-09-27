import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { BudgetItemService } from './budget-item.service'
import { CreateBudgetItemDto } from './dto/create-budget-item.dto'

@Controller('budget-item')
export class BudgetItemController {
  constructor(private readonly service: BudgetItemService) {}

  @RequiredPermission(permissions.budgetItem.Create)
  @Post()
  create(@Body() dto: CreateBudgetItemDto) {
    const budgetItems = BudgetItemService.createEntities(dto)
    return this.service.create(budgetItems)
  }

  @RequiredPermission(permissions.budgetItem.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
