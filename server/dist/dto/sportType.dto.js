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
exports.DeleteTypeDto = exports.UpdateTypeDto = exports.CreateTypeDto = void 0;
const class_validator_1 = require("class-validator");
var Measure;
(function (Measure) {
    Measure["METER"] = "METER";
    Measure["SECOND"] = "SECOND";
    Measure["KILOGRAM"] = "KILOGRAM";
    Measure["POINTS"] = "POINTS";
    Measure["MINUTES"] = "MINUTES";
    Measure["HOURS"] = "HOURS";
})(Measure || (Measure = {}));
class CreateTypeDto {
    typeName;
    measure;
    thirdSportCategory;
    secondSportCategory;
    firstSportCategory;
    kms;
    ms;
}
exports.CreateTypeDto = CreateTypeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTypeDto.prototype, "typeName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Measure, { message: 'Недопустимое значение региона. Допустимые значения: METER SECOND KILOGRAM POINTS MINUTES HOURS ' }),
    __metadata("design:type", String)
], CreateTypeDto.prototype, "measure", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTypeDto.prototype, "thirdSportCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTypeDto.prototype, "secondSportCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTypeDto.prototype, "firstSportCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTypeDto.prototype, "kms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTypeDto.prototype, "ms", void 0);
class UpdateTypeDto {
    typeId;
    typeName;
    measure;
    thirdSportCategory;
    secondSportCategory;
    firstSportCategory;
    kms;
    ms;
}
exports.UpdateTypeDto = UpdateTypeDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateTypeDto.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTypeDto.prototype, "typeName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Measure, { message: 'Недопустимое значение региона. Допустимые значения: METER SECOND KILOGRAM POINTS MINUTES HOURS ' }),
    __metadata("design:type", String)
], UpdateTypeDto.prototype, "measure", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTypeDto.prototype, "thirdSportCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTypeDto.prototype, "secondSportCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTypeDto.prototype, "firstSportCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTypeDto.prototype, "kms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTypeDto.prototype, "ms", void 0);
class DeleteTypeDto {
    typeId;
}
exports.DeleteTypeDto = DeleteTypeDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteTypeDto.prototype, "typeId", void 0);
//# sourceMappingURL=sportType.dto.js.map