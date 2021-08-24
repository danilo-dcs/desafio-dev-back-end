import { IsNotEmpty, IsOptional} from 'class-validator'

export class ListCredorDto {

  @IsNotEmpty()
  idCredor: string;

  @IsNotEmpty()
  nomeCredor: string;

  @IsNotEmpty()
  cpfCredor: string;

  @IsOptional()
  statusCadastro: string;

}