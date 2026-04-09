import { IsString, IsDate, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSportsmanDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;
}

export class UpdateSportsmenDto {

  @IsNumber()
  sportsmenId: number

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;
}

export class DeleteSportsmenDto {
  @IsNumber()
  sportsmenId: number
}