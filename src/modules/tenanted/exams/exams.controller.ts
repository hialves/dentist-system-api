import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ExamsService } from './exams.service'
import { CreateExamDto } from './dto/create-exam.dto'
import { UpdateExamDto } from './dto/update-exam.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'
import { TenantService } from '../../public/tenant/tenant.service'

@Controller('exams')
export class ExamsController {
  constructor(private readonly service: ExamsService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.exams.Create)
  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.service.create(createExamDto)
  }

  @RequiredPermission(permissions.exams.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
  }

  @RequiredPermission(permissions.exams.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.exams.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.service.update(+id, updateExamDto)
  }

  @RequiredPermission(permissions.exams.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
