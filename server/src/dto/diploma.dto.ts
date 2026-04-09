import { IsNumber } from 'class-validator';

export class DiplomaDto {
    @IsNumber()
    sportsmenId: number

    @IsNumber()
    sportTypeId: number

    @IsNumber()
    competitionId: number
}