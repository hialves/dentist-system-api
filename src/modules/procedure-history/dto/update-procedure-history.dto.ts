import { PartialType } from '@nestjs/swagger';
import { CreateProcedureHistoryDto } from './create-procedure-history.dto';

export class UpdateProcedureHistoryDto extends PartialType(CreateProcedureHistoryDto) {}
