import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { MaterialCategory } from '../../material-category/entities/material-category.entity'
import { MaterialDomain } from './material.domain'

@Entity('material')
export class Material extends MaterialDomain {
  @ManyToOne(() => MaterialCategory, (relation) => relation.materials, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({
    foreignKeyConstraintName: 'FK_MATERIAL_MATERIAL_CATEGORY_ID',
    name: 'materialCategoryId',
    referencedColumnName: 'id',
  })
  materialCategory: MaterialCategory
}
