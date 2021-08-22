import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CredorEntity } from "src/credor/credor.entity";
import { EnteDevedorEntity } from "src/ente-devedor/devedor.entity";

@Entity('pagamento')
export class PagamentoEntity{

  @PrimaryGeneratedColumn('uuid', {
    name: 'id_remessa'
  })
  idRemessa: string;

  @ManyToOne(
    () => CredorEntity, credor => credor.idCredor
  )
  idCredor: string;

  @ManyToOne(
    () => EnteDevedorEntity, devedor => devedor.idEnteDevedor
  )
  idEnteDevedor: string;

  @Column({
    type: 'float',
    name: 'valor_inicial'
  })
  valorInicial: number;

  @Column({
    type: 'float', 
    name: 'valor_final'
  })
  valorFinal: number;

  @Column({
    type: 'varchar', 
    name: 'status_remessa'
  })
  statusRemessa: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'data_criacao',
    default: () => 'CURRENT_TIMESTAMP',
  })
  data: string;

  @Column('varchar')
  motivo: string;

}