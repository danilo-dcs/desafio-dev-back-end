import { HttpStatus, HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
        throw new NotFoundException("Ente-Devedor Not Found");

      return response;
    }

    async create(devedorPyload: CreateEnteDevedorDto){
      let item = new CreateEnteDevedorDto();

      item.nomeEnteDevedor = devedorPyload.nomeEnteDevedor;
      item.cnpjEnteDevedor = devedorPyload.cnpjEnteDevedor;

      this.devedorRepository.save(item);
      let msg = `Created`;
      throw new HttpException(msg, HttpStatus.CREATED);
    }

    async update(devedorId: string, devedorPayload: CreateEnteDevedorDto){
      const response = this.getById(devedorId);
      if(response)
        this.devedorRepository.update(devedorId, devedorPayload);
        throw new HttpException(`Updated with success`, HttpStatus.ACCEPTED);
    }

    async delete(devedorId: string){
      const response = this.getById(devedorId);
      if(response)
        this.devedorRepository.delete(devedorId);
        let msg = `Deleted with success`;
        throw new HttpException(msg, HttpStatus.OK);
    }
}
