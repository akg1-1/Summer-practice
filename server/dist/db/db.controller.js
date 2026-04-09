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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbController = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("./db.service");
const sportsmen_dto_1 = require("../dto/sportsmen.dto");
const city_dto_1 = require("../dto/city.dto");
const sportType_dto_1 = require("../dto/sportType.dto");
const sportRank_dto_1 = require("../dto/sportRank.dto");
const competition_dto_1 = require("../dto/competition.dto");
const competitionType_dto_1 = require("../dto/competitionType.dto");
const sportsmenCompetition_dto_1 = require("../dto/sportsmenCompetition.dto");
const report_dto_1 = require("../dto/report.dto");
const diploma_dto_1 = require("../dto/diploma.dto");
let DbController = class DbController {
    dbService;
    constructor(dbService) {
        this.dbService = dbService;
    }
    async gett() {
        return "Helljinununuo";
    }
    async sportsmenCreate(data) {
        return this.dbService.sportsmenCreate(data);
    }
    async getAllSportsmens() {
        return this.dbService.getAllSportsmens();
    }
    async updateSportsmen(data) {
        return this.dbService.updateSportsmen(data);
    }
    async deleteSportsmen(data) {
        return this.dbService.deleteSportsmen(data);
    }
    async sportTypeCreate(data) {
        return this.dbService.typeCreate(data);
    }
    async getAllSportTypes() {
        return this.dbService.getAllTypies();
    }
    async updateSportType(data) {
        return this.dbService.updateType(data);
    }
    async deleteSportType(data) {
        return this.dbService.deleteType(data);
    }
    async sportsmenRankCreate(data) {
        return this.dbService.rankCreate(data);
    }
    async getAllSportsmenRank() {
        return this.dbService.getAllRanks();
    }
    async updateSportsmenRank(data) {
        return this.dbService.updateRank(data);
    }
    async deleteSportsmenRank(data) {
        return this.dbService.deleteRank(data);
    }
    async cityCreate(data) {
        return this.dbService.cityCreate(data);
    }
    async getAllCities() {
        return this.dbService.getAllCities();
    }
    async UpdateCity(data) {
        return this.dbService.updateCity(data);
    }
    async deleteCity(data) {
        return this.dbService.deleteCity(data);
    }
    async competitionCreate(data) {
        return this.dbService.competitionCreate(data);
    }
    async getAllCompetition() {
        return this.dbService.getAllCompetitions();
    }
    async updateCompetition(data) {
        return this.dbService.updateCompetition(data);
    }
    async deleteCompetition(data) {
        return this.dbService.deleteCompetition(data);
    }
    async competitionTypeCreate(data) {
        return this.dbService.competitionTypeCreate(data);
    }
    async getAllTypeCompetition() {
        return this.dbService.getAllCompetitionTypes();
    }
    async deleteTypeCompetition(data) {
        return this.dbService.deleteCompetitionType(data);
    }
    async sportsmenRegister(data) {
        return this.dbService.sportsmenCompetitionCreate(data);
    }
    async getAllSportsmensCompetition() {
        return this.dbService.getAllSportsmenCompetitions();
    }
    async updateSportsmenCompetition(data) {
        return this.dbService.updateSportsmenCompetition(data);
    }
    async deleteSportsmenCompetition(data) {
        return this.dbService.deleteSportsmenCompetition(data);
    }
    async getAllReport(year) {
        return this.dbService.getReportsByYear(year);
    }
    async getDiploma(data) {
        return this.dbService.getDiploma(data);
    }
};
exports.DbController = DbController;
__decorate([
    (0, common_1.Get)('c-c'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DbController.prototype, "gett", null);
__decorate([
    (0, common_1.Post)('create-sportsmen'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportsmen_dto_1.CreateSportsmanDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "sportsmenCreate", null);
__decorate([
    (0, common_1.Get)('all-sportsmens'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DbController.prototype, "getAllSportsmens", null);
__decorate([
    (0, common_1.Patch)('update-sportsmen'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportsmen_dto_1.UpdateSportsmenDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "updateSportsmen", null);
__decorate([
    (0, common_1.Delete)('delete-sportsmen'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportsmen_dto_1.DeleteSportsmenDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "deleteSportsmen", null);
__decorate([
    (0, common_1.Post)('create-sport-type'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportType_dto_1.CreateTypeDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "sportTypeCreate", null);
__decorate([
    (0, common_1.Get)('all-sport-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DbController.prototype, "getAllSportTypes", null);
__decorate([
    (0, common_1.Patch)('update-sport-type'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportType_dto_1.UpdateTypeDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "updateSportType", null);
__decorate([
    (0, common_1.Delete)('delete-sport-type'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportType_dto_1.DeleteTypeDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "deleteSportType", null);
__decorate([
    (0, common_1.Post)('create-sportsmen-rank'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportRank_dto_1.CreateRankDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "sportsmenRankCreate", null);
__decorate([
    (0, common_1.Get)('all-sportsmen-ranks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DbController.prototype, "getAllSportsmenRank", null);
__decorate([
    (0, common_1.Patch)('update-sportsmen-rank'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportRank_dto_1.UpdateRankDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "updateSportsmenRank", null);
__decorate([
    (0, common_1.Delete)('delete-sportsmen-rank'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportRank_dto_1.DeleteRankDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "deleteSportsmenRank", null);
__decorate([
    (0, common_1.Post)('create-city'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_dto_1.CreateCityDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "cityCreate", null);
__decorate([
    (0, common_1.Get)('all-cities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DbController.prototype, "getAllCities", null);
__decorate([
    (0, common_1.Patch)('update-city'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_dto_1.UpdateCityDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "UpdateCity", null);
__decorate([
    (0, common_1.Delete)('delete-city'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_dto_1.DeleteCityDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "deleteCity", null);
__decorate([
    (0, common_1.Post)('create-competition'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [competition_dto_1.CreateCompetitionDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "competitionCreate", null);
__decorate([
    (0, common_1.Get)('all-competitions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DbController.prototype, "getAllCompetition", null);
__decorate([
    (0, common_1.Patch)('update-competition'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [competition_dto_1.UpdateCompetitionDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "updateCompetition", null);
__decorate([
    (0, common_1.Delete)('delete-competition'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [competition_dto_1.DeleteCompetitionDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "deleteCompetition", null);
__decorate([
    (0, common_1.Post)('create-type-competition'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [competitionType_dto_1.CompetitionTypeDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "competitionTypeCreate", null);
__decorate([
    (0, common_1.Get)('all-type-competitions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DbController.prototype, "getAllTypeCompetition", null);
__decorate([
    (0, common_1.Delete)('delete-type-competition'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [competitionType_dto_1.CompetitionTypeDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "deleteTypeCompetition", null);
__decorate([
    (0, common_1.Post)('register-sportsmen-competition'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportsmenCompetition_dto_1.CreateSportsmenCompetitionDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "sportsmenRegister", null);
__decorate([
    (0, common_1.Get)('all-sportsmens-competitions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DbController.prototype, "getAllSportsmensCompetition", null);
__decorate([
    (0, common_1.Patch)('update-sportsmen-competition'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportsmenCompetition_dto_1.UpdateSportsmenCompetitionDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "updateSportsmenCompetition", null);
__decorate([
    (0, common_1.Delete)('delete-sportsmen-competition'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sportsmenCompetition_dto_1.DeleteSportsmenCompetitionDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "deleteSportsmenCompetition", null);
__decorate([
    (0, common_1.Post)('all-reports'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "getAllReport", null);
__decorate([
    (0, common_1.Post)('get-diploma'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [diploma_dto_1.DiplomaDto]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "getDiploma", null);
exports.DbController = DbController = __decorate([
    (0, common_1.Controller)('db'),
    __metadata("design:paramtypes", [db_service_1.DbService])
], DbController);
//# sourceMappingURL=db.controller.js.map