import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProcedureDto } from './dto/create-procedure.dto'
import { UpdateProcedureDto } from './dto/update-procedure.dto'
import { Procedure } from './entities/procedure.entity'

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(Procedure)
    private readonly repo: Repository<Procedure>,
  ) {}

  create(procedure: Procedure) {
    return this.repo.save(procedure)
  }

  static createEntity(dto: CreateProcedureDto) {
    const procedure = new Procedure()
    procedure.name = dto.name
    procedure.value = dto.value

    return procedure
  }

  findAll() {
    return `This action returns all procedure`
  }

  findOne(id: number) {
    return `This action returns a #${id} procedure`
  }

  update(id: number, updateProcedureDto: UpdateProcedureDto) {
    return `This action updates a #${id} procedure`
  }

  remove(id: number) {
    return `This action removes a #${id} procedure`
  }
}
