import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ProcedureService } from './procedure.service'
import { CreateProcedureDto } from './dto/create-procedure.dto'
import { UpdateProcedureDto } from './dto/update-procedure.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'

@Controller('procedure')
export class ProcedureController {
  constructor(private readonly service: ProcedureService) {}

  @RequiredPermission(permissions.procedure.Create)
  @Post()
  create(@Body() dto: CreateProcedureDto) {
    const procedure = ProcedureService.createEntity(dto)
    return this.service.create(procedure)
  }

  @RequiredPermission(permissions.procedure.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.procedure.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.procedure.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProcedureDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.procedure.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
