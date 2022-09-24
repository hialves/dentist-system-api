import { Injectable } from '@nestjs/common'

@Injectable()
export class ProcedureHistoryService {
  findAll() {
    return `This action returns all procedureHistory`
  }

  findOne(id: number) {
    return `This action returns a #${id} procedureHistory`
  }
}
