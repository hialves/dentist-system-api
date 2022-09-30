import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { Client } from './entities/client.entity'

@Injectable()
export class ClientService extends BaseService {
  constructor() {
    super()
  }

  async create(client: Client, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Client)
    await this.validateIfExists(
      [
        {
          where: { email: client.email },
          errorMessage: 'Email já cadastrado',
        },
        {
          where: { document: client.document },
          errorMessage: 'CPF já cadastrado',
        },
      ],
      repository,
    )

    return repository.save(client)
  }

  static createEntity(dto: CreateClientDto) {
    const client = new Client()
    client.document = dto.document
    client.email = dto.email
    client.name = dto.name
    client.phone = dto.phone

    return client
  }

  findAll(tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Client)
    return repository.find()
  }

  findOne(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Client)
    return repository.findOneBy({ id })
  }

  async update(id: number, dto: UpdateClientDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Client)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Client)
    return repository.delete({ id })
  }
}
