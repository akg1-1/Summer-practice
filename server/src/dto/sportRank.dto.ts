import { IsString, IsDate, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

enum RankValue {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  KMS = 'KMS',
  MS = 'MS'
}

export class CreateRankDto {

  @IsNumber()
  sportsmenId: number

  @IsNumber()
  typeId: number

  @IsOptional()
  @IsEnum(RankValue, { message: 'Недопустимое значение региона. Допустимые значения: FIRST SECOND THIRD KMS MS ' })
  rank: RankValue;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  rankDate: Date;
}

export class UpdateRankDto {
  @IsNumber()
  sportsmenId: number

  @IsNumber()
  typeId: number

  @IsEnum(RankValue, { message: 'Недопустимое значение региона. Допустимые значения: FIRST SECOND THIRD KMS MS ' })
  rank: RankValue;

  @IsDate()
  @Type(() => Date)
  rankDate: Date;

}

export class DeleteRankDto {
  @IsNumber()
  sportsmenId: number

  @IsNumber()
  typeId: number
}
