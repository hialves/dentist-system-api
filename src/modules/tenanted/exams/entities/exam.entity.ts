import { Entity, ManyToOne } from 'typeorm'
import { Client } from '../../client/entities/client.entity'
import { ExamDomain } from './exam.domain'

@Entity('exam')
export class Exam extends ExamDomain {
  @ManyToOne(() => Client, (relation) => relation.exams)
  client: Client
}
