import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { CreateClientProcedureDto } from './dto/create-client-procedure.dto'
import { UpdateClientProcedureDto } from './dto/update-client-procedure.dto'
import { ClientProcedure } from './entities/client-procedure.entity'

@Injectable()
export class ClientProcedureService {
  constructor() {}

  create(clientProcedures: ClientProcedure[], tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(ClientProcedure).save(clientProcedures)
  }

  static createEntities(dto: CreateClientProcedureDto) {
    return dto.procedureInfo.map((item) => {
      const clientProcedure = new ClientProcedure()
      clientProcedure.clientId = dto.clientId
      clientProcedure.clinicId = dto.clinicId
      clientProcedure.employeeId = dto.employeeId
      clientProcedure.startDate = item.startDate
      clientProcedure.endDate = item.endDate
      clientProcedure.executed = item.executed
      clientProcedure.receivedValue = item.receivedValue
      clientProcedure.value = item.value
      clientProcedure.procedureId = item.procedureId

      // TODO: validar startDate, endDate

      return clientProcedure
    })
  }

  findAll(tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(ClientProcedure)
    return repository.find()
  }

  findOne(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(ClientProcedure)
    return repository.findOneBy({ id })
  }

  update(id: number, dto: UpdateClientProcedureDto) {
    return `This action updates a #${id} clientProcedure`
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(ClientProcedure)
    return repository.delete({ id })
  }
}
