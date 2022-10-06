import { Injectable } from '@nestjs/common'
import { DataSource, EntityManager } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { Employee } from './entities/employee.entity'
import { hashPassword } from '../../../utils/hash-password'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { MailService } from '../../../mail/mail.service'

@Injectable()
export class EmployeeService extends BaseService {
  constructor(private mailService: MailService) {
    super(Employee)
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

  async createInternal(employee: Employee, originalPassword: string, tenantDataSource: DataSource, t?: EntityManager) {
    await tenantDataSource.manager.save(employee)
    await this.mailService.sendMail({
      to: employee.email,
      subject: 'Usuário criado',
      html: `<html><body><p>Usuário criado, realize o login com seu email e senha, sua senha temporária é ${originalPassword}</p></body></html>`,
    })

    return employee
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

  getCredentials(email: string, tenantDataSource: DataSource) {
    return tenantDataSource.getRepository(Employee).findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    })
  }

  async update(id: number, dto: UpdateEmployeeDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Employee)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Employee)
    return repository.softDelete({ id })
  }
}
