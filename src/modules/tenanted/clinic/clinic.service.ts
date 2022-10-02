import { Injectable } from '@nestjs/common'
import { DataSource, EntityManager } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateClinicDto } from './dto/create.dto'
import { UpdateClinicDto } from './dto/update-clinic.dto'
import { Clinic } from './entities/clinic.entity'

@Injectable()
export class ClinicService extends BaseService {
  constructor() {
    super(Clinic)
  }

  async create(clinic: Clinic, tenantDataSource: DataSource, t?: EntityManager) {
    return t ? t.save(clinic) : tenantDataSource.manager.save(clinic)
  }

  static createEntity(dto: CreateClinicDto) {
    const clinic = new Clinic()
    clinic.name = dto.name
    clinic.document = dto.document
    clinic.address = dto.address

    return clinic
  }

  async update(id: number, dto: UpdateClinicDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Clinic)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Clinic)
    return repository.softDelete({ id })
  }

  getEmployeeClinics(employeeId: number, tenantDataSource: DataSource): Promise<Clinic[]> {
    return tenantDataSource.getRepository(Clinic).find({ where: { employeeClinics: { active: true, employeeId } } })
  }
}
