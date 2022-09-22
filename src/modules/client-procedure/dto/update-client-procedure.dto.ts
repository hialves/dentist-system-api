import { PartialType } from '@nestjs/swagger';
import { CreateClientProcedureDto } from './create-client-procedure.dto';

export class UpdateClientProcedureDto extends PartialType(CreateClientProcedureDto) {}
