import { IsNumber } from "class-validator";

export class ReportDto {
    @IsNumber()
    year: number
} 