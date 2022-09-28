import { Module } from '@nestjs/common'
import { BudgetService } from './budget.service'
import { BudgetController } from './budget.controller'
import { BudgetItemModule } from '../budget-item/budget-item.module'

@Module({
  imports: [BudgetItemModule],
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule {}
