import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientProcedureService } from './client-procedure.service';
import { CreateClientProcedureDto } from './dto/create-client-procedure.dto';
import { UpdateClientProcedureDto } from './dto/update-client-procedure.dto';

@Controller('client-procedure')
export class ClientProcedureController {
  constructor(private readonly clientProcedureService: ClientProcedureService) {}

  @Post()
  create(@Body() createClientProcedureDto: CreateClientProcedureDto) {
    return this.clientProcedureService.create(createClientProcedureDto);
  }

  @Get()
  findAll() {
    return this.clientProcedureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProcedureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientProcedureDto: UpdateClientProcedureDto) {
    return this.clientProcedureService.update(+id, updateClientProcedureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientProcedureService.remove(+id);
  }
}
