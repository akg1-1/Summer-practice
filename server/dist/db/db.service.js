"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let DbService = class DbService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sportsmenCreate(data) {
        const existing = await this.prisma.sportsman.findFirst({
            where: {
                firstName: data.firstName,
                lastName: data.lastName,
                patronymic: data.patronymic || null,
                birthDate: data.birthDate,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Athlete with these details already exists');
        }
        return this.prisma.sportsman.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                patronymic: data.patronymic,
                birthDate: data.birthDate,
            },
        });
    }
    async getAllSportsmens() {
        return this.prisma.sportsman.findMany({
            orderBy: {
                lastName: 'asc',
            }
        });
    }
    async updateSportsmen(data) {
        const existing = await this.prisma.sportsman.findFirst({
            where: {
                sportsmenId: data.sportsmenId
            },
        });
        if (!existing) {
            throw new common_1.ConflictException('Athlete doesnt exists');
        }
        const dataToUpdate = {};
        if (data.firstName !== undefined) {
            dataToUpdate.firstName = data.firstName;
        }
        if (data.lastName !== undefined) {
            dataToUpdate.lastName = data.lastName;
        }
        if (data.patronymic !== undefined) {
            dataToUpdate.patronymic = data.patronymic;
        }
        if (data.birthDate !== undefined) {
            dataToUpdate.birthDate = data.birthDate ? new Date(data.birthDate) : null;
        }
        return this.prisma.sportsman.update({
            where: { sportsmenId: data.sportsmenId },
            data: dataToUpdate
        });
    }
    ;
    async deleteSportsmen(data) {
        const existing = await this.prisma.sportsman.findUnique({
            where: {
                sportsmenId: data.sportsmenId
            }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Спортсмен не найден');
        }
        try {
            return await this.prisma.sportsman.delete({
                where: { sportsmenId: data.sportsmenId }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.ConflictException({
                        message: "Нельзя удалить спортсмена: существуют связанные звания или записи",
                        errorCode: "RELATED_RECORDS_EXIST"
                    });
                }
            }
            throw error;
        }
    }
    async typeCreate(data) {
        const existing = await this.prisma.sportType.findFirst({
            where: {
                typeName: data.typeName,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Type with these details already exists');
        }
        return this.prisma.sportType.create({
            data: {
                typeName: data.typeName,
                measure: data.measure,
                thirdSportCategory: data.thirdSportCategory,
                secondSportCategory: data.secondSportCategory,
                firstSportCategory: data.firstSportCategory,
                kms: data.kms,
                ms: data.ms
            },
        });
    }
    async getAllTypies() {
        return this.prisma.sportType.findMany({
            orderBy: {
                typeName: 'asc',
            }
        });
    }
    async updateType(data) {
        const existing = await this.prisma.sportType.findFirst({
            where: {
                typeId: data.typeId
            },
        });
        if (!existing) {
            throw new common_1.ConflictException('Type doesnt exists');
        }
        const dataToUpdate = {};
        if (data.typeName !== undefined) {
            dataToUpdate.typeName = data.typeName;
        }
        if (data.measure !== undefined) {
            dataToUpdate.measure = data.measure;
        }
        if (data.thirdSportCategory !== undefined) {
            dataToUpdate.thirdSportCategory = data.thirdSportCategory;
        }
        if (data.secondSportCategory !== undefined) {
            dataToUpdate.secondSportCategory = data.secondSportCategory;
        }
        if (data.firstSportCategory !== undefined) {
            dataToUpdate.firstSportCategory = data.firstSportCategory;
        }
        if (data.kms !== undefined) {
            dataToUpdate.kms = data.kms;
        }
        if (data.ms !== undefined) {
            dataToUpdate.ms = data.ms;
        }
        return this.prisma.sportType.update({
            where: { typeId: data.typeId },
            data: dataToUpdate
        });
    }
    ;
    async deleteType(data) {
        const existing = await this.prisma.sportType.findUnique({
            where: { typeId: data.typeId }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Вид спорта не найден');
        }
        try {
            return await this.prisma.sportType.delete({
                where: { typeId: data.typeId }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.ConflictException({
                        message: "Нельзя удалить вид спорта: существуют связанные записи (звания, отчеты и т.д.)",
                        errorCode: "RELATED_RECORDS_EXIST"
                    });
                }
            }
            throw error;
        }
    }
    async rankCreate(data) {
        const existing = await this.prisma.sportsmenRank.findFirst({
            where: {
                sportsmenId: data.sportsmenId,
                sportTypeId: data.typeId
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Rank with these details already exists');
        }
        return this.prisma.sportsmenRank.create({
            data: {
                sportsmenId: data.sportsmenId,
                sportTypeId: data.typeId,
                sportsmenRank: data.rank,
                rankDate: data.rankDate
            },
        });
    }
    async getAllRanks() {
        return this.prisma.sportsmenRank.findMany({
            orderBy: {
                sportsmenId: 'asc',
            }
        });
    }
    async updateRank(data) {
        const existing = await this.prisma.sportsmenRank.findFirst({
            where: {
                sportsmenId: data.sportsmenId,
                sportTypeId: data.typeId
            },
        });
        if (!existing) {
            throw new common_1.ConflictException('Type doesnt exists');
        }
        return this.prisma.sportsmenRank.update({
            where: {
                sportsmenId_sportTypeId: {
                    sportsmenId: data.sportsmenId,
                    sportTypeId: data.typeId
                }
            },
            data: {
                sportsmenRank: data.rank,
                rankDate: data.rankDate
            }
        });
    }
    ;
    async deleteRank(data) {
        const existing = await this.prisma.sportsmenRank.findUnique({
            where: {
                sportsmenId_sportTypeId: {
                    sportsmenId: data.sportsmenId,
                    sportTypeId: data.typeId
                }
            }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Звание не найдено');
        }
        try {
            return await this.prisma.sportsmenRank.delete({
                where: {
                    sportsmenId_sportTypeId: {
                        sportsmenId: data.sportsmenId,
                        sportTypeId: data.typeId
                    }
                }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.ConflictException({
                        message: "Нельзя удалить звание: существуют связанные записи",
                        errorCode: "RELATED_RECORDS_EXIST"
                    });
                }
            }
            throw error;
        }
    }
    async cityCreate(data) {
        const existing = await this.prisma.city.findFirst({
            where: {
                cityName: data.cityName,
                region: data.region
            },
        });
        if (existing) {
            throw new common_1.ConflictException('City with these details already exists');
        }
        return this.prisma.city.create({
            data: {
                cityName: data.cityName,
                region: data.region
            },
        });
    }
    async getAllCities() {
        return this.prisma.city.findMany({
            orderBy: {
                cityName: 'asc',
            }
        });
    }
    async updateCity(data) {
        const existing = await this.prisma.city.findFirst({
            where: {
                cityId: data.cityId
            },
        });
        if (!existing) {
            throw new common_1.ConflictException('City doesnt exists');
        }
        const dataToUpdate = {};
        if (data.cityName !== undefined) {
            dataToUpdate.cityName = data.cityName;
        }
        if (data.region !== undefined) {
            dataToUpdate.region = data.region;
        }
        return this.prisma.city.update({
            where: { cityId: data.cityId },
            data: dataToUpdate
        });
    }
    ;
    async deleteCity(data) {
        const existing = await this.prisma.city.findUnique({
            where: { cityId: data.cityId }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Город не найден');
        }
        try {
            return await this.prisma.city.delete({
                where: { cityId: data.cityId }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.ConflictException({
                        message: "Нельзя удалить город: существуют связанные записи (спортсмены, соревнования)",
                        errorCode: "RELATED_RECORDS_EXIST"
                    });
                }
            }
            throw error;
        }
    }
    async competitionCreate(data) {
        const existing = await this.prisma.competition.findFirst({
            where: {
                competitionName: data.competitionName,
                dateCompetition: data.competitionDate,
                cityCompetitionId: data.cityId
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Competition with these details already exists');
        }
        return this.prisma.competition.create({
            data: {
                competitionName: data.competitionName,
                dateCompetition: data.competitionDate,
                cityCompetitionId: data.cityId
            },
        });
    }
    async getAllCompetitions() {
        return this.prisma.competition.findMany({
            orderBy: {
                competitionName: 'asc',
            }
        });
    }
    async updateCompetition(data) {
        const existing = await this.prisma.competition.findFirst({
            where: {
                competitionId: data.competitionId
            },
        });
        if (!existing) {
            throw new common_1.ConflictException('Competition doesnt exists');
        }
        const dataToUpdate = {};
        if (data.competitionName !== undefined) {
            dataToUpdate.competitionName = data.competitionName;
        }
        if (data.competitionDate !== undefined) {
            dataToUpdate.dateCompetition = data.competitionDate;
        }
        if (data.cityId !== undefined) {
            dataToUpdate.cityCompetitionId = data.cityId;
        }
        return this.prisma.competition.update({
            where: { competitionId: data.competitionId },
            data: dataToUpdate
        });
    }
    ;
    async deleteCompetition(data) {
        const existing = await this.prisma.competition.findUnique({
            where: { competitionId: data.competitionId }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Соревнование не найдено');
        }
        try {
            return await this.prisma.competition.delete({
                where: { competitionId: data.competitionId }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.ConflictException({
                        message: "Нельзя удалить соревнование: существуют связанные записи (участники, отчеты)",
                        errorCode: "RELATED_RECORDS_EXIST"
                    });
                }
            }
            throw error;
        }
    }
    async competitionTypeCreate(data) {
        const existing = await this.prisma.competitionSportType.findFirst({
            where: {
                competitionId: data.competitionId,
                sportTypeId: data.sportTypeId
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Type in competition with these details already exists');
        }
        return this.prisma.competitionSportType.create({
            data: {
                competitionId: data.competitionId,
                sportTypeId: data.sportTypeId
            },
        });
    }
    async getAllCompetitionTypes() {
        return this.prisma.competitionSportType.findMany({
            orderBy: {
                competitionId: 'asc',
            }
        });
    }
    async deleteCompetitionType(data) {
        const existing = await this.prisma.competitionSportType.findUnique({
            where: {
                competitionId_sportTypeId: {
                    competitionId: data.competitionId,
                    sportTypeId: data.sportTypeId
                }
            }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Связь соревнования с видом спорта не найдена');
        }
        try {
            return await this.prisma.competitionSportType.delete({
                where: {
                    competitionId_sportTypeId: {
                        competitionId: data.competitionId,
                        sportTypeId: data.sportTypeId
                    }
                }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.ConflictException({
                        message: "Нельзя удалить связь: существуют связанные записи",
                        errorCode: "RELATED_RECORDS_EXIST"
                    });
                }
            }
            throw error;
        }
    }
    async sportsmenCompetitionCreate(data) {
        const existing = await this.prisma.sportsmenCompetition.findFirst({
            where: {
                competitionId: data.competitionId,
                sportTypeId: data.sportTypeId,
                sportsmenId: data.sportsmenId
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Sportsmen on competition with these details already exists');
        }
        return this.prisma.sportsmenCompetition.create({
            data: {
                sportsmenId: data.sportsmenId,
                competitionId: data.competitionId,
                sportTypeId: data.sportTypeId,
                place: data.place,
                result: data.result,
                ageGroup: data.ageGroup
            },
        });
    }
    async getAllSportsmenCompetitions() {
        return this.prisma.sportsmenCompetition.findMany({
            orderBy: {
                sportsmenId: 'asc',
            }
        });
    }
    async updateSportsmenCompetition(data) {
        const existing = await this.prisma.sportsmenCompetition.findFirst({
            where: {
                sportsmenId: data.sportsmenId,
                sportTypeId: data.sportTypeId,
                competitionId: data.competitionId,
            },
        });
        if (!existing) {
            throw new common_1.ConflictException('Sportsmen on competition doesnt exists');
        }
        const dataToUpdate = {};
        if (data.result !== undefined) {
            dataToUpdate.result = data.result;
        }
        if (data.place !== undefined) {
            dataToUpdate.place = data.place;
        }
        if (data.ageGroup !== undefined) {
            dataToUpdate.ageGroup = data.ageGroup;
        }
        return this.prisma.sportsmenCompetition.update({
            where: {
                sportsmenId_sportTypeId_competitionId: {
                    sportsmenId: data.sportsmenId,
                    sportTypeId: data.sportTypeId,
                    competitionId: data.competitionId
                }
            },
            data: dataToUpdate
        });
    }
    ;
    async deleteSportsmenCompetition(data) {
        const existing = await this.prisma.sportsmenCompetition.findUnique({
            where: {
                sportsmenId_sportTypeId_competitionId: {
                    sportsmenId: data.sportsmenId,
                    competitionId: data.competitionId,
                    sportTypeId: data.sportTypeId
                }
            }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Участие спортсмена в соревновании не найдено');
        }
        try {
            return await this.prisma.sportsmenCompetition.delete({
                where: {
                    sportsmenId_sportTypeId_competitionId: {
                        sportsmenId: data.sportsmenId,
                        competitionId: data.competitionId,
                        sportTypeId: data.sportTypeId
                    }
                }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.ConflictException({
                        message: "Нельзя удалить участие: существуют связанные записи",
                        errorCode: "RELATED_RECORDS_EXIST"
                    });
                }
            }
            throw error;
        }
    }
    async getReportsByYear(yearDto) {
        const year = Number(yearDto.year);
        return this.prisma.$queryRaw `
    SELECT 
      report_id AS "reportId",
      sport_type_id AS "sportTypeId",
      sport_type_name AS "sportTypeName",
      competition_count AS "competitionCount",
      participant_count AS "participantCount",
      age_group AS "ageGroup",
      report_year AS "reportYear"
    FROM reports
    WHERE report_year = ${year}
  `;
    }
    async getDiploma(data) {
        const result = await this.prisma.sportsmenCompetition.findUnique({
            where: {
                sportsmenId_sportTypeId_competitionId: {
                    sportsmenId: data.sportsmenId,
                    sportTypeId: data.sportTypeId,
                    competitionId: data.competitionId
                }
            },
            select: {
                sportsmenId: true,
                sportTypeId: true,
                competitionId: true,
                place: true,
                result: true,
                ageGroup: true,
                sportsmenRank: {
                    select: {
                        sportsman: {
                            select: {
                                firstName: true,
                                lastName: true,
                                patronymic: true
                            }
                        },
                        sportType: {
                            select: {
                                typeName: true
                            }
                        }
                    }
                },
                competitionSport: {
                    select: {
                        competition: {
                            select: {
                                competitionName: true,
                                dateCompetition: true
                            }
                        }
                    }
                }
            }
        });
        if (!result) {
            throw new common_1.NotFoundException('Результаты соревнований не найдены');
        }
        return {
            sportsmenId: result.sportsmenId,
            competitionId: result.competitionId,
            sportTypeId: result.sportTypeId,
            fullName: `${result.sportsmenRank.sportsman.firstName} ${result.sportsmenRank.sportsman.lastName}${result.sportsmenRank.sportsman.patronymic ? ' ' + result.sportsmenRank.sportsman.patronymic : ''}`,
            sportType: result.sportsmenRank.sportType.typeName,
            competitionName: result.competitionSport.competition.competitionName,
            place: result.place,
            result: result.result,
            ageGroup: result.ageGroup,
            date: result.competitionSport.competition.dateCompetition
        };
    }
};
exports.DbService = DbService;
exports.DbService = DbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DbService);
//# sourceMappingURL=db.service.js.map