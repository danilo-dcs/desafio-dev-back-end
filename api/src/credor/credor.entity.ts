import { PagamentoEntity } from "src/pagamento/pagamento.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('credor')
export class CredorEntity{

  @PrimaryGeneratedColumn('uuid', {
    name: 'id_credor',
  })
  idCredor: String;

  @Column({
    type: 'varchar', 
    name: 'nome_credor'
  })
  nomeCredor: String;

  @Column({
    type: 'varchar', 
    name: 'cpf_credor'
  })
  cpfCredor: String;

  @Column({
    type: 'varchar', 
    name: 'status_cadastro'
  })
  statusCadastro: String;

  @OneToMany(
    () => PagamentoEntity, pagamento => pagamento.credor
  )
  pagamento: PagamentoEntity

}