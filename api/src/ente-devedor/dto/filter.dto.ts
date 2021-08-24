import { IsNumberString, IsString, Length, IsOptional} from 'class-validator'

export class FilterDto{

  @IsOptional()
  @IsString()
  nomeEnteDevedor: string;

  @IsOptional()
  @IsNumberString()
  @Length(14)
  cnpjEnteDevedor: string;

}