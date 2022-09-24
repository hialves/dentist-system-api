import { Module } from '@nestjs/common'
import { BudgetService } from './budget.service'
import { BudgetController } from './budget.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Budget } from './entities/budget.entity'
import { BudgetItemModule } from '../budget-item/budget-item.module'

@Module({
  imports: [TypeOrmModule.forFeature([Budget]), BudgetItemModule],
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule {}
