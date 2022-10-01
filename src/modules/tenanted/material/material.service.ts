import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateMaterialDto } from './dto/create-material.dto'
import { UpdateMaterialDto } from './dto/update-material.dto'
import { Material } from './entities/material.entity'

@Injectable()
export class MaterialService extends BaseService {
  constructor() {
    super(Material)
  }

  create(material: Material, tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(Material).save(material)
  }

  static createEntity(dto: CreateMaterialDto) {
    const material = new Material()
    material.name = dto.name
    material.quantity = dto.quantity
    material.materialCategoryId = dto.materialCategoryId

    return material
  }

  async update(id: number, dto: UpdateMaterialDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Material)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Material)
    return repository.delete({ id })
  }
}
