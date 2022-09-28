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

  @RequiredPermission(permissions.clinic.Create)
  @Post('first-clinic')
  async createFirstClinic(@Body() dto: CreateFirstClinicDto) {
    // TODO: fix ''
    const tenantDataSource = await this.tenantService.getTenantConnection('')
    return this.service.createFirstClinic(dto, tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Create)
  @Post()
  async create(@Body() dto: CreateClinicDto, @TenantSchema() tenantSchema: string) {
    // TODO: fix ''
    console.log({ tenantSchema })
    const clinic = ClinicService.createEntity(dto)
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.create(clinic, tenantDataSource)
  }

  @RequiredPermission(permissions.clinic.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Public()
  @Get('employee/clinics/:employeeId')
  getEmployeeClinics(@Param('employeeId') employeeId: string) {
    return this.service.getEmployeeClinics(+employeeId)
  }

  @RequiredPermission(permissions.clinic.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.clinic.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClinicDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.clinic.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
