import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { Public } from '../../decorators/public.decorator'

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll(@Query() query: any) {
    return this.service.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    // return this.service.update(+id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
