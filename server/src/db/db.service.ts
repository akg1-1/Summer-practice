import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
import { Prisma } from '@prisma/client';
@Injectable()
export class DbService {
  constructor(private prisma: PrismaService) { }


  //Sportsmens\\
  async sportsmenCreate(data: CreateSportsmanDto) {
    const existing = await this.prisma.sportsman.findFirst({
      where: {
        firstName: data.firstName,
        lastName: data.lastName,
        patronymic: data.patronymic || null,
        birthDate: data.birthDate,
      },
    });

    if (existing) {
      throw new ConflictException('Athlete with these details already exists');
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

  async getAllSportsmens(): Promise<Sportsman[]> {
    return this.prisma.sportsman.findMany({
      orderBy: {
        lastName: 'asc',
      }
    });
  }


  async updateSportsmen(data: UpdateSportsmenDto) {
    const existing = await this.prisma.sportsman.findFirst({
      where: {
        sportsmenId: data.sportsmenId
      },
    });

    if (!existing) {
      throw new ConflictException('Athlete doesnt exists');
    }

    const dataToUpdate: any = {};

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
  };

  async deleteSportsmen(data: DeleteSportsmenDto) {
    const existing = await this.prisma.sportsman.findUnique({
      where: {
        sportsmenId: data.sportsmenId
      }
    });

    if (!existing) {
      throw new NotFoundException('Спортсмен не найден');
    }

    try {
      return await this.prisma.sportsman.delete({
        where: { sportsmenId: data.sportsmenId }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ConflictException({
            message: "Нельзя удалить спортсмена: существуют связанные звания или записи",
            errorCode: "RELATED_RECORDS_EXIST"
          });
        }
      }
      // Пробрасываем другие ошибки
      throw error;
    }
  }


  //SportTypes
  async typeCreate(data: CreateTypeDto) {
    const existing = await this.prisma.sportType.findFirst({
      where: {
        typeName: data.typeName,
      },
    });

    if (existing) {
      throw new ConflictException('Type with these details already exists');
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

  async getAllTypies(): Promise<SportType[]> {
    return this.prisma.sportType.findMany({
      orderBy: {
        typeName: 'asc',
      }
    });
  }

  async updateType(data: UpdateTypeDto) {
    const existing = await this.prisma.sportType.findFirst({
      where: {
        typeId: data.typeId
      },
    });

    if (!existing) {
      throw new ConflictException('Type doesnt exists');
    }

    const dataToUpdate: any = {};

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
  };

  async deleteType(data: DeleteTypeDto) {
    const existing = await this.prisma.sportType.findUnique({
      where: { typeId: data.typeId }
    });

    if (!existing) {
      throw new NotFoundException('Вид спорта не найден');
    }

    try {
      return await this.prisma.sportType.delete({
        where: { typeId: data.typeId }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ConflictException({
            message: "Нельзя удалить вид спорта: существуют связанные записи (звания, отчеты и т.д.)",
            errorCode: "RELATED_RECORDS_EXIST"
          });
        }
      }
      throw error;
    }
  }



  //SportRankk\\

  async rankCreate(data: CreateRankDto) {
    const existing = await this.prisma.sportsmenRank.findFirst({
      where: {
        sportsmenId: data.sportsmenId,
        sportTypeId: data.typeId
      },
    });

    if (existing) {
      throw new ConflictException('Rank with these details already exists');
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

  async getAllRanks(): Promise<SportsmenRank[]> {
    return this.prisma.sportsmenRank.findMany({
      orderBy: {
        sportsmenId: 'asc',
      }
    });
  }

  async updateRank(data: UpdateRankDto) {
    const existing = await this.prisma.sportsmenRank.findFirst({
      where: {
        sportsmenId: data.sportsmenId,
        sportTypeId: data.typeId
      },
    });

    if (!existing) {
      throw new ConflictException('Type doesnt exists');
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
  };

  async deleteRank(data: DeleteRankDto) {
    const existing = await this.prisma.sportsmenRank.findUnique({
      where: {
        sportsmenId_sportTypeId: {
          sportsmenId: data.sportsmenId,
          sportTypeId: data.typeId
        }
      }
    });

    if (!existing) {
      throw new NotFoundException('Звание не найдено');
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ConflictException({
            message: "Нельзя удалить звание: существуют связанные записи",
            errorCode: "RELATED_RECORDS_EXIST"
          });
        }
      }
      throw error;
    }
  }

  //City\\

  async cityCreate(data: CreateCityDto) {
    const existing = await this.prisma.city.findFirst({
      where: {
        cityName: data.cityName,
        region: data.region
      },
    });

    if (existing) {
      throw new ConflictException('City with these details already exists');
    }

    return this.prisma.city.create({
      data: {
        cityName: data.cityName,
        region: data.region
      },
    });
  }

  async getAllCities(): Promise<City[]> {
    return this.prisma.city.findMany({
      orderBy: {
        cityName: 'asc',
      }
    });
  }

  async updateCity(data: UpdateCityDto) {
    const existing = await this.prisma.city.findFirst({
      where: {
        cityId: data.cityId
      },
    });

    if (!existing) {
      throw new ConflictException('City doesnt exists');
    }

    const dataToUpdate: any = {};

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
  };

  async deleteCity(data: DeleteCityDto) {
    const existing = await this.prisma.city.findUnique({
      where: { cityId: data.cityId }
    });

    if (!existing) {
      throw new NotFoundException('Город не найден');
    }

    try {
      return await this.prisma.city.delete({
        where: { cityId: data.cityId }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ConflictException({
            message: "Нельзя удалить город: существуют связанные записи (спортсмены, соревнования)",
            errorCode: "RELATED_RECORDS_EXIST"
          });
        }
      }
      throw error;
    }
  }


  //Competition\\

  async competitionCreate(data: CreateCompetitionDto) {
    const existing = await this.prisma.competition.findFirst({
      where: {
        competitionName: data.competitionName,
        dateCompetition: data.competitionDate,
        cityCompetitionId: data.cityId
      },
    });

    if (existing) {
      throw new ConflictException('Competition with these details already exists');
    }

    return this.prisma.competition.create({
      data: {
        competitionName: data.competitionName,
        dateCompetition: data.competitionDate,
        cityCompetitionId: data.cityId
      },
    });
  }

  async getAllCompetitions(): Promise<Competition[]> {
    return this.prisma.competition.findMany({
      orderBy: {
        competitionName: 'asc',
      }
    });
  }

  async updateCompetition(data: UpdateCompetitionDto) {
    const existing = await this.prisma.competition.findFirst({
      where: {
        competitionId: data.competitionId
      },
    });

    if (!existing) {
      throw new ConflictException('Competition doesnt exists');
    }

    const dataToUpdate: any = {};

    if (data.competitionName !== undefined) {
      dataToUpdate.competitionName = data.competitionName;
    }

    if (data.competitionDate !== undefined) {
      dataToUpdate.dateCompetition = data.competitionDate;
    }
    if (data.cityId !== undefined) {
      dataToUpdate.cityCompetitionId = data.cityId
    }
    return this.prisma.competition.update({
      where: { competitionId: data.competitionId },
      data: dataToUpdate
    });
  };

  async deleteCompetition(data: DeleteCompetitionDto) {
    const existing = await this.prisma.competition.findUnique({
      where: { competitionId: data.competitionId }
    });

    if (!existing) {
      throw new NotFoundException('Соревнование не найдено');
    }

    try {
      return await this.prisma.competition.delete({
        where: { competitionId: data.competitionId }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ConflictException({
            message: "Нельзя удалить соревнование: существуют связанные записи (участники, отчеты)",
            errorCode: "RELATED_RECORDS_EXIST"
          });
        }
      }
      throw error;
    }
  }

  //CompetitionType

  async competitionTypeCreate(data: CompetitionSportType) {
    const existing = await this.prisma.competitionSportType.findFirst({
      where: {
        competitionId: data.competitionId,
        sportTypeId: data.sportTypeId
      },
    });

    if (existing) {
      throw new ConflictException('Type in competition with these details already exists');
    }

    return this.prisma.competitionSportType.create({
      data: {
        competitionId: data.competitionId,
        sportTypeId: data.sportTypeId
      },
    });
  }

  async getAllCompetitionTypes(): Promise<CompetitionSportType[]> {
    return this.prisma.competitionSportType.findMany({
      orderBy: {
        competitionId: 'asc',
      }
    });
  }

  async deleteCompetitionType(data: CompetitionSportType) {
    const existing = await this.prisma.competitionSportType.findUnique({
      where: {
        competitionId_sportTypeId: {
          competitionId: data.competitionId,
          sportTypeId: data.sportTypeId
        }
      }
    });

    if (!existing) {
      throw new NotFoundException('Связь соревнования с видом спорта не найдена');
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ConflictException({
            message: "Нельзя удалить связь: существуют связанные записи",
            errorCode: "RELATED_RECORDS_EXIST"
          });
        }
      }
      throw error;
    }
  }


  //Sportsnen in Competition

  async sportsmenCompetitionCreate(data: CreateSportsmenCompetitionDto) {
    const existing = await this.prisma.sportsmenCompetition.findFirst({
      where: {
        competitionId: data.competitionId,
        sportTypeId: data.sportTypeId,
        sportsmenId: data.sportsmenId
      },
    });

    if (existing) {
      throw new ConflictException('Sportsmen on competition with these details already exists');
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

  async getAllSportsmenCompetitions(): Promise<SportsmenCompetition[]> {
    return this.prisma.sportsmenCompetition.findMany({
      orderBy: {
        sportsmenId: 'asc',
      }
    });
  }


  async updateSportsmenCompetition(data: UpdateSportsmenCompetitionDto) {
    const existing = await this.prisma.sportsmenCompetition.findFirst({
      where: {
        sportsmenId: data.sportsmenId,
        sportTypeId: data.sportTypeId,
        competitionId: data.competitionId,
      },
    });

    if (!existing) {
      throw new ConflictException('Sportsmen on competition doesnt exists');
    }

    const dataToUpdate: any = {};

    if (data.result !== undefined) {
      dataToUpdate.result = data.result;
    }

    if (data.place !== undefined) {
      dataToUpdate.place = data.place;
    }
    if (data.ageGroup !== undefined) {
      dataToUpdate.ageGroup = data.ageGroup
    }
    return this.prisma.sportsmenCompetition.update({
      where: {
        sportsmenId_sportTypeId_competitionId:
        {
          sportsmenId: data.sportsmenId,
          sportTypeId: data.sportTypeId,
          competitionId: data.competitionId
        }

      },
      data: dataToUpdate
    });
  };

  async deleteSportsmenCompetition(data: DeleteSportsmenCompetitionDto) {
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
      throw new NotFoundException('Участие спортсмена в соревновании не найдено');
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ConflictException({
            message: "Нельзя удалить участие: существуют связанные записи",
            errorCode: "RELATED_RECORDS_EXIST"
          });
        }
      }
      throw error;
    }
  }


  async getReportsByYear(yearDto: ReportDto) {
    // Явное преобразование года в число
    const year = Number(yearDto.year);

    return this.prisma.$queryRaw<{
      reportId: number;
      sportTypeId: number;
      sportTypeName: string;
      competitionCount: number;
      participantCount: number;
      ageGroup: string;
      reportYear: number;
    }[]>`
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


  async getDiploma(data: DiplomaDto) {
    const result = await this.prisma.sportsmenCompetition.findUnique({
      where: {
        sportsmenId_sportTypeId_competitionId: {
          sportsmenId: data.sportsmenId,
          sportTypeId: data.sportTypeId,
          competitionId: data.competitionId
        }
      },
      select: {
        // Добавляем ID напрямую
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
      throw new NotFoundException('Результаты соревнований не найдены');
    }

    return {
      // Возвращаем ID
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
}

