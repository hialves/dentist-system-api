import { Test, TestingModule } from '@nestjs/testing'
import { ClientService } from './client.service'
import { DataSource, Repository } from 'typeorm'
import { Client } from './entities/client.entity'
import { InMemoryTypeormTestingDatabase } from '../../../test/utils/in-memory-db'
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception'

const getClient = () => {
  const client = new Client()
  client.name = 'name'
  client.email = 'test@test.com'
  client.document = '12345678900'
  return client
}

describe('ClientService', () => {
  let service: ClientService
  let dataSource: DataSource
  let repo: Repository<Client>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
    }).compile()

    service = module.get<ClientService>(ClientService)
    dataSource = await InMemoryTypeormTestingDatabase()
    repo = dataSource.getRepository(Client)
  })

  afterEach(async () => {
    await dataSource.dropDatabase()
    await dataSource.destroy()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should throw BadRequestException if email is already used', async () => {
      const client = getClient()
      await repo.save({ ...client, document: client.document + '0' })
      try {
        await service.create(client, dataSource)
        expect(true).toBe(false)
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
        expect(e.status).toBe(400)
        expect(e.response.message.length).toBe(1)
      }
    })

    it('should throw BadRequestException if document is already used', async () => {
      const client = getClient()
      await repo.save({ ...client, email: client.email + '0' })
      try {
        await service.create(client, dataSource)
        expect(true).toBe(false)
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
        expect(e.status).toBe(400)
        expect(e.response.message.length).toBe(1)
      }
    })

    it('should throw BadRequestException if email and document is already used', async () => {
      const client = getClient()
      await repo.save(client)
      try {
        await service.create(client, dataSource)
        expect(true).toBe(false)
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
        expect(e.status).toBe(400)
        expect(e.response.message.length).toBe(2)
      }
    })

    it('should not contain unset fields', async () => {
      let client = getClient()
      client.document = null
      client.phone = null
      await service.create(client, dataSource)
      expect(client.document).toBeNull()
      expect(client.phone).toBeNull()
    })

    it('should not allow creating a client without email', async () => {
      let client = getClient()
      client.email = null
      await expect(async () => await service.create(client, dataSource)).rejects.toThrow()
    })

    it('should create a Client successfully', async () => {
      const client = getClient()
      await service.create(client, dataSource)
      expect(client.id).toBeDefined()
      expect(client.id).toBeGreaterThan(0)
      expect(client.createdAt).toBeDefined()
      expect(client.createdAt).toBeInstanceOf(Date)
      expect(client.updatedAt).toBeDefined()
      expect(client.updatedAt).toBeInstanceOf(Date)
      expect(client.email).toBeDefined()
    })
  })

  describe('createEntity', () => {
    it('should not contain values when not passed', () => {
      const r = ClientService.createEntity({ email: 'test@test.com', name: 'test' })
      expect(r.document).toBeUndefined()
      expect(r.phone).toBeUndefined()
      expect(r.photo).toBeUndefined()
    })

    it('should contain all passed values', () => {
      const r = ClientService.createEntity({
        email: 'test@test.com',
        name: 'test',
        document: '12345',
        phone: '9999999999',
      })
      expect(r.email).toBeDefined()
      expect(r.name).toBeDefined()
      expect(r.document).toBeDefined()
      expect(r.phone).toBeDefined()
    })
  })
})
