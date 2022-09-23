import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ProcedureHistoryService } from './procedure-history.service'
import { CreateProcedureHistoryDto } from './dto/create-procedure-history.dto'
import { UpdateProcedureHistoryDto } from './dto/update-procedure-history.dto'
import { permissions } from '../../config/permissions'
import { RequiredPermission } from '../../decorators/permission.decorator'

@Controller('procedure-history')
export class ProcedureHistoryController {
  constructor(private readonly service: ProcedureHistoryService) {}

  @RequiredPermission(permissions.procedureHistory.Create)
  @Post()
  create(@Body() dto: CreateProcedureHistoryDto) {
    return this.service.create(dto)
  }

  @RequiredPermission(permissions.procedureHistory.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.procedureHistory.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.procedureHistory.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProcedureHistoryDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.procedureHistory.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
