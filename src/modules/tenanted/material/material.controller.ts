import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MaterialService } from './material.service'
import { CreateMaterialDto } from './dto/create-material.dto'
import { UpdateMaterialDto } from './dto/update-material.dto'
import { permissions } from '../../../config/permissions'
import { RequiredPermission } from '../../../decorators/permission.decorator'
import { TenantConnection } from '../../../decorators/tenant-connection.decorator'
import { DataSource } from 'typeorm'

@Controller('material')
export class MaterialController {
  constructor(private readonly service: MaterialService) {}

  @RequiredPermission(permissions.material.Create)
  @Post()
  async create(@Body() dto: CreateMaterialDto, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    const material = MaterialService.createEntity(dto)

    return this.service.create(material, await tenantDataSource)
  }

  @RequiredPermission(permissions.material.Read)
  @Get()
  async findAll(@TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findAll(await tenantDataSource)
  }

  @RequiredPermission(permissions.material.Read)
  @Get(':id')
  async findOne(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.findOne(+id, await tenantDataSource)
  }

  @RequiredPermission(permissions.material.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMaterialDto,
    @TenantConnection() tenantDataSource: Promise<DataSource>,
  ) {
    return this.service.update(+id, dto, await tenantDataSource)
  }

  @RequiredPermission(permissions.material.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string, @TenantConnection() tenantDataSource: Promise<DataSource>) {
    return this.service.remove(+id, await tenantDataSource)
  }
}
