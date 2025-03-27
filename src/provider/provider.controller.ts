import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PermissionsGuard } from 'src/auth/guard/permissions.guard';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('create:Proveedores')
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('read:Proveedores')
  findAll() {
    return this.providerService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('read:Proveedores')
  findOne(@Param('id') id: string) {
    return this.providerService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('update:Poveedores')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providerService.update(+id, updateProviderDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('delete:Proveedores')
  remove(@Param('id') id: string) {
    return this.providerService.remove(+id);
  }
}
