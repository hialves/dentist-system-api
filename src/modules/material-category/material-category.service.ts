import { Injectable } from '@nestjs/common';
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto';
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto';

@Injectable()
export class MaterialCategoryService {
  create(createMaterialCategoryDto: CreateMaterialCategoryDto) {
    return 'This action adds a new materialCategory';
  }

  findAll() {
    return `This action returns all materialCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materialCategory`;
  }

  update(id: number, updateMaterialCategoryDto: UpdateMaterialCategoryDto) {
    return `This action updates a #${id} materialCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} materialCategory`;
  }
}
