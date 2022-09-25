import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ExamsService } from './exams.service'
import { CreateExamDto } from './dto/create-exam.dto'
import { UpdateExamDto } from './dto/update-exam.dto'
import { permissions } from '../../config/permissions'
import { RequiredPermission } from '../../decorators/permission.decorator'

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @RequiredPermission(permissions.exams.Create)
  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto)
  }

  @RequiredPermission(permissions.exams.Read)
  @Get()
  findAll() {
    return this.examsService.findAll()
  }

  @RequiredPermission(permissions.exams.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(+id)
  }

  @RequiredPermission(permissions.exams.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(+id, updateExamDto)
  }

  @RequiredPermission(permissions.exams.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id)
  }
}
