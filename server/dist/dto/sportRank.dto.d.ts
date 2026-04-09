declare enum RankValue {
    FIRST = "FIRST",
    SECOND = "SECOND",
    THIRD = "THIRD",
    KMS = "KMS",
    MS = "MS"
}
export declare class CreateRankDto {
    sportsmenId: number;
    typeId: number;
    rank: RankValue;
    rankDate: Date;
}
export declare class UpdateRankDto {
    sportsmenId: number;
    typeId: number;
    rank: RankValue;
    rankDate: Date;
}
export declare class DeleteRankDto {
    sportsmenId: number;
    typeId: number;
}
export {};
