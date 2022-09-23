import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseService } from '../../common/service.repository'
import { CreateClientDto } from './dto/create-client.dto'
import { Client } from './entities/client.entity'

@Injectable()
export class ClientService extends BaseService<Client> {
  constructor(
    @InjectRepository(Client)
    private readonly repo: Repository<Client>,
  ) {
    super(repo)
  }

  async create(client: Client) {
    await this.validateIfExists([
      {
        where: { email: client.email },
        errorMessage: 'Email já cadastrado',
      },
      {
        where: { document: client.document },
        errorMessage: 'CPF já cadastrado',
      },
    ])

    return this.repo.save(client)
  }

  static createEntity(dto: CreateClientDto) {
    const client = new Client()
    Object.assign(client, dto)

    return client
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } })
  }
}
