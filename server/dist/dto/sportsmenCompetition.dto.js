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
exports.DeleteSportsmenCompetitionDto = exports.UpdateSportsmenCompetitionDto = exports.CreateSportsmenCompetitionDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSportsmenCompetitionDto {
    sportsmenId;
    sportTypeId;
    competitionId;
    place;
    result;
    ageGroup;
}
exports.CreateSportsmenCompetitionDto = CreateSportsmenCompetitionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSportsmenCompetitionDto.prototype, "sportsmenId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSportsmenCompetitionDto.prototype, "sportTypeId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSportsmenCompetitionDto.prototype, "competitionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSportsmenCompetitionDto.prototype, "place", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSportsmenCompetitionDto.prototype, "result", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSportsmenCompetitionDto.prototype, "ageGroup", void 0);
class UpdateSportsmenCompetitionDto {
    sportsmenId;
    sportTypeId;
    competitionId;
    place;
    result;
    ageGroup;
}
exports.UpdateSportsmenCompetitionDto = UpdateSportsmenCompetitionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSportsmenCompetitionDto.prototype, "sportsmenId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSportsmenCompetitionDto.prototype, "sportTypeId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSportsmenCompetitionDto.prototype, "competitionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSportsmenCompetitionDto.prototype, "place", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSportsmenCompetitionDto.prototype, "result", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSportsmenCompetitionDto.prototype, "ageGroup", void 0);
class DeleteSportsmenCompetitionDto {
    sportsmenId;
    sportTypeId;
    competitionId;
}
exports.DeleteSportsmenCompetitionDto = DeleteSportsmenCompetitionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteSportsmenCompetitionDto.prototype, "sportsmenId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteSportsmenCompetitionDto.prototype, "sportTypeId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteSportsmenCompetitionDto.prototype, "competitionId", void 0);
//# sourceMappingURL=sportsmenCompetition.dto.js.map