import { Controller, Post, Body, Param, Delete } from '@nestjs/common'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'
import { TenantService } from '../../public/tenant/tenant.service'
import { BudgetItemService } from './budget-item.service'
import { CreateBudgetItemDto } from './dto/create-budget-item.dto'

@Controller('budget-item')
export class BudgetItemController {
  constructor(private readonly service: BudgetItemService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.budgetItem.Create)
  @Post()
  async create(@Body() dto: CreateBudgetItemDto, @TenantSchema() tenantSchema: string) {
    const budgetItems = BudgetItemService.createEntities(dto)
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.create(budgetItems, tenantDataSource)
  }

  @RequiredPermission(permissions.budgetItem.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
