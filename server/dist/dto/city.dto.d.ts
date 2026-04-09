export declare enum Regions {
    SFO = "SFO",
    DFO = "DFO",
    UFO = "UFO",
    SZFO = "SZFO",
    PFO = "PFO",
    CFO = "CFO"
}
export declare class CreateCityDto {
    cityName: string;
    region: Regions;
}
export declare class UpdateCityDto {
    cityId: number;
    cityName: string;
    region: Regions;
}
export declare class DeleteCityDto {
    cityId: number;
}
