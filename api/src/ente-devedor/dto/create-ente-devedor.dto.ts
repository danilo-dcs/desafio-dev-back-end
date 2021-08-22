import { IsNotEmpty, IsNumberString, IsString, Length} from 'class-validator'

export class CreateEnteDevedorDto{

  @IsNotEmpty()
  @IsString()
  nomeEnteDevedor: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(14)
  cnpjEnteDevedor: string;

}