import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MaterialService } from './material.service'
import { CreateMaterialDto } from './dto/create-material.dto'
import { UpdateMaterialDto } from './dto/update-material.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantService } from '../../public/tenant/tenant.service'
import { TenantSchema } from '../../../decorators/tenant-schema.decorator'

@Controller('material')
export class MaterialController {
  constructor(private readonly service: MaterialService, private tenantService: TenantService) {}

  @RequiredPermission(permissions.material.Create)
  @Post()
  async create(@Body() dto: CreateMaterialDto, @TenantSchema() tenantSchema: string) {
    const material = MaterialService.createEntity(dto)
    const tenantDataSource = await this.tenantService.getTenantConnection(tenantSchema)
    return this.service.create(material, tenantDataSource)
  }

  @RequiredPermission(permissions.material.Read)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @RequiredPermission(permissions.material.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @RequiredPermission(permissions.material.Update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMaterialDto) {
    return this.service.update(+id, dto)
  }

  @RequiredPermission(permissions.material.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
