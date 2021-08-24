import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreatePagamentoDto {

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  idCredor: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  idEnteDevedor: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)   // maior que 0
  valorInicial: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)     // maior que 0
  valorFinal: number;

  @IsNotEmpty()
  @IsString()
  statusRemessa: string;

  @IsOptional()
  @IsString()
  motivo: string;

}