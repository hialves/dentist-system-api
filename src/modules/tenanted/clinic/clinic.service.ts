import { Injectable } from '@nestjs/common'
import { DataSource, EntityManager } from 'typeorm'
import { EmployeeService } from '../employee/employee.service'
import { EmployeeClinicService } from '../employee_clinic/employee-clinic.service'
import { RoleSlugEnum } from '../role/entities/role.domain'
import { RoleService } from '../role/role.service'
import { ClinicFieldDto, CreateFirstClinicDto } from './dto/create-first-clinic.dto'
import { UpdateClinicDto } from './dto/update-clinic.dto'
import { Clinic } from './entities/clinic.entity'

@Injectable()
export class ClinicService {
  constructor(
    private employeeService: EmployeeService,
    private employeeClinicService: EmployeeClinicService,
    private roleService: RoleService,
  ) {}

  async createFirstClinic(dto: CreateFirstClinicDto, tenantDataSource: DataSource) {
    const employee = await EmployeeService.createEntity(dto.employee)
    const clinic = ClinicService.createEntity(dto.clinic)
    const role = await this.roleService.findOneBySlug(RoleSlugEnum.ClinicOwner, tenantDataSource)

    const queryRunner = tenantDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const t = queryRunner.manager

    try {
      await this.employeeService.create(employee, tenantDataSource, t)
      await this.create(clinic, tenantDataSource, t)

      const employeeClinic = EmployeeClinicService.createEntity(employee, clinic, role)
      await this.employeeClinicService.create(employeeClinic, tenantDataSource, t)

      await queryRunner.commitTransaction()
      return employee
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }

  async create(clinic: Clinic, tenantDataSource: DataSource, t?: EntityManager) {
    return t ? t.save(clinic) : tenantDataSource.manager.save(clinic)
  }

  static createEntity(dto: ClinicFieldDto) {
    const clinic = new Clinic()
    clinic.name = dto.name
    clinic.document = dto.document
    clinic.address = dto.address

    return clinic
  }

  findAll(tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Clinic)
    return repository.find()
  }

  findOne(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Clinic)
    return repository.findOneBy({ id })
  }

  async update(id: number, dto: UpdateClinicDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Clinic)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Clinic)
    return repository.delete({ id })
  }

  getEmployeeClinics(employeeId: number, tenantDataSource: DataSource): Promise<Clinic[]> {
    return tenantDataSource.getRepository(Clinic).find({ where: { employeeClinics: { active: true, employeeId } } })
  }
}
