import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { StockCategory } from '../../stock-category/entities/stock-category.entity'
import { StockDomain } from './stock.domain'

@Entity('stock')
export class Stock extends StockDomain {
  @ManyToOne(() => StockCategory, (relation) => relation.stocks, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({
    foreignKeyConstraintName: 'FK_STOCK_STOCK_CATEGORY_ID',
    name: 'stockCategoryId',
    referencedColumnName: 'id',
  })
  stockCategory: StockCategory
}
