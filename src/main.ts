import 'dotenv/config'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { appBuilder } from './app.builder'

async function bootstrap() {
  const app = await appBuilder()
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')

  await app.listen(port, () =>
    Logger.log(`Listening for API calls on port \x1b[33m${port} 💻\x1b[37m`, 'NestApplication'),
  )
}

bootstrap()
