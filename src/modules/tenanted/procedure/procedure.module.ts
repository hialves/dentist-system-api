import { Module } from '@nestjs/common'
import { ProcedureService } from './procedure.service'
import { ProcedureController } from './procedure.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Procedure } from './entities/procedure.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  controllers: [ProcedureController],
  providers: [ProcedureService],
})
export class ProcedureModule {}
