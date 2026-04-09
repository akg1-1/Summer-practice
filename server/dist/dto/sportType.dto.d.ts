declare enum Measure {
    METER = "METER",
    SECOND = "SECOND",
    KILOGRAM = "KILOGRAM",
    POINTS = "POINTS",
    MINUTES = "MINUTES",
    HOURS = "HOURS"
}
export declare class CreateTypeDto {
    typeName: string;
    measure: Measure;
    thirdSportCategory: string;
    secondSportCategory: string;
    firstSportCategory: string;
    kms: string;
    ms: string;
}
export declare class UpdateTypeDto {
    typeId: number;
    typeName: string;
    measure: Measure;
    thirdSportCategory: string;
    secondSportCategory: string;
    firstSportCategory: string;
    kms: string;
    ms: string;
}
export declare class DeleteTypeDto {
    typeId: number;
}
export {};
