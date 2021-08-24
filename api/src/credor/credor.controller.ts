import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
// import { ListCredorDto } from './dto/list-credor.dto';
import { CreateCredorDto } from './dto/create-credor.dto';
import { CredorService } from './credor.service';
import { FilterDto } from './dto/filter.dto';
import { CredorEntity } from './credor.entity';

@Controller('credor')
export class CredorController {

  constructor(private credorService: CredorService){}

  @Get()
  async getAll(@Query() filter: FilterDto): Promise<CredorEntity[]> {
    return await this.credorService.getAll(filter);
  }

  @Get(':id')
  async getById(@Param('id') idCredor: string): Promise<CredorEntity>{
    return await this.credorService.getById(idCredor);
  }

  @Post()
  async create(@Body() credorPayload: CreateCredorDto){
    await this.credorService.create(credorPayload);
  }

  @Put(':id')
  async update(@Param('id') idCredor:string , @Body() credorPayload: CreateCredorDto){
    await this.credorService.update(idCredor, credorPayload);
  }

  @Delete(':id')
  async delete(@Param('id') idCredor: string){
    await this.credorService.delete(idCredor);
  }

}
