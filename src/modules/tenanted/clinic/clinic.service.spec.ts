import { Test, TestingModule } from '@nestjs/testing'
import { ClinicService } from './clinic.service'
import { InMemoryTypeormTestingDatabase } from '../../../test/utils/in-memory-db'
import { Clinic } from './entities/clinic.entity'
import { DataSource, Repository } from 'typeorm'
import { Employee } from '../employee/entities/employee.entity'
import { generateRandomCharacters } from '../../../utils/random-characters'
import { EmployeeClinicService } from '../employee_clinic/employee-clinic.service'
import { RoleSlugEnum } from '../role/entities/role.domain'
import { seedRoles } from '../../../test/utils/seeds'
import { RoleModule } from '../role/role.module'
import { RoleService } from '../role/role.service'
import { EmployeeClinic } from '../employee_clinic/entities/employee-clinic.entity'

describe('ClinicService', () => {
  let service: ClinicService
  let roleService: RoleService
  let dataSource: DataSource
  let repo: Repository<Clinic>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RoleModule],
      providers: [ClinicService],
    }).compile()

    service = module.get<ClinicService>(ClinicService)
    roleService = module.get<RoleService>(RoleService)
    dataSource = await InMemoryTypeormTestingDatabase()
    repo = dataSource.getRepository(Clinic)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createEntities', () => {
    const data = {
      name: 'clinic',
      document: '9999999999999',
      address: 'street',
    }
    it('should contain all fields with same data', () => {
      const r = ClinicService.createEntity(data)
      expect(r.name).toBeDefined()
      expect(r.name).toBe(data.name)
      expect(r.document).toBeDefined()
      expect(r.document).toBe(data.document)
      expect(r.address).toBeDefined()
      expect(r.address).toBe(data.address)
    })
  })

  describe('getEmployeeClinics', () => {
    it('should return an array of clinics which the employee is assigned', async () => {
      await seedRoles(dataSource)
      const employeeRepo = dataSource.getRepository(Employee)
      const employeeClinicRepo = dataSource.getRepository(EmployeeClinic)
      const employee = new Employee()
      const clinic = new Clinic()
      employeeRepo.merge(employee, {
        document: '12345678900',
        email: 'employee@test.com',
        name: 'Employee 1',
        password: generateRandomCharacters(8),
      })
      repo.merge(clinic, { document: '999999999999', name: 'Clinic 1', address: 'Address test' })
      await employeeRepo.save(employee)
      await repo.save(clinic)
      const role = await roleService.findOneBySlug(RoleSlugEnum.ClinicOwner, dataSource)
      const employeeClinic = EmployeeClinicService.createEntity(employee, clinic, role)
      await employeeClinicRepo.save(employeeClinic)

      const result = await service.getEmployeeClinics(employee.id, dataSource)
      expect(result).toBeDefined()
      expect(Array.isArray(result) && result.length > 0).toBeTruthy()
      expect(result.every((item) => !item.deletedAt)).toBeTruthy()
    })
  })
})
