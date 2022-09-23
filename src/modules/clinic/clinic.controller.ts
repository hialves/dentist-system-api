import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { permissions } from '../../config/permissions'
import { RequiredPermission } from '../../decorators/permission.decorator'
import { Public } from '../../decorators/public.decorator'
import { ClinicService } from './clinic.service'
import { CreateFirstClinicDto } from './dto/create-first-clinic.dto'
import { UpdateClinicDto } from './dto/update-clinic.dto'

@Controller('clinic')
export class ClinicController {
  constructor(private readonly service: ClinicService) {}

  @Public()
  @Post('first-clinic')
  create(@Body() dto: CreateFirstClinicDto) {
    return this.service.createFirstClinic(dto)
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
