import { DbService } from './db.service';
import { CreateSportsmanDto, DeleteSportsmenDto, UpdateSportsmenDto } from 'src/dto/sportsmen.dto';
import { CreateCityDto, DeleteCityDto, UpdateCityDto } from 'src/dto/city.dto';
import { CreateTypeDto, DeleteTypeDto, UpdateTypeDto } from 'src/dto/sportType.dto';
import { CreateRankDto, DeleteRankDto, UpdateRankDto } from 'src/dto/sportRank.dto';
import { CreateCompetitionDto, DeleteCompetitionDto, UpdateCompetitionDto } from 'src/dto/competition.dto';
import { CompetitionTypeDto } from 'src/dto/competitionType.dto';
import { CreateSportsmenCompetitionDto, DeleteSportsmenCompetitionDto, UpdateSportsmenCompetitionDto } from 'src/dto/sportsmenCompetition.dto';
import { ReportDto } from 'src/dto/report.dto';
import { DiplomaDto } from 'src/dto/diploma.dto';
export declare class DbController {
    private readonly dbService;
    constructor(dbService: DbService);
    gett(): Promise<string>;
    sportsmenCreate(data: CreateSportsmanDto): Promise<{
        sportsmenId: number;
        firstName: string;
        lastName: string;
        patronymic: string | null;
        birthDate: Date;
    }>;
    getAllSportsmens(): Promise<{
        sportsmenId: number;
        firstName: string;
        lastName: string;
        patronymic: string | null;
        birthDate: Date;
    }[]>;
    updateSportsmen(data: UpdateSportsmenDto): Promise<{
        sportsmenId: number;
        firstName: string;
        lastName: string;
        patronymic: string | null;
        birthDate: Date;
    }>;
    deleteSportsmen(data: DeleteSportsmenDto): Promise<{
        sportsmenId: number;
        firstName: string;
        lastName: string;
        patronymic: string | null;
        birthDate: Date;
    }>;
    sportTypeCreate(data: CreateTypeDto): Promise<{
        typeId: number;
        typeName: string;
        measure: import(".prisma/client").$Enums.Measure;
        thirdSportCategory: string | null;
        secondSportCategory: string | null;
        firstSportCategory: string | null;
        kms: string | null;
        ms: string | null;
    }>;
    getAllSportTypes(): Promise<{
        typeId: number;
        typeName: string;
        measure: import(".prisma/client").$Enums.Measure;
        thirdSportCategory: string | null;
        secondSportCategory: string | null;
        firstSportCategory: string | null;
        kms: string | null;
        ms: string | null;
    }[]>;
    updateSportType(data: UpdateTypeDto): Promise<{
        typeId: number;
        typeName: string;
        measure: import(".prisma/client").$Enums.Measure;
        thirdSportCategory: string | null;
        secondSportCategory: string | null;
        firstSportCategory: string | null;
        kms: string | null;
        ms: string | null;
    }>;
    deleteSportType(data: DeleteTypeDto): Promise<{
        typeId: number;
        typeName: string;
        measure: import(".prisma/client").$Enums.Measure;
        thirdSportCategory: string | null;
        secondSportCategory: string | null;
        firstSportCategory: string | null;
        kms: string | null;
        ms: string | null;
    }>;
    sportsmenRankCreate(data: CreateRankDto): Promise<{
        sportsmenId: number;
        sportTypeId: number;
        rankDate: Date | null;
        sportsmenRank: import(".prisma/client").$Enums.RankValue | null;
    }>;
    getAllSportsmenRank(): Promise<{
        sportsmenId: number;
        sportTypeId: number;
        rankDate: Date | null;
        sportsmenRank: import(".prisma/client").$Enums.RankValue | null;
    }[]>;
    updateSportsmenRank(data: UpdateRankDto): Promise<{
        sportsmenId: number;
        sportTypeId: number;
        rankDate: Date | null;
        sportsmenRank: import(".prisma/client").$Enums.RankValue | null;
    }>;
    deleteSportsmenRank(data: DeleteRankDto): Promise<{
        sportsmenId: number;
        sportTypeId: number;
        rankDate: Date | null;
        sportsmenRank: import(".prisma/client").$Enums.RankValue | null;
    }>;
    cityCreate(data: CreateCityDto): Promise<{
        cityName: string;
        region: import(".prisma/client").$Enums.Regions;
        cityId: number;
    }>;
    getAllCities(): Promise<{
        cityName: string;
        region: import(".prisma/client").$Enums.Regions;
        cityId: number;
    }[]>;
    UpdateCity(data: UpdateCityDto): Promise<{
        cityName: string;
        region: import(".prisma/client").$Enums.Regions;
        cityId: number;
    }>;
    deleteCity(data: DeleteCityDto): Promise<{
        cityName: string;
        region: import(".prisma/client").$Enums.Regions;
        cityId: number;
    }>;
    competitionCreate(data: CreateCompetitionDto): Promise<{
        competitionName: string;
        competitionId: number;
        dateCompetition: Date;
        cityCompetitionId: number;
    }>;
    getAllCompetition(): Promise<{
        competitionName: string;
        competitionId: number;
        dateCompetition: Date;
        cityCompetitionId: number;
    }[]>;
    updateCompetition(data: UpdateCompetitionDto): Promise<{
        competitionName: string;
        competitionId: number;
        dateCompetition: Date;
        cityCompetitionId: number;
    }>;
    deleteCompetition(data: DeleteCompetitionDto): Promise<{
        competitionName: string;
        competitionId: number;
        dateCompetition: Date;
        cityCompetitionId: number;
    }>;
    competitionTypeCreate(data: CompetitionTypeDto): Promise<{
        competitionId: number;
        sportTypeId: number;
    }>;
    getAllTypeCompetition(): Promise<{
        competitionId: number;
        sportTypeId: number;
    }[]>;
    deleteTypeCompetition(data: CompetitionTypeDto): Promise<{
        competitionId: number;
        sportTypeId: number;
    }>;
    sportsmenRegister(data: CreateSportsmenCompetitionDto): Promise<{
        competitionId: number;
        sportsmenId: number;
        sportTypeId: number;
        place: number | null;
        result: number | null;
        ageGroup: string;
    }>;
    getAllSportsmensCompetition(): Promise<{
        competitionId: number;
        sportsmenId: number;
        sportTypeId: number;
        place: number | null;
        result: number | null;
        ageGroup: string;
    }[]>;
    updateSportsmenCompetition(data: UpdateSportsmenCompetitionDto): Promise<{
        competitionId: number;
        sportsmenId: number;
        sportTypeId: number;
        place: number | null;
        result: number | null;
        ageGroup: string;
    }>;
    deleteSportsmenCompetition(data: DeleteSportsmenCompetitionDto): Promise<{
        competitionId: number;
        sportsmenId: number;
        sportTypeId: number;
        place: number | null;
        result: number | null;
        ageGroup: string;
    }>;
    getAllReport(year: ReportDto): Promise<{
        reportId: number;
        sportTypeId: number;
        sportTypeName: string;
        competitionCount: number;
        participantCount: number;
        ageGroup: string;
        reportYear: number;
    }[]>;
    getDiploma(data: DiplomaDto): Promise<{
        sportsmenId: number;
        competitionId: number;
        sportTypeId: number;
        fullName: string;
        sportType: string;
        competitionName: string;
        place: number | null;
        result: number | null;
        ageGroup: string;
        date: Date;
    }>;
}
