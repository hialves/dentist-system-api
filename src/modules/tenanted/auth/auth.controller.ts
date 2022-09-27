import { Body, Controller, Param, Post, Query, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { EntityType } from '../../../@types'
import { Public } from '../../../decorators/public.decorator'
import { IRequest } from '../../../interfaces/request.interface'
import { MailService } from '../../../mail/mail.service'
import { TenantService } from '../../public/tenant/tenant.service'
import { AdminService } from '../admin/admin.service'
import { CreateAdminDto } from '../admin/dto/create-admin.dto'
import { CreateEmployeeDto } from '../employee/dto/create-employee.dto'
import { EmployeeService } from '../employee/employee.service'
import { AuthService } from './auth.service'
import { FinalizeLoginDto } from './dto/finalize-login.dto'
import { RecoverPasswordDto } from './dto/recover-password.dto'
import { EmployeeAuthGuard } from './employee-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
    private readonly adminService: AdminService,
    private readonly mailService: MailService,
    private tenantService: TenantService,
  ) {}

  @Public()
  @UseGuards(EmployeeAuthGuard)
  @Post('auth/employee/login')
  async employeeLogin(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/employee/finalize-login')
  async employeeFinalizeLogin(@Request() req: IRequest, @Body() body: FinalizeLoginDto) {
    return this.authService.finalizeLoginEmployee(req.user, body.clinicId)
  }

  @Public()
  @Post('auth/employee/register/:tenant')
  async employeeRegister(@Body() dto: CreateEmployeeDto, @Param('tenant') tenant: string) {
    const employee = await EmployeeService.createEntity(dto)
    const tenantDataSource = await this.tenantService.getTenantConnection(tenant)
    return this.employeeService.create(employee, tenantDataSource)
  }

  @Public()
  @UseGuards(AuthGuard('admin'))
  @Post('auth/admin/login')
  async adminLogin(@Request() req) {
    return this.authService.login(req.user)
  }

  @Public()
  @Post('auth/admin/register')
  async adminRegister(@Body() dto: CreateAdminDto) {
    // TODO: fix ''
    const tenantDataSource = await this.tenantService.getTenantConnection('')
    return this.adminService.create(dto, tenantDataSource)
  }

  @Public()
  @Post('send-email-recover-password/:entity')
  sendRecoverPassword(@Param('entity') entity: EntityType, @Body() body: { email: string }) {
    return this.authService.sendRecoverPasswordEmail(entity, body.email)
  }

  @Public()
  @Post('recover-password/:entity')
  recoverPassword(
    @Param('entity') entity: EntityType,
    @Query('token') token: string,
    @Body() body: RecoverPasswordDto,
  ) {
    return this.authService.resetPassword(entity, token, body.password)
  }

  @Public()
  @Post('send-mail')
  sendMail(@Body() body: { to: string; subject: string; html: string }) {
    return this.mailService.sendMail(body)
  }
}
