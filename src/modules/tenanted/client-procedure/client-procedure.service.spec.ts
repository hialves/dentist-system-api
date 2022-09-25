import { Test, TestingModule } from '@nestjs/testing'
import { ClientProcedureService } from './client-procedure.service'

describe('ClientProcedureService', () => {
  let service: ClientProcedureService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientProcedureService],
    }).compile()

    service = module.get<ClientProcedureService>(ClientProcedureService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
