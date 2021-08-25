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
    
    query.innerJoinAndSelect('pagamento.credor', 'idCredor');
    query.innerJoinAndSelect('pagamento.devedor', 'idDevedor');

    return query.getMany();
  }

  async getById(idPagamento: string): Promise<PagamentoEntity>{

    const query = this.pagamentoRepository.createQueryBuilder('pagamento');
    
    query.addSelect("pagamento.idRemessa", "idPagamento");
    query.innerJoinAndSelect('pagamento.credor', 'idCredor');
    query.innerJoinAndSelect('pagamento.devedor', 'idDevedor');

    const response = query.getOne();

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
    item.statusRemessa = 'APROVADO';

    var statusMsg = "";


    // Verificações da regra de negócio

    if(!(item.credor.statusCadastro == "APROVADO"))       // se o cadastro do credor não foi aprovado
      statusMsg = "Solicitação de pagamento inválida! O cadastro do credor não foi aprovado.";
    else if(!item.devedor)                                // se não há ente devedor cadastrado
      statusMsg = "Solicitação de pagamento inválida! Não há ente decedor cadastrado.";
    else if(item.valorFinal > item.valorInicial)          // se o valor final não for menos que o valor inicial
      statusMsg = "Solicitação de pagamento inválida! Não há ente decedor cadastrado.";

    if(statusMsg){   // se a mensagem não for vazia
      item.motivo = statusMsg;
      item.statusRemessa = "REPROVADO"
    }

    // as regras de negócio 3 e 5 são verificadas automaticamente pela api, cada solicitação de pagamento
    // para um mesmo credor será diferente da outra, não há solicitações de pagamento repetidas visto que 
    // o id da remessa é uma chave primária
    // além disso, os valores inseridos devem ser obrigatoriamente maior do que 0, conforme validado no 
    // dto do pagamento. Caso contrário, não será cadastrado o pagamento
    
    this.pagamentoRepository.save(item);              // armazena a solicitação de pagamento com, 
        // caso a solicitação seja inálida o texto no campo "motivo" irá indicar o porquê.

    let msg = `Created`;
    throw new HttpException(msg, HttpStatus.CREATED);
  }

  async update(pagamentoId: string, pagamentoPayload: CreatePagamentoDto){

    const response = this.getById(pagamentoId);  // verfica se já existe
    
    if(response){

      let item = new PagamentoEntity;
      item.credor = await this.credorService.getById(pagamentoPayload.idCredor);
      item.devedor = await this.devedorService.getById(pagamentoPayload.idEnteDevedor);
      item.valorInicial = pagamentoPayload.valorInicial;
      item.valorFinal = pagamentoPayload.valorFinal;
      item.statusRemessa = pagamentoPayload.statusRemessa;
      item.motivo = pagamentoPayload.motivo;

      this.pagamentoRepository.update(pagamentoId, item);
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
