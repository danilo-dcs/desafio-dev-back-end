import { IsString, IsNotEmpty, IsOptional, IsNumberString, Length} from 'class-validator'

export class CreateCredorDto {

  @IsNotEmpty()
  @IsString()
  nomeCredor: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(11)
  cpfCredor: string;

  @IsOptional()
  @IsString()
  statusCadastro: string;

}