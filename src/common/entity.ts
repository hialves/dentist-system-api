import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { isTestEnv } from '../test/utils/env'

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn({ type: isTestEnv ? 'datetime' : 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: isTestEnv ? 'datetime' : 'timestamp' })
  updatedAt: Date
}
