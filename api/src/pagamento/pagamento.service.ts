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


    // Verifica????es da regra de neg??cio

    if(!(item.credor.statusCadastro == "APROVADO"))       // se o cadastro do credor n??o foi aprovado
      statusMsg = "Solicita????o de pagamento inv??lida! O cadastro do credor n??o foi aprovado.";
    else if(!item.devedor)                                // se n??o h?? ente devedor cadastrado
      statusMsg = "Solicita????o de pagamento inv??lida! N??o h?? ente decedor cadastrado.";
    else if(item.valorFinal > item.valorInicial)          // se o valor final n??o for menos que o valor inicial
      statusMsg = "Solicita????o de pagamento inv??lida! N??o h?? ente decedor cadastrado.";

    if(statusMsg){   // se a mensagem n??o for vazia
      item.motivo = statusMsg;
      item.statusRemessa = "REPROVADO"
    }

    // as regras de neg??cio 3 e 5 s??o verificadas automaticamente pela api, cada solicita????o de pagamento
    // para um mesmo credor ser?? diferente da outra, n??o h?? solicita????es de pagamento repetidas visto que 
    // o id da remessa ?? uma chave prim??ria
    // al??m disso, os valores inseridos devem ser obrigatoriamente maior do que 0, conforme validado no 
    // dto do pagamento. Caso contr??rio, n??o ser?? cadastrado o pagamento
    
    this.pagamentoRepository.save(item);              // armazena a solicita????o de pagamento com, 
        // caso a solicita????o seja in??lida o texto no campo "motivo" ir?? indicar o porqu??.

    let msg = `Created`;
    throw new HttpException(msg, HttpStatus.CREATED);
  }

  async update(pagamentoId: string, pagamentoPayload: CreatePagamentoDto){

    const response = this.getById(pagamentoId);  // verfica se j?? existe
    
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
