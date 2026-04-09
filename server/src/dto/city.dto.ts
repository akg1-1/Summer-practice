import { IsString, IsDate, IsOptional, IsNumber, IsEnum } from 'class-validator';

export enum Regions {
  SFO = 'SFO',
  DFO = 'DFO',
  UFO = 'UFO',
  SZFO = 'SZFO',
  PFO = 'PFO',
  CFO = 'CFO'
}

export class CreateCityDto {
    @IsString()
  cityName: string;

   @IsEnum(Regions, {message: 'Недопустимое значение региона. Допустимые значения: SFO, DFO, UFO, SZFO, PFO, CFO'})
    region: Regions;
} 

export class UpdateCityDto{
    @IsNumber()
    cityId: number

    @IsOptional()
    @IsString()
    cityName: string;

    @IsOptional()
   @IsEnum(Regions, {message: 'Недопустимое значение региона. Допустимые значения: SFO, DFO, UFO, SZFO, PFO, CFO'})
    region: Regions; 
    
   
}

export class DeleteCityDto{
  @IsNumber()
  cityId: number
}

