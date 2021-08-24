import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredorEntity } from './credor.entity'
import { CreateCredorDto } from './dto/create-credor.dto';
import { FilterDto } from './dto/filter.dto';
// import { ListCredorDto } from './dto/list-credor.dto';

@Injectable()
export class CredorService {

  constructor(
    @InjectRepository(CredorEntity)
    private readonly credorRepository: Repository<CredorEntity>,
  ){}
  


  async getAll(filter: FilterDto): Promise<CredorEntity[]>{

    const query = this.credorRepository.createQueryBuilder('credor')

    if(filter.nomeCredor)
      query.andWhere("credor.nomeCredor = :value", { value: filter.nomeCredor })
    if(filter.cpfCredor)
      query.andWhere("credor.cpfCredor = :value", { value: filter.cpfCredor })
    if(filter.statusCadastro)
      query.andWhere("credor.statusCadastro = :value", { value: filter.statusCadastro })

    return query.getMany();
  }
  
  async getById(id: string): Promise<CredorEntity>{

    const response = await this.credorRepository.findOne(id);
    if(!response)
      throw new NotFoundException("Credor não encontrado");

    return response;
  }

  async create(credorPayload: CreateCredorDto){

    let item = new CreateCredorDto();
    item.nomeCredor = credorPayload.nomeCredor;
    item.cpfCredor = credorPayload.cpfCredor;
    item.statusCadastro = 'ATIVO';
    this.credorRepository.create(item);
  }

  async update(id: string, credorPayload: CreateCredorDto){
    const response = await this.getById(id);
    if(response)
      this.credorRepository.update(id, credorPayload);
  }

  async delete(id: string){
    const response = await this.getById(id);
    if(response)
      this.credorRepository.delete(id);
  }
}
