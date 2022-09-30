import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { CreateExamDto } from './dto/create-exam.dto'
import { UpdateExamDto } from './dto/update-exam.dto'
import { Exam } from './entities/exam.entity'

@Injectable()
export class ExamsService {
  create(createExamDto: CreateExamDto) {
    return 'This action adds a new exam'
  }

  findAll(tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Exam)
    return repository.find()
  }

  findOne(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Exam)
    return repository.findOneBy({ id })
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Exam)
    return repository.delete({ id })
  }
}
