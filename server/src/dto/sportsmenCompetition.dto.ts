import { IsString, IsDate, IsOptional, IsNumber} from 'class-validator';




export class CreateSportsmenCompetitionDto {

    @IsNumber()
    sportsmenId: number

    @IsNumber()
    sportTypeId: number

    @IsNumber()
    competitionId: number

    @IsOptional()
    @IsNumber()
    place: number

    @IsOptional()
    @IsNumber()
    result: number

    @IsString()
    ageGroup: string

}

export class UpdateSportsmenCompetitionDto {
     @IsNumber()
    sportsmenId: number

    @IsNumber()
    sportTypeId: number

    @IsNumber()
    competitionId: number

    @IsOptional()
    @IsNumber()
    place: number

    @IsOptional()
    @IsNumber()
    result: number

    @IsOptional()
    @IsString()
    ageGroup: string

}

export class DeleteSportsmenCompetitionDto {
    @IsNumber()
    sportsmenId: number

    @IsNumber()
    sportTypeId: number

    @IsNumber()
    competitionId: number
}
