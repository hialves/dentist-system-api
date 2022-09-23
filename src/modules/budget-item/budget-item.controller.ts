import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { permissions } from '../../config/permissions'
import { RequiredPermission } from '../../decorators/permission.decorator'
import { BudgetItemService } from './budget-item.service'
import { CreateBudgetItemDto } from './dto/create-budget-item.dto'
import { UpdateBudgetItemDto } from './dto/update-budget-item.dto'

@Controller('budget-item')
export class BudgetItemController {
  constructor(private readonly service: BudgetItemService) {}

  @RequiredPermission(permissions.budgetItem.Create)
  @Post()
  create(@Body() dto: CreateBudgetItemDto) {
    return this.service.create(dto)
  }

  @RequiredPermission(permissions.budgetItem.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.budgetItem.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.budgetItem.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBudgetItemDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.budgetItem.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
