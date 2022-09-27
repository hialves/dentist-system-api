import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { Employee } from './entities/employee.entity'
import { hashPassword } from '../../../utils/hash-password'
import { TenantService } from '../../public/tenant/tenant.service'

@Injectable()
export class EmployeeService extends BaseService<Employee> {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>,
    private tenantService: TenantService,
  ) {
    super(repo)
  }

  async create(employee: Employee, tenant: string, t?: EntityManager) {
    const tenantConnection = await this.tenantService.getTenantConnection(tenant)
    await this.validateIfExists(
      {
        where: {
          email: employee.email,
        },
        errorMessage: 'Email já cadastrado',
      },
      tenantConnection.getRepository(Employee),
    )

    return t ? t.save(employee) : tenantConnection.manager.save(employee)
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

  findOne(id: number) {
    return this.repo.findOne({ where: { id } })
  }

  getCredentials(email: string) {
    return this.repo.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    })
  }
}
