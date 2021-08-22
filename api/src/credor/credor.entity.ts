import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('credor')
export class CredorEntity{

  @PrimaryGeneratedColumn('uuid', {
    name: 'id_credor'
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

}