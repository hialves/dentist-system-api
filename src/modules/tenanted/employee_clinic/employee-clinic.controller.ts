import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common'
import { EmployeeClinicService } from './employee-clinic.service'
import { UpdateEmployeeClinicDto } from './dto/update-employee-clinic.dto'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { permissions } from '../../../config/permissions'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { DataSource } from 'typeorm'

@Controller('employee-clinic')
export class EmployeeClinicController {
  constructor(private readonly service: EmployeeClinicService) {}

  @RequiredPermission(permissions.employeeClinic.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.employeeClinic.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.employeeClinic.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeClinicDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.employeeClinic.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
