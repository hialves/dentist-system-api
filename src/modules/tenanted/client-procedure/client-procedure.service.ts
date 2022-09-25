import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateClientProcedureDto } from './dto/create-client-procedure.dto'
import { UpdateClientProcedureDto } from './dto/update-client-procedure.dto'
import { ClientProcedure } from './entities/client-procedure.entity'

@Injectable()
export class ClientProcedureService {
  constructor(
    @InjectRepository(ClientProcedure)
    private readonly repo: Repository<ClientProcedure>,
  ) {}

  create(clientProcedures: ClientProcedure[]) {
    return this.repo.save(clientProcedures)
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

  findAll() {
    return `This action returns all clientProcedure`
  }

  findOne(id: number) {
    return `This action returns a #${id} clientProcedure`
  }

  update(id: number, dto: UpdateClientProcedureDto) {
    return `This action updates a #${id} clientProcedure`
  }

  remove(id: number) {
    return `This action removes a #${id} clientProcedure`
  }
}
