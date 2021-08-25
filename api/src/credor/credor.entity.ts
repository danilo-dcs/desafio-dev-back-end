import { PagamentoEntity } from "src/pagamento/pagamento.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('credor')
export class CredorEntity{

  @PrimaryGeneratedColumn('uuid', {
    name: 'id_credor',
  })
  idCredor: string;

  @Column({
    type: 'varchar', 
    name: 'nome_credor'
  })
  nomeCredor: string;

  @Column({
    type: 'varchar', 
    name: 'cpf_credor'
  })
  cpfCredor: string;

  @Column({
    type: 'varchar', 
    name: 'status_cadastro'
  })
  statusCadastro: string;

  @OneToMany(
    () => PagamentoEntity, pagamento => pagamento.credor
  )
  pagamento: PagamentoEntity

}