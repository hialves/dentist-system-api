import { Injectable } from '@nestjs/common'
import { DataSource, EntityManager } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { Employee } from './entities/employee.entity'
import { hashPassword } from '../../../utils/hash-password'

@Injectable()
export class EmployeeService extends BaseService {
  constructor() {
    super()
  }

  async create(employee: Employee, tenantDataSource: DataSource, t?: EntityManager) {
    await this.validateIfExists(
      {
        where: {
          email: employee.email,
        },
        errorMessage: 'Email já cadastrado',
      },
      tenantDataSource.getRepository(Employee),
    )

    return t ? t.save(employee) : tenantDataSource.manager.save(employee)
  }

  static async createEntity(dto: CreateEmployeeDto): Promise<Employee> {
    const employee = new Employee()
    employee.name = dto.name
    employee.email = dto.email
    employee.document = dto.document
    employee.password = await hashPassword(dto.password)
    employee.cro = dto.cro

    return employee
  }

  findAll(tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Employee)
    return repository.find()
  }

  findOne(id: number, tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(Employee).findOne({ where: { id } })
  }

  getCredentials(email: string, tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(Employee).findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    })
  }
}
