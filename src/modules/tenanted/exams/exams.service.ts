import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateExamDto } from './dto/create-exam.dto'
import { UpdateExamDto } from './dto/update-exam.dto'
import { Exam } from './entities/exam.entity'

@Injectable()
export class ExamsService extends BaseService {
  constructor() {
    super(Exam)
  }

  create(createExamDto: CreateExamDto) {
    return 'This action adds a new exam'
  }

  async update(id: number, dto: UpdateExamDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Exam)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Exam)
    return repository.delete({ id })
  }
}
