import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { permissions } from '../../config/permissions'
import { RequiredPermission } from '../../decorators/permission.decorator'
import { BudgetService } from './budget.service'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'

@Controller('budget')
export class BudgetController {
  constructor(private readonly service: BudgetService) {}

  @RequiredPermission(permissions.budget.Create)
  @Post()
  create(@Body() dto: CreateBudgetDto) {
    const budget = BudgetService.createEntity(dto)

    return this.service.create(budget, dto.procedureIds)
  }

  @RequiredPermission(permissions.budget.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.budget.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.budget.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBudgetDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.budget.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
