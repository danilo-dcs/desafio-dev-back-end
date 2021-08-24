import { IsString, IsOptional, IsNumberString, Length} from 'class-validator'

export class FilterDto {

  @IsOptional()
  @IsString()
  nomeCredor: string;

  @IsOptional()
  @IsNumberString()
  @Length(11)
  cpfCredor: string;

  @IsOptional()
  @IsString()
  statusCadastro: string;

}