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
exports.DeleteRankDto = exports.UpdateRankDto = exports.CreateRankDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var RankValue;
(function (RankValue) {
    RankValue["FIRST"] = "FIRST";
    RankValue["SECOND"] = "SECOND";
    RankValue["THIRD"] = "THIRD";
    RankValue["KMS"] = "KMS";
    RankValue["MS"] = "MS";
})(RankValue || (RankValue = {}));
class CreateRankDto {
    sportsmenId;
    typeId;
    rank;
    rankDate;
}
exports.CreateRankDto = CreateRankDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRankDto.prototype, "sportsmenId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRankDto.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(RankValue, { message: 'Недопустимое значение региона. Допустимые значения: FIRST SECOND THIRD KMS MS ' }),
    __metadata("design:type", String)
], CreateRankDto.prototype, "rank", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateRankDto.prototype, "rankDate", void 0);
class UpdateRankDto {
    sportsmenId;
    typeId;
    rank;
    rankDate;
}
exports.UpdateRankDto = UpdateRankDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRankDto.prototype, "sportsmenId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRankDto.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(RankValue, { message: 'Недопустимое значение региона. Допустимые значения: FIRST SECOND THIRD KMS MS ' }),
    __metadata("design:type", String)
], UpdateRankDto.prototype, "rank", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UpdateRankDto.prototype, "rankDate", void 0);
class DeleteRankDto {
    sportsmenId;
    typeId;
}
exports.DeleteRankDto = DeleteRankDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteRankDto.prototype, "sportsmenId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteRankDto.prototype, "typeId", void 0);
//# sourceMappingURL=sportRank.dto.js.map