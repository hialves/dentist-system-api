import { Injectable, BadRequestException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Employee } from '../employee/entities/employee.entity'
import { EmployeeService } from '../employee/employee.service'
import { IAccessToken, JwtPayload } from '../../../@types/custom'
import { DataSource } from 'typeorm'
import * as crypto from 'crypto'
import dayjs from 'dayjs'
import { MailService } from '../../../mail/mail.service'
import { hashPassword } from '../../../utils/hash-password'
import { EmployeeClinicService } from '../employee_clinic/employee-clinic.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dataSource: DataSource,
    private mailService: MailService,
    private employeeClinicService: EmployeeClinicService,
  ) {}

  async validateEntity(
    email: string,
    password: string,
    service: EmployeeService,
    tenantDataSource: DataSource,
  ): Promise<any> {
    const credentials = await service.getCredentials(email, tenantDataSource)
    const match = await bcrypt.compare(password, credentials.password)

    if (match) {
      const entity = await service.findOne(credentials.id, tenantDataSource)

      return entity
    }
    return null
  }

  async login(entity: Employee, tenantSchema: string) {
    let roleId = null

    const payload: IAccessToken = {
      id: entity.id,
      email: entity.email,
      roleId,
      tenantSchema,
    }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

  async finalizeLoginEmployee(employee: JwtPayload, clinicId: number, tenantDataSource: DataSource) {
    const employeeClinic = await this.employeeClinicService.findByEmployeeAndClinic(
      employee.id,
      clinicId,
      tenantDataSource,
    )

    if (!employeeClinic) {
      throw new BadRequestException('Vínculo não encontrado ou vínculo inativo')
    }

    const payload: IAccessToken = {
      id: employee.id,
      email: employee.email,
      roleId: employeeClinic.roleId,
      clinicId: employeeClinic.clinicId,
      tenantSchema: employee.tenantSchema,
    }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

  async sendEmailRecoverPassword(email: string, tenantDataSource: DataSource) {
    const resetToken = crypto.randomBytes(20).toString('hex')
    const token = crypto.createHash('sha256').update(resetToken).digest('hex')
    let user: {
      recoverPasswordToken?: string
      recoverPasswordTokenExpire?: string
    } = await tenantDataSource.getRepository(Employee).findOneBy({ email })
    user.recoverPasswordToken = token
    user.recoverPasswordTokenExpire = dayjs().add(30, 'minute').toISOString()

    await this.dataSource.manager.save(user)
    await this.mailService.sendMail({
      to: email,
      subject: 'Recover your password',
      // TODO
      html: `
        <html>
          <body>
            <a href="${process.env.FRONT_END_DOMAIN}/recover-password?token=${token}">Recover Password</span>
            <br>
            <a href="${process.env.FRONT_END_DOMAIN}/recover-password?token=${token}">${process.env.FRONT_END_DOMAIN}/recover-password/${token}</span>
          </body>
        </html>`,
    })
  }

  async resetPassword(token: string, newPassword: string, tenantDataSource: DataSource) {
    let user: {
      password: string
      recoverPasswordToken?: string
      recoverPasswordTokenExpire?: string
    } = await tenantDataSource.getRepository(Employee).findOneBy({
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
}
