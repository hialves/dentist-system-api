import { Module } from '@nestjs/common'
import { MaterialCategoryService } from './material-category.service'
import { MaterialCategoryController } from './material-category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MaterialCategory } from './entities/material-category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MaterialCategory])],
  controllers: [MaterialCategoryController],
  providers: [MaterialCategoryService],
})
export class MaterialCategoryModule {}
