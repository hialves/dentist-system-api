import { BadRequestException, Injectable } from '@nestjs/common'
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type'
import { DataSource, DeepPartial, DeleteResult, Repository } from 'typeorm'
import { BaseEntity } from './entity'

interface IValidateObject {
  where: {
    [key: string]: any
  }
  errorMessage: string
}

@Injectable()
export class BaseService {
  constructor(private entity: EntityClassOrSchema) {}

  async validateIfExists(
    validateObjects: IValidateObject[] | IValidateObject,
    repository: Repository<any>,
  ): Promise<void> {
    const errors = []
    const arrayToValidate = Array.isArray(validateObjects) ? [...validateObjects] : [validateObjects]

    for (const validate of arrayToValidate) {
      const exists = await this.handleIfExists(validate, repository)
      exists && errors.push(validate.errorMessage)
    }

    if (errors.length) throw new BadRequestException(errors)
  }

  async handleIfExists(validateObject: IValidateObject, repository: Repository<any>): Promise<string | boolean> {
    const { where, errorMessage } = validateObject
    const entity = await repository.findOne({
      where,
    })
    if (entity) return errorMessage
    return false
  }

  findAll(tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(this.entity)
    return repository.find()
  }

  findOne(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(this.entity)
    return repository.findOneBy({ id })
  }
}
