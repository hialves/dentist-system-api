import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ProcedureService } from './procedure.service'
import { CreateProcedureDto } from './dto/create-procedure.dto'
import { UpdateProcedureDto } from './dto/update-procedure.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'
import { TenantService } from '../../public/tenant/tenant.service'

@Controller('procedure')
export class ProcedureController {
  constructor(private readonly service: ProcedureService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.procedure.Create)
  @Post()
  async create(@Body() dto: CreateProcedureDto, @TenantSchema() tenantSchema: string) {
    const procedure = ProcedureService.createEntity(dto)
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.create(procedure, tenantDataSource)
  }

  @RequiredPermission(permissions.procedure.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
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
