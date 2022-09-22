import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcedureHistoryService } from './procedure-history.service';
import { CreateProcedureHistoryDto } from './dto/create-procedure-history.dto';
import { UpdateProcedureHistoryDto } from './dto/update-procedure-history.dto';

@Controller('procedure-history')
export class ProcedureHistoryController {
  constructor(private readonly procedureHistoryService: ProcedureHistoryService) {}

  @Post()
  create(@Body() createProcedureHistoryDto: CreateProcedureHistoryDto) {
    return this.procedureHistoryService.create(createProcedureHistoryDto);
  }

  @Get()
  findAll() {
    return this.procedureHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procedureHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcedureHistoryDto: UpdateProcedureHistoryDto) {
    return this.procedureHistoryService.update(+id, updateProcedureHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procedureHistoryService.remove(+id);
  }
}
