import { Test, TestingModule } from '@nestjs/testing'
import { ClientProcedureService } from './client-procedure.service'
import dayjs from 'dayjs'

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

  describe('createEntities', () => {
    const data = {
      clientId: 1,
      clinicId: 2,
      employeeId: 3,
      procedureInfo: [
        { procedureDate: dayjs().toISOString(), procedureId: 4, value: 100, executed: false, receivedValue: true },
      ],
    }
    it('should contain all fields with same data', () => {
      const [r] = ClientProcedureService.createEntities(data)
      expect(r.clientId).toBeDefined()
      expect(r.clientId).toBe(data.clientId)
      expect(r.clinicId).toBeDefined()
      expect(r.clinicId).toBe(data.clinicId)
      expect(r.employeeId).toBeDefined()
      expect(r.employeeId).toBe(data.employeeId)
      expect(r.executed).toBeDefined()
      expect(r.executed).toBe(data.procedureInfo[0].executed)
      expect(r.procedureDate).toBeDefined()
      expect(r.procedureDate).toBe(data.procedureInfo[0].procedureDate)
      expect(r.procedureId).toBeDefined()
      expect(r.procedureId).toBe(data.procedureInfo[0].procedureId)
      expect(r.value).toBeDefined()
      expect(r.value).toBe(data.procedureInfo[0].value)
      expect(r.receivedValue).toBeDefined()
      expect(r.receivedValue).toBe(data.procedureInfo[0].receivedValue)
    })
  })
})
