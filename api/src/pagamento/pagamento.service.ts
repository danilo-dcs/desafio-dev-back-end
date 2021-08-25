import { HttpStatus, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/pagamento/dto/filter.dto';
import { Repository } from 'typeorm';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { PagamentoEntity } from './pagamento.entity';

import { CredorService } from '../credor/credor.service';
import { DevedorService } from '../ente-devedor/devedor.service';

@Injectable()
export class PagamentoService {


  constructor(
    @InjectRepository(PagamentoEntity)
    private readonly pagamentoRepository: Repository<PagamentoEntity>,
    private readonly credorService: CredorService,
    private readonly devedorService: DevedorService
  ){}

  async getAll(filter: FilterDto): Promise<PagamentoEntity[]>{
    const query = this.pagamentoRepository.createQueryBuilder('pagamento');

    if(filter.idCredor)
      query.andWhere("pagamento.idCredor = :value", {value: filter.idCredor})
    if(filter.idEnteDevedor)
      query.andWhere("pagamento.idEnteDevedor = :value", {value: filter.idEnteDevedor})
    if(filter.valorInicial)
      query.andWhere("pagamento.statusRemessa = :value", {value: filter.valorInicial})
    if(filter.valorFinal)
      query.andWhere("pagamento.statusRemessa = :value", {value: filter.valorFinal})
    if(filter.statusRemessa)
      query.andWhere("pagamento.statusRemessa = :value", {value: filter.statusRemessa})

    return query.getMany();
  }

  async getById(idPagamento: string): Promise<PagamentoEntity>{
    const response = this.pagamentoRepository.findOne(idPagamento);

    if(!response)
      throw new NotFoundException('Pagamento Not Found');
    
    return response;
  }

  async create(pagamentoPayload: CreatePagamentoDto){

    let item = new PagamentoEntity;
    item.credor = await this.credorService.getById(pagamentoPayload.idCredor);
    item.devedor = await this.devedorService.getById(pagamentoPayload.idEnteDevedor);
    item.valorInicial = pagamentoPayload.valorInicial;
    item.valorFinal = pagamentoPayload.valorFinal;
    item.statusRemessa = 'ATIVO';
    
    this.pagamentoRepository.save(item);
    let msg = `Created`;
    throw new HttpException(msg, HttpStatus.CREATED);
  }

  async update(pagamentoId: string, pagamentoPayload: CreatePagamentoDto){
    const response = this.getById(pagamentoId);
    if(response){
      this.pagamentoRepository.update(pagamentoId, pagamentoPayload);
      throw new HttpException(`Updated with success`, HttpStatus.ACCEPTED);
    }
  }

  async delete(pagamentoId: string){
    const response = this.getById(pagamentoId);
    if(response){
      this.pagamentoRepository.delete(pagamentoId);
      let msg = `Deleted with success`;
      throw new HttpException(msg, HttpStatus.OK);
    }
  }

}
