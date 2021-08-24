import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FilterDto } from 'src/ente-devedor/dto/filter.dto';
import { EnteDevedorEntity } from './devedor.entity';
import { DevedorService } from './devedor.service';
import { CreateEnteDevedorDto } from './dto/create-ente-devedor.dto';

@Controller('devedor')
export class DevedorController {

  constructor(private devedorService: DevedorService){}

  @Get()
  async getAll(@Query() filter: FilterDto) : Promise<EnteDevedorEntity[]>{
    return await this.devedorService.getAll(filter);
  }

  @Get(':id')
  async getById(@Param('id') idDevedor: string) : Promise<EnteDevedorEntity>{
    return await this.devedorService.getById(idDevedor);
  }

  @Post()
  async create(@Body() devedorPayload: CreateEnteDevedorDto){
    await this.devedorService.create(devedorPayload);
  }

  @Put(':id')
  async update(@Param('id') devedorId: string, @Body() devedorPayload: CreateEnteDevedorDto){
    await this.devedorService.update(devedorId, devedorPayload);
  }

  @Delete()
  async delete(@Param('id') devedorId: string){
    await this.devedorService.delete(devedorId);
  }
}
