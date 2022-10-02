import { PartialType } from '@nestjs/swagger'
import { CreateClientDto } from '../../client/dto/create-client.dto'

export class UpdateClinicDto extends PartialType(CreateClientDto) {}
