import { IsString, IsDate, IsOptional, IsNumber, IsEnum } from 'class-validator';

enum Measure {
  METER = 'METER',
  SECOND = 'SECOND',
  KILOGRAM = 'KILOGRAM',
  POINTS = 'POINTS',
  MINUTES = 'MINUTES',
  HOURS = 'HOURS'
}

export class CreateTypeDto {
  @IsString()
  typeName: string;

  @IsOptional()
  @IsEnum(Measure, { message: 'Недопустимое значение региона. Допустимые значения: METER SECOND KILOGRAM POINTS MINUTES HOURS ' })
  measure: Measure;

  @IsOptional()
  @IsString()
  thirdSportCategory: string

  @IsOptional()
  @IsString()
  secondSportCategory: string

  @IsOptional()
  @IsString()
  firstSportCategory: string

  @IsOptional()
  @IsString()
  kms: string

  @IsOptional()
  @IsString()
  ms: string
}

export class UpdateTypeDto {
  @IsNumber()
  typeId: number

  @IsOptional()
  @IsString()
  typeName: string;

  @IsOptional()
  @IsEnum(Measure, { message: 'Недопустимое значение региона. Допустимые значения: METER SECOND KILOGRAM POINTS MINUTES HOURS ' })
  measure: Measure;

  @IsOptional()
  @IsString()
  thirdSportCategory: string

  @IsOptional()
  @IsString()
  secondSportCategory: string

  @IsOptional()
  @IsString()
  firstSportCategory: string

  @IsOptional()
  @IsString()
  kms: string

  @IsOptional()
  @IsString()
  ms: string

}

export class DeleteTypeDto {
  @IsNumber()
  typeId: number
}
