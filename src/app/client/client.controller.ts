import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { Public } from '../../decorators/public.decorator'
import { ClientService } from './client.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'

@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll(@Query() query: any) {
    return this.service.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  // @RequiredPermission(Role.Client)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
  //   return this.service.update(+id, dto)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
