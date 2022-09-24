import { Controller, Get, Param } from '@nestjs/common'
import { ProcedureHistoryService } from './procedure-history.service'
import { permissions } from '../../config/permissions'
import { RequiredPermission } from '../../decorators/permission.decorator'

@Controller('procedure-history')
export class ProcedureHistoryController {
  constructor(private readonly service: ProcedureHistoryService) {}

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
}
