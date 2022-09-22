import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

enum ExamFileTypeEnum {
  Pdf = 'pdf',
  Image = 'image',
}

export class ExamDomain extends BaseEntity {
  @Column()
  clientId: number

  @Column()
  fileUrl: string

  @Column({ enum: ExamFileTypeEnum, enumName: 'EXAM_FILE_TYPE_ENUM' })
  fileType: ExamFileTypeEnum
}
