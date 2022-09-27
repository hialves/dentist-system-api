import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TenantService } from './tenant.service'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { UpdateTenantDto } from './dto/update-tenant.dto'
import { Public } from '../../../decorators/public.decorator'

@Controller('tenant')
export class TenantController {
  constructor(private readonly service: TenantService) {}

  @Public()
  @Post()
  async create(@Body() dto: CreateTenantDto) {
    const tenant = await this.service.createEntity(dto)
    return this.service.create(tenant)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.service.update(+id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
