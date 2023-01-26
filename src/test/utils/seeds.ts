import { DataSource } from 'typeorm'
import { RoleSlugEnum } from '../../modules/tenanted/role/entities/role.domain'
import { Role } from '../../modules/tenanted/role/entities/role.entity'
import { RoleService } from '../../modules/tenanted/role/role.service'

export const roleSeeds = [
  { name: 'Clinic Owner', slug: RoleSlugEnum.ClinicOwner },
  { name: 'Employee Dentist', slug: RoleSlugEnum.EmployeeDentist },
  { name: 'Employee Manager', slug: RoleSlugEnum.EmployeeManager },
]

export const seedRoles = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Role)
  const entities = RoleService.createEntities(roleSeeds)
  await repo.save(entities)
}
