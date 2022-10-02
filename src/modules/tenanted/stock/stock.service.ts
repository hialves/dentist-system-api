import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateStockDto } from './dto/create-stock.dto'
import { UpdateStockDto } from './dto/update-stock.dto'
import { Stock } from './entities/stock.entity'

@Injectable()
export class StockService extends BaseService {
  constructor() {
    super(Stock)
  }

  create(stock: Stock, tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(Stock).save(stock)
  }

  static createEntity(dto: CreateStockDto) {
    const stock = new Stock()
    stock.name = dto.name
    stock.quantity = dto.quantity
    stock.stockCategoryId = dto.stockCategoryId

    return stock
  }

  async update(id: number, dto: UpdateStockDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Stock)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Stock)
    return repository.delete({ id })
  }
}
