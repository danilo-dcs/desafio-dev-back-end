import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnteDevedorEntity } from './devedor.entity';
import { CreateEnteDevedorDto } from './dto/create-ente-devedor.dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class DevedorService {
  constructor(
    @InjectRepository(EnteDevedorEntity)
    private readonly devedorRepository: Repository<EnteDevedorEntity>,
  ){}


    async getAll(filter: FilterDto): Promise<EnteDevedorEntity[]>{

      const query = this.devedorRepository.createQueryBuilder('devedor');

      if(filter.nomeEnteDevedor)
        query.andWhere("devedor.nomeEnteDevedor = :value", {value: filter.nomeEnteDevedor} );
      if(filter.cnpjEnteDevedor)
        query.andWhere("devedor.cnpjEnteDevedor = :value", {value: filter.cnpjEnteDevedor} );

      return query.getMany();
    }

    async getById(devedorId: string): Promise<EnteDevedorEntity>{
      const response = this.devedorRepository.findOne(devedorId);

      if(!response)
        throw new NotFoundException("Ente-Devedor não encontrado");

      return response;
    }

    async create(devedorPyload: CreateEnteDevedorDto){
      let item = new CreateEnteDevedorDto();

      item.nomeEnteDevedor = devedorPyload.nomeEnteDevedor;
      item.cnpjEnteDevedor = devedorPyload.cnpjEnteDevedor;

      this.devedorRepository.create(item);
    }

    async update(devedorId: string, devedorPayload: CreateEnteDevedorDto){
      const response = this.getById(devedorId);
      if(response)
        this.devedorRepository.update(devedorId, devedorPayload);
    }

    async delete(devedorId: string){
      const response = this.getById(devedorId);
      if(response)
        this.devedorRepository.delete(devedorId);
    }
}
