import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { Public } from '../../../decorators/public.decorator'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { permissions } from '../../../config/permissions'

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Public()
  @Post(':tenant')
  async create(@Body() dto: CreateEmployeeDto, @Param(':tenant') tenant: string) {
    const employee = await EmployeeService.createEntity(dto)
    return this.service.create(employee, tenant)
  }

  @RequiredPermission(permissions.employee.Read)
  @Get()
  findAll(@Query() query: any) {
    // return this.service.findAll(query)
  }

  @RequiredPermission(permissions.employee.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.employee.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    // return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.employee.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.service.remove(+id)
  }
}
