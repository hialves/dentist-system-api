import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { ClientProcedureService } from './client-procedure.service'
import { CreateClientProcedureDto } from './dto/create-client-procedure.dto'
import { UpdateClientProcedureDto } from './dto/update-client-procedure.dto'

@Controller('client-procedure')
export class ClientProcedureController {
  constructor(private readonly service: ClientProcedureService) {}

  @RequiredPermission(permissions.clientProcedure.Create)
  @Post()
  async create(@Body() dto: CreateClientProcedureDto, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    const clientProcedures = ClientProcedureService.createEntities(dto)

    return this.service.create(clientProcedures, await tenantDataSource)
  }

  @RequiredPermission(permissions.clientProcedure.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.clientProcedure.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.clientProcedure.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateClientProcedureDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.clientProcedure.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
