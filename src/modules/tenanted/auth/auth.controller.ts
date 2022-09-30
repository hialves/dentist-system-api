import { Body, Controller, Param, Post, Query, Request, UseGuards } from '@nestjs/common'
import { Public } from '../../../decorators/public.decorator'
import { IRequest } from '../../../interfaces/request.interface'
import { MailService } from '../../../mail/mail.service'
import { TenantService } from '../../public/tenant/tenant.service'
import { CreateEmployeeDto } from '../employee/dto/create-employee.dto'
import { EmployeeService } from '../employee/employee.service'
import { AuthService } from './auth.service'
import { FinalizeLoginDto } from './dto/finalize-login.dto'
import { RecoverPasswordDto } from './dto/recover-password.dto'
import { EmployeeAuthGuard } from './employee-auth.guard'

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
    private readonly mailService: MailService,
    private tenantService: TenantService,
  ) {}

  @Public()
  @UseGuards(EmployeeAuthGuard)
  @Post('auth/employee/login/:schemaExternalRef')
  async employeeLogin(@Request() req) {
    const { tenantSchema, ...user } = req.user
    return this.authService.login(user, tenantSchema)
  }

  @Post('auth/employee/finalize-login')
  async employeeFinalizeLogin(@Request() req: IRequest, @Body() body: FinalizeLoginDto) {
    const tenantDataSource = await this.tenantService.getTenantConnection(req.user.tenantSchema)
    return this.authService.finalizeLoginEmployee(req.user, body.clinicId, tenantDataSource)
  }

  @Public()
  @Post('auth/employee/register/:schemaExternalRef')
  async employeeRegister(@Body() dto: CreateEmployeeDto, @Param('schemaExternalRef') schemaExternalRef: string) {
    const employee = await EmployeeService.createEntity(dto)
    const tenantDataSource = await this.tenantService.getTenantConnectionByExternalRef(schemaExternalRef)
    return this.employeeService.create(employee, tenantDataSource)
  }

  @Public()
  @Post('send-email-recover-password/:schemaExternalRef')
  async sendRecoverPassword(@Body() body: { email: string }, @Param('schemaExternalRef') schemaExternalRef: string) {
    const tenantDataSource = await this.tenantService.getTenantConnectionByExternalRef(schemaExternalRef)
    return this.authService.sendRecoverPasswordEmail(body.email, tenantDataSource)
  }

  @Public()
  @Post('recover-password/:schemaExternalRef')
  async recoverPassword(
    @Query('token') token: string,
    @Body() body: RecoverPasswordDto,
    @Param('schemaExternalRef') schemaExternalRef: string,
  ) {
    const tenantDataSource = await this.tenantService.getTenantConnectionByExternalRef(schemaExternalRef)
    return this.authService.resetPassword(token, body.password, tenantDataSource)
  }

  @Public()
  @Post('send-mail')
  sendMail(@Body() body: { to: string; subject: string; html: string }) {
    return this.mailService.sendMail(body)
  }
}
