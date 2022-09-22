import { Injectable } from '@nestjs/common';
import { CreateClientProcedureDto } from './dto/create-client-procedure.dto';
import { UpdateClientProcedureDto } from './dto/update-client-procedure.dto';

@Injectable()
export class ClientProcedureService {
  create(createClientProcedureDto: CreateClientProcedureDto) {
    return 'This action adds a new clientProcedure';
  }

  findAll() {
    return `This action returns all clientProcedure`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientProcedure`;
  }

  update(id: number, updateClientProcedureDto: UpdateClientProcedureDto) {
    return `This action updates a #${id} clientProcedure`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientProcedure`;
  }
}
