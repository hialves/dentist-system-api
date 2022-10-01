import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateProcedureDto } from './dto/create-procedure.dto'
import { UpdateProcedureDto } from './dto/update-procedure.dto'
import { Procedure } from './entities/procedure.entity'

@Injectable()
export class ProcedureService extends BaseService {
  constructor() {
    super(Procedure)
  }

  create(procedure: Procedure, tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(Procedure).save(procedure)
  }

  static createEntity(dto: CreateProcedureDto) {
    const procedure = new Procedure()
    procedure.name = dto.name
    procedure.value = dto.value

    return procedure
  }

  async update(id: number, dto: UpdateProcedureDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Procedure)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Procedure)
    return repository.softDelete({ id })
  }
}
