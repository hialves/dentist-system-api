import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { ClinicService } from './clinic.service'
import { CreateClinicDto } from './dto/create.dto'
import { UpdateClinicDto } from './dto/update-clinic.dto'

@Controller('clinic')
export class ClinicController {
  constructor(private readonly service: ClinicService) {}

  @RequiredPermission(permissions.clinic.Create)
  @Post()
  async create(@Body() dto: CreateClinicDto, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    const clinic = ClinicService.createEntity(dto)

    return this.service.create(clinic, await tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateClinicDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Read)
  @Get('employee/clinics/:employeeId')
  async getEmployeeClinics(
    @Param('employeeId') employeeId: string,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.getEmployeeClinics(+employeeId, await tenantDataSource)
  }
}
