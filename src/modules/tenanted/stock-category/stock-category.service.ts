import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateStockCategoryDto } from './dto/create-stock-category.dto'
import { UpdateStockCategoryDto } from './dto/update-stock-category.dto'
import { StockCategory } from './entities/stock-category.entity'

@Injectable()
export class StockCategoryService extends BaseService {
  constructor() {
    super(StockCategory)
  }

  create(stockCategories: StockCategory[], tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(StockCategory).save(stockCategories)
  }

  static createEntities(dto: CreateStockCategoryDto) {
    return dto.names.map((name) => {
      const stockCategory = new StockCategory()
      stockCategory.name = name

      return stockCategory
    })
  }

  async update(id: number, dto: UpdateStockCategoryDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(StockCategory)
    return repository.update({ id }, { name: dto.names[0] })
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(StockCategory)
    return repository.delete({ id })
  }
}
