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
exports.DeleteCityDto = exports.UpdateCityDto = exports.CreateCityDto = exports.Regions = void 0;
const class_validator_1 = require("class-validator");
var Regions;
(function (Regions) {
    Regions["SFO"] = "SFO";
    Regions["DFO"] = "DFO";
    Regions["UFO"] = "UFO";
    Regions["SZFO"] = "SZFO";
    Regions["PFO"] = "PFO";
    Regions["CFO"] = "CFO";
})(Regions || (exports.Regions = Regions = {}));
class CreateCityDto {
    cityName;
    region;
}
exports.CreateCityDto = CreateCityDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCityDto.prototype, "cityName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Regions, { message: 'Недопустимое значение региона. Допустимые значения: SFO, DFO, UFO, SZFO, PFO, CFO' }),
    __metadata("design:type", String)
], CreateCityDto.prototype, "region", void 0);
class UpdateCityDto {
    cityId;
    cityName;
    region;
}
exports.UpdateCityDto = UpdateCityDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCityDto.prototype, "cityId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCityDto.prototype, "cityName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Regions, { message: 'Недопустимое значение региона. Допустимые значения: SFO, DFO, UFO, SZFO, PFO, CFO' }),
    __metadata("design:type", String)
], UpdateCityDto.prototype, "region", void 0);
class DeleteCityDto {
    cityId;
}
exports.DeleteCityDto = DeleteCityDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteCityDto.prototype, "cityId", void 0);
//# sourceMappingURL=city.dto.js.map