import { Module } from '@nestjs/common'
import { ProcedureHistoryService } from './procedure-history.service'
import { ProcedureHistoryController } from './procedure-history.controller'

@Module({
  controllers: [ProcedureHistoryController],
  providers: [ProcedureHistoryService],
})
export class ProcedureHistoryModule {}
