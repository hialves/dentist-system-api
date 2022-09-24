import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateMaterialDto } from './dto/create-material.dto'
import { UpdateMaterialDto } from './dto/update-material.dto'
import { Material } from './entities/material.entity'

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly repo: Repository<Material>,
  ) {}

  create(material: Material) {
    return this.repo.save(material)
  }

  static createEntity(dto: CreateMaterialDto) {
    const material = new Material()
    material.name = dto.name
    material.quantity = dto.quantity
    material.materialCategoryId = dto.materialCategoryId

    return material
  }

  findAll() {
    return `This action returns all material`
  }

  findOne(id: number) {
    return `This action returns a #${id} material`
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return `This action updates a #${id} material`
  }

  remove(id: number) {
    return `This action removes a #${id} material`
  }
}
