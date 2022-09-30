import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { Public } from '../../../decorators/public.decorator'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { permissions } from '../../../config/permissions'
import { TenantService } from '../../public/tenant/tenant.service'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService, private tenantService: TenantService) {}

  @Public()
  @Post(':tenant')
  async create(@Body() dto: CreateEmployeeDto, @Param(':tenant') tenant: string) {
    const employee = await EmployeeService.createEntity(dto)
    // TODO: fix ''
    const tenantDataSource = await this.tenantService.getTenantConnectionByExternalRef('')
    return this.service.create(employee, tenantDataSource)
  }

  @RequiredPermission(permissions.employee.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
  }

  @RequiredPermission(permissions.employee.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findOne(+id, tenantDataSource)
  }

  @RequiredPermission(permissions.employee.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    // return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.employee.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.remove(+id, tenantDataSource)
  }
}
