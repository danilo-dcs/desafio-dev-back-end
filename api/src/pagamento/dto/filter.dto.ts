import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class FilterDto {

  @IsOptional()
  @IsString()
  @IsUUID()
  idCredor: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  idEnteDevedor: string;

  @IsOptional()
  @IsNumber()
  @Min(1)   // maior que 0
  valorInicial: number;

  @IsOptional()
  @IsNumber()
  @Min(1)     // maior que 0
  valorFinal: number;

  @IsOptional()
  @IsString()
  statusRemessa: string;

  @IsOptional()
  @IsString()
  motivo: string;

}