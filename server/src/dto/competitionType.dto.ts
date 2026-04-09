import { IsString, IsDate, IsOptional, IsNumber, IsEnum } from 'class-validator';



export class CompetitionTypeDto {

    @IsNumber()
    competitionId: number

    @IsNumber()
    sportTypeId: number

}

