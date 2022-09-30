import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { Public } from '../../../decorators/public.decorator'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'
import { TenantService } from '../../public/tenant/tenant.service'
import { ClinicService } from './clinic.service'
import { CreateFirstClinicDto } from './dto/create-first-clinic.dto'
import { CreateClinicDto } from './dto/create.dto'
import { UpdateClinicDto } from './dto/update-clinic.dto'

@Controller('clinic')
export class ClinicController {
  constructor(private readonly service: ClinicService, private tenantService: TenantService) {}

  @Public()
  @Post('first-clinic/:schemaExternalRef')
  async createFirstClinic(@Body() dto: CreateFirstClinicDto, @Param('schemaExternalRef') schemaExternalRef: string) {
    const tenantDataSource = await this.tenantService.getTenantConnectionByExternalRef(schemaExternalRef)
    return this.service.createFirstClinic(dto, tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Create)
  @Post()
  async create(@Body() dto: CreateClinicDto, @TenantSchema() tenantSchema: string) {
    const clinic = ClinicService.createEntity(dto)
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.create(clinic, tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findOne(+id, tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Update)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateClinicDto, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.update(+id, dto, tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.remove(+id, tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Read)
  @Get('employee/clinics/:employeeId')
  async getEmployeeClinics(@Param('employeeId') employeeId: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.getEmployeeClinics(+employeeId, tenantDataSource)
  }
}
