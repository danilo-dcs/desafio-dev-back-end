import { IsNotEmpty, IsNumber, isNumber, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

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
  valorInicial: number;

  @IsNotEmpty()
  @IsNumber()
  valorFinal: number;

  @IsNotEmpty()
  @IsString()
  statusRemessa: string;

  @IsOptional()
  @IsString()
  motivo: string;

}