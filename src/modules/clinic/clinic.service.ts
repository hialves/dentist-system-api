import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'
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
    @InjectRepository(Clinic)
    private readonly repo: Repository<Clinic>,
    private employeeService: EmployeeService,
    private dataSource: DataSource,
    private employeeClinicService: EmployeeClinicService,
    private roleService: RoleService,
  ) {}

  async createFirstClinic(dto: CreateFirstClinicDto) {
    const employee = await EmployeeService.createEntity(dto.employee)
    const clinic = ClinicService.createEntity(dto.clinic)
    const role = await this.roleService.findOneBySlug(RoleSlugEnum.ClinicOwner)

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const t = queryRunner.manager

    try {
      await this.employeeService.create(employee, t)
      await this.create(clinic, t)

      const employeeClinic = EmployeeClinicService.createEntity(employee, clinic, role)
      await this.employeeClinicService.create(employeeClinic, t)

      await queryRunner.commitTransaction()
      return employee
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }

  async create(clinic: Clinic, t?: EntityManager) {
    return t ? t.save(clinic) : this.repo.save(clinic)
  }

  static createEntity(dto: ClinicFieldDto) {
    const clinic = new Clinic()
    clinic.name = dto.name
    clinic.document = dto.document
    clinic.address = dto.address

    return clinic
  }

  findAll() {
    return `This action returns all clinic`
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id })
  }

  update(id: number, updateClinicDto: UpdateClinicDto) {
    return `This action updates a #${id} clinic`
  }

  remove(id: number) {
    return `This action removes a #${id} clinic`
  }

  getEmployeeClinics(employeeId: number): Promise<Clinic[]> {
    return this.repo.find({ where: { employeeClinics: { active: true, employeeId } } })
  }
}
