import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto'
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto'
import { MaterialCategory } from './entities/material-category.entity'

@Injectable()
export class MaterialCategoryService {
  constructor() {}

  create(materialCategories: MaterialCategory[], tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(MaterialCategory).save(materialCategories)
  }

  static createEntities(dto: CreateMaterialCategoryDto) {
    return dto.names.map((name) => {
      const materialCategory = new MaterialCategory()
      materialCategory.name = name

      return materialCategory
    })
  }

  findAll(tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(MaterialCategory)
    return repository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} materialCategory`
  }

  update(id: number, updateMaterialCategoryDto: UpdateMaterialCategoryDto) {
    return `This action updates a #${id} materialCategory`
  }

  remove(id: number) {
    return `This action removes a #${id} materialCategory`
  }
}
