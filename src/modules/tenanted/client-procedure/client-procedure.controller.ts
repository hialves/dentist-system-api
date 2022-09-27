import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { ClientProcedureService } from './client-procedure.service'
import { CreateClientProcedureDto } from './dto/create-client-procedure.dto'
import { UpdateClientProcedureDto } from './dto/update-client-procedure.dto'

@Controller('client-procedure')
export class ClientProcedureController {
  constructor(private readonly service: ClientProcedureService) {}

  @RequiredPermission(permissions.clientProcedure.Create)
  @Post()
  create(@Body() dto: CreateClientProcedureDto) {
    const clientProcedures = ClientProcedureService.createEntities(dto)
    return this.service.create(clientProcedures)
  }

  @RequiredPermission(permissions.clientProcedure.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.clientProcedure.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.clientProcedure.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClientProcedureDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.clientProcedure.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
