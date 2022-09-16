import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeClinicService } from './employee_clinic.service';
import { CreateEmployeeClinicDto } from './dto/create-employee_clinic.dto';
import { UpdateEmployeeClinicDto } from './dto/update-employee_clinic.dto';

@Controller('employee-clinic')
export class EmployeeClinicController {
  constructor(private readonly employeeClinicService: EmployeeClinicService) {}

  @Post()
  create(@Body() createEmployeeClinicDto: CreateEmployeeClinicDto) {
    return this.employeeClinicService.create(createEmployeeClinicDto);
  }

  @Get()
  findAll() {
    return this.employeeClinicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeClinicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeClinicDto: UpdateEmployeeClinicDto) {
    return this.employeeClinicService.update(+id, updateEmployeeClinicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeClinicService.remove(+id);
  }
}
