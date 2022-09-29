import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'
import { TenantService } from '../../public/tenant/tenant.service'
import { BudgetService } from './budget.service'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'

@Controller('budget')
export class BudgetController {
  constructor(private readonly service: BudgetService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.budget.Create)
  @Post()
  async create(@Body() dto: CreateBudgetDto, @TenantSchema() tenantSchema: string) {
    const budget = BudgetService.createEntity(dto)
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)

    return this.service.create(budget, dto.procedureIds, tenantDataSource)
  }

  @RequiredPermission(permissions.budget.Read)
  @Get()
  async findAll(@TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findAll(tenantDataSource)
  }

  @RequiredPermission(permissions.budget.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.findOne(+id, tenantDataSource)
  }

  @RequiredPermission(permissions.budget.Update)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBudgetDto, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.update(+id, dto, tenantDataSource)
  }

  @RequiredPermission(permissions.budget.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantSchema() tenantSchema: string) {
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.remove(+id, tenantDataSource)
  }
}
