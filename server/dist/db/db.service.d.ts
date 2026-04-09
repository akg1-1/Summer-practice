import { City, Competition, CompetitionSportType, Sportsman, SportsmenCompetition, SportsmenRank, SportType } from '@prisma/client';
import { CreateCityDto, DeleteCityDto, UpdateCityDto } from 'src/dto/city.dto';
import { CreateCompetitionDto, DeleteCompetitionDto, UpdateCompetitionDto } from 'src/dto/competition.dto';
import { DiplomaDto } from 'src/dto/diploma.dto';
import { ReportDto } from 'src/dto/report.dto';
import { CreateRankDto, DeleteRankDto, UpdateRankDto } from 'src/dto/sportRank.dto';
import { CreateSportsmanDto, DeleteSportsmenDto, UpdateSportsmenDto } from 'src/dto/sportsmen.dto';
import { CreateSportsmenCompetitionDto, DeleteSportsmenCompetitionDto, UpdateSportsmenCompetitionDto } from 'src/dto/sportsmenCompetition.dto';
import { CreateTypeDto, DeleteTypeDto, UpdateTypeDto } from 'src/dto/sportType.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class DbService {
    private prisma;
    constructor(prisma: PrismaService);
    sportsmenCreate(data: CreateSportsmanDto): Promise<{
        sportsmenId: number;
        firstName: string;
        lastName: string;
        patronymic: string | null;
        birthDate: Date;
    }>;
    getAllSportsmens(): Promise<Sportsman[]>;
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
    typeCreate(data: CreateTypeDto): Promise<{
        typeId: number;
        typeName: string;
        measure: import(".prisma/client").$Enums.Measure;
        thirdSportCategory: string | null;
        secondSportCategory: string | null;
        firstSportCategory: string | null;
        kms: string | null;
        ms: string | null;
    }>;
    getAllTypies(): Promise<SportType[]>;
    updateType(data: UpdateTypeDto): Promise<{
        typeId: number;
        typeName: string;
        measure: import(".prisma/client").$Enums.Measure;
        thirdSportCategory: string | null;
        secondSportCategory: string | null;
        firstSportCategory: string | null;
        kms: string | null;
        ms: string | null;
    }>;
    deleteType(data: DeleteTypeDto): Promise<{
        typeId: number;
        typeName: string;
        measure: import(".prisma/client").$Enums.Measure;
        thirdSportCategory: string | null;
        secondSportCategory: string | null;
        firstSportCategory: string | null;
        kms: string | null;
        ms: string | null;
    }>;
    rankCreate(data: CreateRankDto): Promise<{
        sportsmenId: number;
        sportTypeId: number;
        rankDate: Date | null;
        sportsmenRank: import(".prisma/client").$Enums.RankValue | null;
    }>;
    getAllRanks(): Promise<SportsmenRank[]>;
    updateRank(data: UpdateRankDto): Promise<{
        sportsmenId: number;
        sportTypeId: number;
        rankDate: Date | null;
        sportsmenRank: import(".prisma/client").$Enums.RankValue | null;
    }>;
    deleteRank(data: DeleteRankDto): Promise<{
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
    getAllCities(): Promise<City[]>;
    updateCity(data: UpdateCityDto): Promise<{
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
    getAllCompetitions(): Promise<Competition[]>;
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
    competitionTypeCreate(data: CompetitionSportType): Promise<{
        competitionId: number;
        sportTypeId: number;
    }>;
    getAllCompetitionTypes(): Promise<CompetitionSportType[]>;
    deleteCompetitionType(data: CompetitionSportType): Promise<{
        competitionId: number;
        sportTypeId: number;
    }>;
    sportsmenCompetitionCreate(data: CreateSportsmenCompetitionDto): Promise<{
        competitionId: number;
        sportsmenId: number;
        sportTypeId: number;
        place: number | null;
        result: number | null;
        ageGroup: string;
    }>;
    getAllSportsmenCompetitions(): Promise<SportsmenCompetition[]>;
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
    getReportsByYear(yearDto: ReportDto): Promise<{
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
