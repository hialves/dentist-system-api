import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ProcedureService } from './procedure.service'
import { CreateProcedureDto } from './dto/create-procedure.dto'
import { UpdateProcedureDto } from './dto/update-procedure.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { DataSource } from 'typeorm'

@Controller('procedure')
export class ProcedureController {
  constructor(private readonly service: ProcedureService) {}

  @RequiredPermission(permissions.procedure.Create)
  @Post()
  async create(@Body() dto: CreateProcedureDto, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    const procedure = ProcedureService.createEntity(dto)

    return this.service.create(procedure, await tenantDataSource)
  }

  @RequiredPermission(permissions.procedure.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.procedure.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.procedure.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProcedureDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.procedure.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
