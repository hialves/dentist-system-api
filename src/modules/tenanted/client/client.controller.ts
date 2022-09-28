import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantService } from '../../public/tenant/tenant.service'
import { ClientService } from './client.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'

@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.client.Create)
  @Post()
  async create(@Body() dto: CreateClientDto) {
    const client = ClientService.createEntity(dto)
    // TODO: fix ''
    const tenantDataSource = await this.tenantService.getTenantConnectionByExternalRef('')
    return this.service.create(client, tenantDataSource)
  }

  @RequiredPermission(permissions.client.Read)
  @Get()
  findAll(@Query() query: any) {
    // return this.service.findAll(query)
  }

  @RequiredPermission(permissions.client.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.client.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    // return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.client.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.service.remove(+id)
  }
}
