import { Body, Controller, Get, Post } from '@nestjs/common'

import { ClientService } from './modules/client/client.service'
import { CreateClientDto } from './modules/client/dto/create-client.dto'
import { Public } from './decorators/public.decorator'
import { name, version } from '../package.json'

@Controller()
export class AppController {
  constructor(private readonly clientService: ClientService) {}

  @Public()
  @Get()
  app() {
    return {
      name: `${name} v${version}`,
      version,
    }
  }

  @Public()
  @Post('auth/client/register')
  async clientRegister(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto)
  }
}
