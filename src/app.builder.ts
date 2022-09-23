import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { json } from 'express'
import { generateFolders } from './config/paths'

export async function appBuilder() {
  generateFolders()
  const app = await NestFactory.create(AppModule, { bodyParser: false })
  app.enableCors()
  app.use(json({ limit: '50mb' }))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  return app
}
