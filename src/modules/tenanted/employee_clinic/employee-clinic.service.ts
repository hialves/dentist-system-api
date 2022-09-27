import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { Clinic } from '../clinic/entities/clinic.entity'
import { Employee } from '../employee/entities/employee.entity'
import { Role } from '../role/entities/role.entity'
import { UpdateEmployeeClinicDto } from './dto/update-employee-clinic.dto'
import { EmployeeClinic } from './entities/employee-clinic.entity'

@Injectable()
export class EmployeeClinicService extends BaseService<EmployeeClinic> {
  constructor(
    @InjectRepository(EmployeeClinic)
    private readonly repo: Repository<EmployeeClinic>,
  ) {
    super(repo)
  }

  async create(employeeClinic: EmployeeClinic, t?: EntityManager) {
    await this.validateIfExists({
      where: { employeeId: employeeClinic.employeeId, clinicId: employeeClinic.clinicId },
      errorMessage: 'Já existe um registro deste colaborador com a clínica',
    })

    return t ? t.save(employeeClinic) : await this.repo.save(employeeClinic)
  }

  static createEntity(employee: Employee, clinic: Clinic, role: Role) {
    const employeeClinic = new EmployeeClinic()
    employeeClinic.employee = employee
    employeeClinic.employeeId = employee.id
    employeeClinic.clinic = clinic
    employeeClinic.clinicId = clinic.id
    employeeClinic.role = role
    employeeClinic.roleId = role.id

    return employeeClinic
  }

  findAll() {
    return `This action returns all employeeClinic`
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeClinic`
  }

  update(id: number, dto: UpdateEmployeeClinicDto) {
    return `This action updates a #${id} employeeClinic`
  }

  remove(id: number) {
    return `This action removes a #${id} employeeClinic`
  }

  findByEmployeeAndClinic(employeeId: number, clinicId: number): Promise<EmployeeClinic | null> {
    return this.repo.findOneBy({ employeeId, clinicId, active: true })
  }
}