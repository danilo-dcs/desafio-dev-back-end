import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { filter } from 'rxjs';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { FilterDto } from './dto/filter.dto';
import { PagamentoEntity } from './pagamento.entity';
import { PagamentoService } from './pagamento.service';

@Controller('pagamento')
export class PagamentoController {

  constructor( private pagamentoService: PagamentoService ){}


  @Get()
  async getAll(@Query() filter: FilterDto ) : Promise<PagamentoEntity[]>{
    return await this.pagamentoService.getAll(filter);
  }

  @Get(':id')
  async getById(@Param('id') pagamentoId: string ): Promise<PagamentoEntity>{
    return await this.pagamentoService.getById(pagamentoId);
  }

  @Post()
  async create(@Body() pagamentoPayload: CreatePagamentoDto ){
    await this.pagamentoService.create(pagamentoPayload);
  }

  @Put(':id')
  async update(@Param('id') pagamentoId: string, @Body() pagamentoPayload: CreatePagamentoDto ){
    await this.pagamentoService.update(pagamentoId, pagamentoPayload);
  }

  @Delete(':id')
  async delete(@Param('id') pagamentoId: string ){
    await this.pagamentoService.delete(pagamentoId);
  }
}
