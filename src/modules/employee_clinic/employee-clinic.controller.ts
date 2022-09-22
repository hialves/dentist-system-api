import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { EmployeeClinicService } from './employee-clinic.service'
import { CreateEmployeeClinicDto } from './dto/create-employee-clinic.dto'
import { UpdateEmployeeClinicDto } from './dto/update-employee-clinic.dto'

@Controller('employee-clinic')
export class EmployeeClinicController {
  constructor(private readonly service: EmployeeClinicService) {}

  @Post()
  create(@Body() service: CreateEmployeeClinicDto) {
    return this.service.create(service)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeClinicDto: UpdateEmployeeClinicDto) {
    return this.service.update(+id, updateEmployeeClinicDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
