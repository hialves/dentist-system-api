import { Module } from '@nestjs/common'
import { BudgetItemService } from './budget-item.service'
import { BudgetItemController } from './budget-item.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BudgetItem } from './entities/budget-item.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BudgetItem])],
  controllers: [BudgetItemController],
  providers: [BudgetItemService],
  exports: [BudgetItemService],
})
export class BudgetItemModule {}
