import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/pagamento/dto/filter.dto';
import { Repository } from 'typeorm';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { PagamentoEntity } from './pagamento.entity';

@Injectable()
export class PagamentoService {


  constructor(
    @InjectRepository(PagamentoEntity)
    private readonly pagamentoRepository: Repository<PagamentoEntity>,
  ){}

  async getAll(filter: FilterDto): Promise<PagamentoEntity[]>{
    const query = this.pagamentoRepository.createQueryBuilder('pagamento');

    if(filter.idCredor)
      query.andWhere("idCredor = :value", {value: filter.idCredor})
    if(filter.idEnteDevedor)
      query.andWhere("idEnteDevedor = :value", {value: filter.idEnteDevedor})
    if(filter.valorInicial)
      query.andWhere("statusRemessa = :value", {value: filter.valorInicial})
    if(filter.valorFinal)
      query.andWhere("statusRemessa = :value", {value: filter.valorFinal})
    if(filter.statusRemessa)
      query.andWhere("statusRemessa = :value", {value: filter.statusRemessa})

    return query.getMany();
  }

  async getById(idPagamento: string): Promise<PagamentoEntity>{
    const response = this.pagamentoRepository.findOne(idPagamento);

    if(!response)
      throw new NotFoundException('Pagamento não encontrado');
    
    return response;
  }

  async create(pagamentoPayload: CreatePagamentoDto){
    let item = new CreatePagamentoDto;

    item.idCredor = pagamentoPayload.idCredor;
    item.idEnteDevedor = pagamentoPayload.idEnteDevedor;
    item.valorInicial = pagamentoPayload.valorInicial;
    item.valorFinal = pagamentoPayload.valorFinal;
    item.statusRemessa = 'ATIVO';
    
    this.pagamentoRepository.create(item);

  }

  async update(pagamentoId: string, pagamentoPayload: CreatePagamentoDto){
    const response = this.getById(pagamentoId);
    if(response)
      this.pagamentoRepository.update(pagamentoId, pagamentoPayload);
  }

  async delete(pagamentoId: string){
    const response = this.getById(pagamentoId);
    if(response)
      this.pagamentoRepository.delete(pagamentoId);
  }

}
