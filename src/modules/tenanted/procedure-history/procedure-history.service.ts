import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { ProcedureHistory } from './entities/procedure-history.entity'

@Injectable()
export class ProcedureHistoryService {
  findAll(tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(ProcedureHistory)
    return repository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} procedureHistory`
  }
}
