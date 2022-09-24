import { Test, TestingModule } from '@nestjs/testing'
import { ClientProcedureController } from './client-procedure.controller'
import { ClientProcedureService } from './client-procedure.service'

describe('ClientProcedureController', () => {
  let controller: ClientProcedureController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientProcedureController],
      providers: [ClientProcedureService],
    }).compile()

    controller = module.get<ClientProcedureController>(ClientProcedureController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
