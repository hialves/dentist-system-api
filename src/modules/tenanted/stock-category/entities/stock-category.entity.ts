import { Entity, OneToMany } from 'typeorm'
import { Stock } from '../../stock/entities/stock.entity'
import { StockCategoryDomain } from './stock-category.domain'

@Entity('stock_category')
export class StockCategory extends StockCategoryDomain {
  @OneToMany(() => Stock, (relation) => relation.stockCategory)
  stocks: Stock[]
}
