import { createMock } from '@golevelup/ts-jest'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BudgetItem } from '../../modules/budget-item/entities/budget-item.entity'
import { Budget } from '../../modules/budget/entities/budget.entity'

export const BudgetRepositoryMock = {
  provide: getRepositoryToken(Budget),
  useValue: createMock<Repository<Budget>>(),
}

export const BudgetItemRepositoryMock = {
  provide: getRepositoryToken(BudgetItem),
  useValue: createMock<Repository<BudgetItem>>(),
}
