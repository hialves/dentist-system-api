import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'
import { TenantService } from '../../public/tenant/tenant.service'
import { ClientService } from './client.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'

@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.client.Create)
  @Post()
  async create(@Body() dto: CreateClientDto, @TenantSchema() tenantSchema: string) {
    const client = ClientService.createEntity(dto)
    const tenantDataSource = await this.tenantService.getTenantConnectionByExternalRef(tenantSchema)
    return this.service.create(client, tenantDataSource)
  }

  @RequiredPermission(permissions.client.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
  }

  @RequiredPermission(permissions.client.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findOne(+id, tenantDataSource)
  }

  @RequiredPermission(permissions.client.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    // return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.client.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.remove(+id, tenantDataSource)
  }
}
