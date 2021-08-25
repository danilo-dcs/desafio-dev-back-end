import { PagamentoEntity } from "src/pagamento/pagamento.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('devedor')
export class EnteDevedorEntity {

  @PrimaryGeneratedColumn('uuid', {
    name: 'id_ente_devedor'
  })
  idEnteDevedor: string;

  @Column({
    type: 'varchar',
    name: 'nome_ente_devedor'
  })
  nomeEnteDevedor: string;

  @Column({
    type: 'varchar', 
    name: 'cnpj_ente_devedor'
  })
  cnpjEnteDevedor: string;

  @OneToMany(
    () => PagamentoEntity, pagamento => pagamento.devedor
  )
  pagamento: PagamentoEntity;
}