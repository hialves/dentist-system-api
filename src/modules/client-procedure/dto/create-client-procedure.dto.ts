import { ArrayNotEmpty, IsArray, IsISO8601, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

class ProcedureInfo {
  @IsNotEmpty()
  procedureId: number

  // numeric(7,2)
  @IsNotEmpty()
  @IsNumber()
  value: number

  @IsOptional()
  receivedValue?: boolean

  @IsOptional()
  executed?: boolean

  @IsNotEmpty()
  @IsISO8601()
  startDate: string

  @IsNotEmpty()
  @IsISO8601()
  endDate: string
}

export class CreateClientProcedureDto {
  @IsNotEmpty()
  clientId: number

  @IsNotEmpty()
  clinicId: number

  @IsNotEmpty()
  employeeId: number

  @ArrayNotEmpty()
  @IsArray()
  procedureInfo: ProcedureInfo[]
}
