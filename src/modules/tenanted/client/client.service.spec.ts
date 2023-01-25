import { Test, TestingModule } from '@nestjs/testing'
import { ClientService } from './client.service'
import { DataSourceMock } from '../../../test/utils/data-source.mock'
import { DataSource } from 'typeorm'
import { Client } from './entities/client.entity'
import { InMemoryTypeormTestingDatabase } from '../../../test/utils/in-memory-db'
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception'
import { join } from 'path'

describe('ClientService', () => {
  let service: ClientService
  let tenantDataSource: DataSource

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ClientService, DataSourceMock],
    }).compile()

    service = module.get<ClientService>(ClientService)
    tenantDataSource = module.get(DataSource)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should throw BadRequestException if email is already used', async () => {
      const client = new Client()
      client.name = 'name'
      client.email = 'test@test.com'
      client.document = '12345678900'
      const dataSource = await InMemoryTypeormTestingDatabase()
      const repo = dataSource.getRepository(Client)
      await repo.save(client)
      try {
        await service.create(client, dataSource)
        expect(true).toBe(false)
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
        expect(e.status).toBe(400)
      }
    })
  })
})
