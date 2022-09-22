import { Injectable } from '@nestjs/common'
import { CreateEmployeeClinicDto } from './dto/create-employee-clinic.dto'
import { UpdateEmployeeClinicDto } from './dto/update-employee-clinic.dto'

@Injectable()
export class EmployeeClinicService {
  create(dto: CreateEmployeeClinicDto) {
    return 'This action adds a new employeeClinic'
  }

  findAll() {
    return `This action returns all employeeClinic`
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeClinic`
  }

  update(id: number, dto: UpdateEmployeeClinicDto) {
    return `This action updates a #${id} employeeClinic`
  }

  remove(id: number) {
    return `This action removes a #${id} employeeClinic`
  }
}
