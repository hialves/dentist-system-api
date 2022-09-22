import { Entity, OneToMany } from 'typeorm'
import { Material } from '../../material/entities/material.entity'
import { MaterialCategoryDomain } from './material-category.domain'

@Entity('material_category')
export class MaterialCategory extends MaterialCategoryDomain {
  @OneToMany(() => Material, (relation) => relation.materialCategory)
  materials: Material[]
}
