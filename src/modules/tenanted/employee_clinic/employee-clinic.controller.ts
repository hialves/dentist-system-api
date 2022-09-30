import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { EmployeeClinicService } from './employee-clinic.service'
import { UpdateEmployeeClinicDto } from './dto/update-employee-clinic.dto'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { permissions } from '../../../config/permissions'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'
import { TenantService } from '../../public/tenant/tenant.service'

@Controller('employee-clinic')
export class EmployeeClinicController {
  constructor(private readonly service: EmployeeClinicService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.employeeClinic.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
  }

  @RequiredPermission(permissions.employeeClinic.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findOne(+id, tenantDataSource)
  }

  @RequiredPermission(permissions.employeeClinic.Update)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeClinicDto, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.update(+id, dto, tenantDataSource)
  }

  @RequiredPermission(permissions.employeeClinic.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.remove(+id, tenantDataSource)
  }
}
