import { Module } from '@nestjs/common';
import { ClientProcedureService } from './client-procedure.service';
import { ClientProcedureController } from './client-procedure.controller';

@Module({
  controllers: [ClientProcedureController],
  providers: [ClientProcedureService]
})
export class ClientProcedureModule {}
