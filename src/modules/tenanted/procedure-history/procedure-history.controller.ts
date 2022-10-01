import { Controller, Get, Param } from '@nestjs/common'
import { ProcedureHistoryService } from './procedure-history.service'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { DataSource } from 'typeorm'

@Controller('procedure-history')
export class ProcedureHistoryController {
  constructor(private readonly service: ProcedureHistoryService) {}

  @RequiredPermission(permissions.procedureHistory.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.procedureHistory.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }
}
