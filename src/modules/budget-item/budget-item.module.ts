import { Module } from '@nestjs/common';
import { BudgetItemService } from './budget-item.service';
import { BudgetItemController } from './budget-item.controller';

@Module({
  controllers: [BudgetItemController],
  providers: [BudgetItemService]
})
export class BudgetItemModule {}
