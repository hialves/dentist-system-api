import { Injectable } from '@nestjs/common';
import { CreateProcedureHistoryDto } from './dto/create-procedure-history.dto';
import { UpdateProcedureHistoryDto } from './dto/update-procedure-history.dto';

@Injectable()
export class ProcedureHistoryService {
  create(createProcedureHistoryDto: CreateProcedureHistoryDto) {
    return 'This action adds a new procedureHistory';
  }

  findAll() {
    return `This action returns all procedureHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} procedureHistory`;
  }

  update(id: number, updateProcedureHistoryDto: UpdateProcedureHistoryDto) {
    return `This action updates a #${id} procedureHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} procedureHistory`;
  }
}
