import { Controller, Get } from '@nestjs/common'

import { Public } from './decorators/public.decorator'
import { name, version } from '../package.json'

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  app() {
    return {
      name: `${name} v${version}`,
      version,
    }
  }
}
