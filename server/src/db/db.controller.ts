import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
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

@Controller('db')
export class DbController {
  constructor(private readonly dbService: DbService) {}


  @Get('c-c')
  async gett(){
    return "World"
  }
  //SPORTSEN
  @Post('create-sportsmen')
  async sportsmenCreate(@Body() data:CreateSportsmanDto){
    return this.dbService.sportsmenCreate(data)
  }

  @Get('all-sportsmens')
  async getAllSportsmens(){
    return this.dbService.getAllSportsmens()
  }

  @Patch('update-sportsmen')
  async updateSportsmen(@Body() data:UpdateSportsmenDto){
    return this.dbService.updateSportsmen(data)
  }

  @Delete('delete-sportsmen')
  async deleteSportsmen(@Body() data: DeleteSportsmenDto){
    return this.dbService.deleteSportsmen(data)
  }



  //SPORT TYPES

  @Post('create-sport-type')
  async sportTypeCreate(@Body() data: CreateTypeDto){
    return this.dbService.typeCreate(data)
  }

  @Get('all-sport-types')
  async getAllSportTypes(){
    return this.dbService.getAllTypies()
  }

  @Patch('update-sport-type')
  async updateSportType(@Body() data: UpdateTypeDto){
    return this.dbService.updateType(data)
  }

  @Delete('delete-sport-type')
  async deleteSportType(@Body() data: DeleteTypeDto){
    return this.dbService.deleteType(data)
  }


  //SPORTSMEN RANKS

  @Post('create-sportsmen-rank')
  async sportsmenRankCreate(@Body() data: CreateRankDto){
    return this.dbService.rankCreate(data)
  }

  @Get('all-sportsmen-ranks')
  async getAllSportsmenRank(){
    return this.dbService.getAllRanks()
  }

  @Patch('update-sportsmen-rank')
  async updateSportsmenRank(@Body() data: UpdateRankDto){
    return this.dbService.updateRank(data)
  }

  @Delete('delete-sportsmen-rank')
  async deleteSportsmenRank(@Body() data: DeleteRankDto){
    return this.dbService.deleteRank(data)
  }

  //CITES


  @Post('create-city')
  async cityCreate(@Body() data: CreateCityDto){
    return this.dbService.cityCreate(data)
  }

  @Get('all-cities')
  async getAllCities(){
    return this.dbService.getAllCities()
  }


  @Patch('update-city')
    async UpdateCity(@Body() data: UpdateCityDto){
      return this.dbService.updateCity(data)
    }


  @Delete('delete-city')
  async deleteCity(@Body() data:DeleteCityDto){
    return this.dbService.deleteCity(data)
  }


  //COMPETITION

  @Post('create-competition')
  async competitionCreate(@Body() data: CreateCompetitionDto){
    return this.dbService.competitionCreate(data)
  }

  @Get('all-competitions')
  async getAllCompetition(){
    return this.dbService.getAllCompetitions()
  }

  @Patch('update-competition')
  async updateCompetition(@Body() data: UpdateCompetitionDto){
    return this.dbService.updateCompetition(data)
  }

  @Delete('delete-competition')
  async deleteCompetition(@Body() data: DeleteCompetitionDto){
    return this.dbService.deleteCompetition(data)
  }

  // TYPES OF COMPETITION

  @Post('create-type-competition')
  async competitionTypeCreate(@Body() data: CompetitionTypeDto){
    return this.dbService.competitionTypeCreate(data) 
  }

  @Get('all-type-competitions')
  async getAllTypeCompetition(){
    return this.dbService.getAllCompetitionTypes()
  }


  @Delete('delete-type-competition')
  async deleteTypeCompetition(@Body() data: CompetitionTypeDto){
    return this.dbService.deleteCompetitionType(data)
  } 

  // SPORTSMEN ON COMPETITION


   @Post('register-sportsmen-competition')
  async sportsmenRegister(@Body() data: CreateSportsmenCompetitionDto){
    return this.dbService.sportsmenCompetitionCreate(data)
  }

  @Get('all-sportsmens-competitions')
  async getAllSportsmensCompetition(){
    return this.dbService.getAllSportsmenCompetitions()
  }

  @Patch('update-sportsmen-competition')
  async updateSportsmenCompetition(@Body() data: UpdateSportsmenCompetitionDto){
    return this.dbService.updateSportsmenCompetition(data)
  }

  @Delete('delete-sportsmen-competition')
  async deleteSportsmenCompetition(@Body() data: DeleteSportsmenCompetitionDto){
    return this.dbService.deleteSportsmenCompetition(data)
  }


  //ReportCreate
  @Post('all-reports')
  async getAllReport(@Body() year: ReportDto){
    return this.dbService.getReportsByYear(year)
  }


  @Post('get-diploma')
  async getDiploma(@Body() data: DiplomaDto){
    return this.dbService.getDiploma(data)
  }
}
