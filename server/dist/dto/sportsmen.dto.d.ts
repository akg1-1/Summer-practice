export declare class CreateSportsmanDto {
    firstName: string;
    lastName: string;
    patronymic?: string;
    birthDate: Date;
}
export declare class UpdateSportsmenDto {
    sportsmenId: number;
    firstName: string;
    lastName: string;
    patronymic?: string;
    birthDate: Date;
}
export declare class DeleteSportsmenDto {
    sportsmenId: number;
}
