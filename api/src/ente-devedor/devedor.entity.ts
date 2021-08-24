import { PagamentoEntity } from "src/pagamento/pagamento.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('devedor')
export class EnteDevedorEntity {

  @PrimaryGeneratedColumn('uuid', {
    name: 'id_ente_devedor'
  })
  idEnteDevedor: String;

  @Column({
    type: 'varchar',
    name: 'nome_ente_devedor'
  })
  nomeEnteDevedor: String;

  @Column({
    type: 'varchar', 
    name: 'cnpj_ente_devedor'
  })
  cnpjEnteDevedor: String;

  @OneToMany(
    () => PagamentoEntity, pagamento => pagamento.devedor
  )
  pagamento: PagamentoEntity;
}