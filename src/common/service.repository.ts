import { BadRequestException, Injectable } from '@nestjs/common'
import { DeepPartial, DeleteResult, Repository } from 'typeorm'
import { BaseEntity } from './entity'

interface IValidateObject {
  where: {
    [key: string]: any
  }
  errorMessage: string
}

@Injectable()
export class BaseService<T> {
  private entity: Repository<any>

  constructor(entity: Repository<T>) {
    this.entity = entity
  }

  async validateIfExists(validateObjects: IValidateObject[] | IValidateObject): Promise<void> {
    const errors = []
    const arrayToValidate = Array.isArray(validateObjects) ? [...validateObjects] : [validateObjects]

    for (const validate of arrayToValidate) {
      const exists = await this.handleIfExists(validate)
      exists && errors.push(validate.errorMessage)
    }

    if (errors.length) throw new BadRequestException(errors)
  }

  async handleIfExists(validateObject: IValidateObject): Promise<string | boolean> {
    const { where, errorMessage } = validateObject
    const entity = await this.entity.findOne({
      where,
    })
    if (entity) return errorMessage
    return false
  }

  get repository() {
    return this.entity
  }
}
