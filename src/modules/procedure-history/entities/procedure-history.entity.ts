import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Procedure } from '../../procedure/entities/procedure.entity'
import { ProcedureHistoryDomain } from './procedure-history.domain'

@Entity('procedure_history')
export class ProcedureHistory extends ProcedureHistoryDomain {
  @ManyToOne(() => Procedure, (relation) => relation.procedureHistories)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_PROCEDURE_HISTORY_PROCEDURE_ID',
    name: 'procedureId',
    referencedColumnName: 'id',
  })
  procedure: Procedure
}
