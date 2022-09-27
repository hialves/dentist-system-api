import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Employee } from '../employee/entities/employee.entity'
import { EmployeeService } from '../employee/employee.service'
import { Admin } from '../admin/entities/admin.entity'
import { AdminService } from '../admin/admin.service'
import { IAccessToken, JwtPayload } from '../../../@types/custom'
import { EntityType } from '../../../@types'
import { DataSource, Repository } from 'typeorm'
import * as crypto from 'crypto'
import dayjs from 'dayjs'
import { MailService } from '../../../mail/mail.service'
import { hashPassword } from '../../../utils/hash-password'
import { EmployeeClinicService } from '../employee_clinic/employee-clinic.service'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => AdminService))
    private adminService: AdminService,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private dataSource: DataSource,
    private mailService: MailService,
    private employeeClinicService: EmployeeClinicService,
  ) {}

  async validateEntity(email: string, password: string, service: AdminService | EmployeeService): Promise<any> {
    const credentials = await service.getCredentials(email)
    const match = await bcrypt.compare(password, credentials.password)

    if (match) {
      const entity = await service.repository.findOne({
        where: { id: credentials.id },
        ...(service instanceof AdminService ? { relations: ['role'] } : {}),
      })
      return entity
    }
    return null
  }

  async login(entity: Admin | Employee) {
    let roleId = null
    if (entity instanceof Admin) {
      roleId = entity.roleId
    }

    const payload: IAccessToken = {
      id: entity.id,
      email: entity.email,
      roleId,
    }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

  async finalizeLoginEmployee(employee: JwtPayload, clinicId: number) {
    const employeeClinic = await this.employeeClinicService.findByEmployeeAndClinic(employee.id, clinicId)

    const payload: IAccessToken = {
      id: employee.id,
      email: employee.email,
      roleId: employeeClinic.roleId,
      clinicId: employeeClinic.clinicId,
    }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

  async sendRecoverPasswordEmail(entity: EntityType, email: string) {
    const resetToken = crypto.randomBytes(20).toString('hex')
    const token = crypto.createHash('sha256').update(resetToken).digest('hex')
    let user: {
      recoverPasswordToken?: string
      recoverPasswordTokenExpire?: string
    } = await this.getUserRepository(entity).findOneBy({ email })
    user.recoverPasswordToken = token
    user.recoverPasswordTokenExpire = dayjs().add(30, 'minute').toISOString()

    await this.dataSource.manager.save(user)
    await this.mailService.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      // TODO
      html: `
        <html>
          <body>
            <a href="${process.env.FRONT_END_DOMAIN}/recover-password?token=${token}">Recuperar senha</span>
            <br>
            <a href="${process.env.FRONT_END_DOMAIN}/recover-password?token=${token}">${process.env.FRONT_END_DOMAIN}/recover-password/${token}</span>
          </body>
        </html>`,
    })
  }

  async resetPassword(entity: EntityType, token: string, newPassword: string) {
    let user: {
      password: string
      recoverPasswordToken?: string
      recoverPasswordTokenExpire?: string
    } = await this.getUserRepository(entity).findOneBy({
      recoverPasswordToken: token,
    })

    if (user.recoverPasswordTokenExpire && dayjs().isAfter(dayjs(user.recoverPasswordTokenExpire))) {
      throw new BadRequestException('Token expirado')
    }

    user.password = await hashPassword(newPassword)
    user.recoverPasswordToken = null
    user.recoverPasswordTokenExpire = null
    await this.dataSource.manager.save(user)
  }

  getUserRepository(entity: EntityType): Repository<Admin> | Repository<Employee> {
    return {
      admin: this.adminService,
      employee: this.employeeService,
    }[entity].repository
  }
}
