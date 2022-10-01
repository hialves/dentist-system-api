import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { ProcedureHistory } from './entities/procedure-history.entity'

@Injectable()
export class ProcedureHistoryService extends BaseService {
  constructor() {
    super(ProcedureHistory)
  }
}
