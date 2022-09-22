import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { Procedure } from '../../procedure/entities/procedure.entity'

@Entity('procedure_history')
export class ProcedureHistory extends BaseEntity {
  @Column({ nullable: false })
  procedureId: number

  @Column('numeric', { nullable: true })
  previousValue?: number

  @Column('numeric', { nullable: true })
  newestValue?: number

  @ManyToOne(() => Procedure, (relation) => relation.procedureHistories)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_PROCEDURE_HISTORY_PROCEDURE_ID',
    name: 'procedureId',
    referencedColumnName: 'id',
  })
  procedure: Procedure
}
