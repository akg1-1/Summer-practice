import { IsString, IsDate, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateCompetitionDto {

    @IsString()
    competitionName: string

    @IsDate()
    @Type(() => Date)
    competitionDate: Date;

    @IsNumber()
    cityId: number

}

export class UpdateCompetitionDto {
    @IsNumber()
    competitionId: number

    @IsOptional()
    @IsString()
    competitionName: string

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    competitionDate: Date;

    @IsOptional()
    @IsNumber()
    cityId: number

}

export class DeleteCompetitionDto {
    @IsNumber()
    competitionId: number
}
