import { Controller, Get, Post, Body, Patch, Param, Delete, Query, forwardRef, Inject } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { Public } from '../../../decorators/public.decorator'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { permissions } from '../../../config/permissions'
import { TenantService } from '../../public/tenant/tenant.service'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { DataSource } from 'typeorm'
import { CreateEmployeeInternalDto } from './dto/create-employee-internal.dto'
import { generateRandomCharacters } from '../../../utils/random-characters'
import { LoggedUser } from '../../../decorators/logged-user.decorator'
import { JwtPayload } from '../../../@types/custom'

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.employee.Create)
  @Post('internal-create')
  async createInternal(
    @Body() dto: CreateEmployeeInternalDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    const password = generateRandomCharacters(8)
    const employee = await EmployeeService.createEntity({
      ...dto,
      password,
    })
    return this.service.createInternal(employee, password, await tenantDataSource)
  }

  @Public()
  @Post(':schemaExternalRef')
  async create(@Body() dto: CreateEmployeeDto, @Param(':schemaExternalRef') schemaExternalRef: string) {
    const employee = await EmployeeService.createEntity(dto)
    const tenantDataSource = await this.tenantService.getTenantConnectionByExternalRef(schemaExternalRef)
    return this.service.create(employee, tenantDataSource)
  }

  @Get('profile')
  async getProfile(@LoggedUser() user: JwtPayload, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(user.id, await tenantDataSource)
  }

  @RequiredPermission(permissions.employee.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.employee.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.employee.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.employee.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
