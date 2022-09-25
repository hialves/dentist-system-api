import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { EmployeeClinicService } from './employee-clinic.service'
import { UpdateEmployeeClinicDto } from './dto/update-employee-clinic.dto'
import { RequiredPermission } from '../../decorators/permission.decorator'
import { permissions } from '../../config/permissions'

@Controller('employee-clinic')
export class EmployeeClinicController {
  constructor(private readonly service: EmployeeClinicService) {}

  @RequiredPermission(permissions.employeeClinic.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.employeeClinic.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.employeeClinic.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeClinicDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.employeeClinic.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
