import { Controller, Get, Param } from '@nestjs/common'
import { ProcedureHistoryService } from './procedure-history.service'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'
import { TenantService } from '../../public/tenant/tenant.service'

@Controller('procedure-history')
export class ProcedureHistoryController {
  constructor(private readonly service: ProcedureHistoryService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.procedureHistory.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
  }

  @RequiredPermission(permissions.procedureHistory.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findOne(+id, tenantDataSource)
  }
}
