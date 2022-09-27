import { Column } from 'typeorm'

export class CreateTenantDto {
  @Column()
  name: string
}
