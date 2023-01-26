import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateClientProcedureDto } from './dto/create-client-procedure.dto'
import { UpdateClientProcedureDto } from './dto/update-client-procedure.dto'
import { ClientProcedure } from './entities/client-procedure.entity'

@Injectable()
export class ClientProcedureService extends BaseService {
  constructor() {
    super(ClientProcedure)
  }

  create(clientProcedures: ClientProcedure[], tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(ClientProcedure).save(clientProcedures)
  }

  static createEntities(dto: CreateClientProcedureDto) {
    return dto.procedureInfo.map((item) => {
      const clientProcedure = new ClientProcedure()
      clientProcedure.clientId = dto.clientId
      clientProcedure.clinicId = dto.clinicId
      clientProcedure.employeeId = dto.employeeId
      clientProcedure.procedureDate = item.procedureDate
      clientProcedure.executed = item.executed
      clientProcedure.receivedValue = item.receivedValue
      clientProcedure.value = item.value
      clientProcedure.procedureId = item.procedureId

      return clientProcedure
    })
  }

  async update(id: number, dto: UpdateClientProcedureDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(ClientProcedure)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(ClientProcedure)
    return repository.delete({ id })
  }
}
