import { Module } from '@nestjs/common'
import { ClientProcedureService } from './client-procedure.service'
import { ClientProcedureController } from './client-procedure.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientProcedure } from './entities/client-procedure.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ClientProcedure])],
  controllers: [ClientProcedureController],
  providers: [ClientProcedureService],
})
export class ClientProcedureModule {}
