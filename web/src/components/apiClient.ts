export interface Sportsmen {
    sportsmenId: number;
    firstName: string;
    lastName: string;
    patronymic: string | null;
    birthDate: string; // ISO формат: "YYYY-MM-DD"
}

export interface CreateSportsmanDto {
    firstName: string;
    lastName: string;
    patronymic?: string | null;
    birthDate: string;
}

export interface UpdateSportsmenDto {
    sportsmenId: number
    firstName: string | undefined;
    lastName: string | undefined;
    patronymic?: string | null | undefined;
    birthDate: string | undefined;
}

export interface DeleteSportsmenDto {
    sportsmenId: number
}


export interface SportType {

    typeId: number;

    typeName: string;

    measure: string;

    thirdSportCategory: string | null

    secondSportCategory: string | null

    firstSportCategory: string | null

    kms: string | null

    ms: string | null
}


export interface CreateTypeDto {
    typeName: string;

    measure: string;

    thirdSportCategory: string | null

    secondSportCategory: string | null

    firstSportCategory: string | null

    kms: string | null

    ms: string | null
}

export interface UpdateTypeDto {
    typeId: number;

    typeName: string | undefined;

    measure: string | undefined;

    thirdSportCategory: string | undefined

    secondSportCategory: string | undefined

    firstSportCategory: string | undefined

    kms: string | undefined

    ms: string | undefined
}

export interface DeleteTypeDto {
    typeId: number
}


export interface SportRank {
    sportsmenId: number

    sportTypeId: number;

    sportsmenRank: string | null;

    rankDate: string | null;
}


export interface CreateRankDto {

    sportsmenId: number

    typeId: number;

    rank: string | null;

    rankDate: string | null;
}

export interface UpdateRankDto {
    sportsmenId: number

    typeId: number;

    rank: string;

    rankDate: Date;
}

export interface DeleteRankDto {

    sportsmenId: number

    typeId: number;
}

export interface City {
    cityId: number;
    cityName: string;
    region: string;
}

export interface CreateCityDto {
    cityName: string;
    region: string;
}

export interface UpdateCityDto {
    cityId: number
    cityName: string | undefined;
    region: string | undefined;
}

export interface DeleteCityDto {
    cityId: number
}

export interface Competition {

    competitionId: number,

    competitionName: string,

    dateCompetition: string,

    cityCompetitionId: number;

}

export interface CreateCompetitionDto {

    competitionName: string,

    competitionDate: string,

    cityId: number;
}

export interface UpdateCompetitionDto {
    competitionId: number,

    competitionName: string,

    competitionDate: string,

    cityId: number;
}

export interface DeleteCompetitionDto {
    competitionId: number
}

export interface CompetitionTypeDto {
    competitionId: number,
    sportTypeId: number
}

export interface SportsmenCompetitionDto {
    sportsmenId: number,
    sportTypeId: number,
    competitionId: number,
    place: number | null,
    result: number | null,
    ageGroup: string

}


export interface CreateSportsmenCompetitionDto {
    sportsmenId: number,
    sportTypeId: number,
    competitionId: number,
    place: number | null,
    result: number | null,
    ageGroup: string
}

export interface UpdateSportsmenCompetitionDto {
    sportsmenId: number,
    sportTypeId: number,
    competitionId: number,
    place: number | undefined,
    result: number | undefined,
    ageGroup: string | undefined
}

export interface DeleteSportsmenCompetitionDto {
    sportsmenId: number,
    sportTypeId: number,
    competitionId: number
}


export interface CompetitionReportDto {
    reportId: number,
    sportTypeId: number,
    sportTypeName: string,
    competitionCount: number, //DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES
    participantCount: number,
    ageGroup: string,
    reportYear: number
}

export interface DiplomaData {
    sportsmenId: number;
    sportTypeId: number;
    competitionId: number;
    fullName: string;
    competitionName: string;
    sportType: string;
    place: number | null | string;
    result: string | null| number;
    date: string;
}

export interface DiplomaDto {
    sportsmenId: string,
    sportTypeId: string,
    competitionId: string
}
















































export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export type ColumnConfig<T> = {
    key: keyof T;
    title: string;
    sortable?: boolean;
    width?: string;
};



//ApiClient\\
export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = "http://localhost:3001/db") {
        this.baseUrl = baseUrl;
    }

    async create(sportsmen: CreateSportsmanDto): Promise<ApiResponse<Sportsmen>> {
        try {
            const response = await fetch(`${this.baseUrl}/create-sportsmen`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sportsmen)
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };

            const data: Sportsmen = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async getAllSportsmens(): Promise<ApiResponse<Sportsmen[]>> {
        try {
            const response = await fetch(`${this.baseUrl}/all-sportsmens`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };
            const data: Sportsmen[] = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async updateSportsmen(sportsmen: UpdateSportsmenDto): Promise<ApiResponse<Sportsmen>> {
        try {
            // Преобразование ID в число
            const sportsmenId = parseInt(sportsmen.sportsmenId.toString());
            if (isNaN(sportsmenId)) {
                return {
                    success: false,
                    error: "Некорректный формат ID спортсмена"
                };
            }

            // Подготовка тела запроса
            const body = JSON.stringify({
                sportsmenId,
                firstName: sportsmen.firstName || undefined,
                lastName: sportsmen.lastName || undefined,
                patronymic: sportsmen.patronymic !== undefined ? sportsmen.patronymic : undefined,
                birthDate: sportsmen.birthDate || undefined
            });

            const response = await fetch(`${this.baseUrl}/update-sportsmen`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: Sportsmen = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async deleteSportsmen(id: DeleteSportsmenDto): Promise<ApiResponse<Sportsmen>> {
        try {
            const body = JSON.stringify({ sportsmenId: parseInt(id.sportsmenId.toString()) })
            const response = await fetch(`${this.baseUrl}/delete-sportsmen`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: Sportsmen = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async createType(type: CreateTypeDto): Promise<ApiResponse<SportType>> {
        try {
            const response = await fetch(`${this.baseUrl}/create-sport-type`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(type)
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };

            const data: SportType = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async getAllTypies(): Promise<ApiResponse<SportType[]>> {
        try {
            const response = await fetch(`${this.baseUrl}/all-sport-types`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };
            const data: SportType[] = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async updateType(type: UpdateTypeDto): Promise<ApiResponse<SportType>> {
        try {
            // Преобразование ID в число
            const typeId = parseInt(type.typeId.toString());
            if (isNaN(typeId)) {
                return {
                    success: false,
                    error: "Некорректный формат ID спортсмена"
                };
            }

            // Подготовка тела запроса
            const body = JSON.stringify({
                typeId,
                typeName: type.typeName || undefined,
                measure: type.measure || undefined,
                thirdSportCategory: type.thirdSportCategory || undefined,
                secondSportCategory: type.secondSportCategory || undefined,
                firstSportCategory: type.firstSportCategory || undefined,
                kms: type.kms || undefined,
                ms: type.ms || undefined
            });

            const response = await fetch(`${this.baseUrl}/update-sport-type`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: SportType = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async deleteType(id: DeleteTypeDto): Promise<ApiResponse<SportType>> {
        try {
            const body = JSON.stringify({ typeId: parseInt(id.typeId.toString()) })
            const response = await fetch(`${this.baseUrl}/delete-sport-type`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: SportType = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async createRank(rank: CreateRankDto): Promise<ApiResponse<SportRank>> {
        try {
            const response = await fetch(`${this.baseUrl}/create-sportsmen-rank`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rank)
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };

            const data: SportRank = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }


    async getAllRanks(): Promise<ApiResponse<SportRank[]>> {
        try {
            const response = await fetch(`${this.baseUrl}/all-sportsmen-ranks`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };
            const data: SportRank[] = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }


    async updateRank(rank: UpdateRankDto): Promise<ApiResponse<SportRank>> {
        try {
            // Преобразование ID в число
            const sportsmenId = parseInt(rank.sportsmenId.toString())
            const typeId = parseInt(rank.typeId.toString());
            if (isNaN(typeId)) {
                return {
                    success: false,
                    error: "Некорректный формат ID спортсмена"
                };
            }
            if (isNaN(sportsmenId)) {
                return {
                    success: false,
                    error: "Некорректный формат ID спортсмена"
                };
            }

            // Подготовка тела запроса
            const body = JSON.stringify({
                sportsmenId,
                typeId,
                rank: rank.rank,
                rankDate: rank.rankDate
            });

            const response = await fetch(`${this.baseUrl}/update-sportsmen-rank`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: SportRank = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async deleteRank(id: DeleteRankDto): Promise<ApiResponse<SportRank>> {
        try {
            const body = JSON.stringify({
                sportsmenId: parseInt(id.sportsmenId.toString()),
                typeId: parseInt(id.typeId.toString())
            })
            const response = await fetch(`${this.baseUrl}/delete-sportsmen-rank`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: SportRank = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }


    async createCity(city: CreateCityDto): Promise<ApiResponse<City>> {
        try {
            const response = await fetch(`${this.baseUrl}/create-city`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(city)
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };

            const data: City = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async getAllCities(): Promise<ApiResponse<City[]>> {
        try {
            const response = await fetch(`${this.baseUrl}/all-cities`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };
            const data: City[] = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async updateCity(city: UpdateCityDto): Promise<ApiResponse<City>> {
        try {
            // Преобразование ID в число
            const cityId = parseInt(city.cityId.toString());
            if (isNaN(cityId)) {
                return {
                    success: false,
                    error: "Некорректный формат ID спортсмена"
                };
            }

            // Подготовка тела запроса
            const body = JSON.stringify({
                cityId,
                cityName: city.cityName || undefined,
                region: city.region || undefined
            });

            const response = await fetch(`${this.baseUrl}/update-city`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: City = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async deleteCity(id: DeleteCityDto): Promise<ApiResponse<City>> {
        try {
            const body = JSON.stringify({ cityId: parseInt(id.cityId.toString()) })
            const response = await fetch(`${this.baseUrl}/delete-city`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: City = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }
    async createCompetition(competition: CreateCompetitionDto): Promise<ApiResponse<Competition>> {
        try {
            const response = await fetch(`${this.baseUrl}/create-competition`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(competition)
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };

            const data: Competition = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async getAllCompetitions(): Promise<ApiResponse<Competition[]>> {
        try {
            const response = await fetch(`${this.baseUrl}/all-competitions`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };
            const data: Competition[] = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }


    async updateCompetition(competition: UpdateCompetitionDto): Promise<ApiResponse<Competition>> {
        try {
            // Преобразование ID в число
            const competitionId = parseInt(competition.competitionId.toString());
            if (isNaN(competitionId)) {
                return {
                    success: false,
                    error: "Некорректный формат ID спортсмена"
                };
            }

            // Подготовка тела запроса
            const body = JSON.stringify({
                competitionId,
                competitionName: competition.competitionName || undefined,
                competitionDate: competition.competitionDate || undefined,
                cityId: competition.cityId
            });

            const response = await fetch(`${this.baseUrl}/update-competition`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: Competition = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async deleteCompetition(id: DeleteCompetitionDto): Promise<ApiResponse<Competition>> {
        try {
            const body = JSON.stringify({ competitionId: parseInt(id.competitionId.toString()) })
            const response = await fetch(`${this.baseUrl}/delete-competition`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: Competition = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }
    async createCompetitionType(city: CompetitionTypeDto): Promise<ApiResponse<CompetitionTypeDto>> {
        try {
            const response = await fetch(`${this.baseUrl}/create-type-competition`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(city)
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };

            const data: CompetitionTypeDto = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async getAllCompetitionTypies(): Promise<ApiResponse<CompetitionTypeDto[]>> {
        try {
            const response = await fetch(`${this.baseUrl}/all-type-competitions`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };
            const data: CompetitionTypeDto[] = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async deleteCompetitionType(id: CompetitionTypeDto): Promise<ApiResponse<CompetitionTypeDto>> {
        try {
            const body = JSON.stringify({
                competitionId: parseInt(id.competitionId.toString()),
                sportTypeId: parseInt(id.sportTypeId.toString())
            })
            const response = await fetch(`${this.baseUrl}/delete-type-competition`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: CompetitionTypeDto = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }
    async createSportsmenCompetition(spcomp: SportsmenCompetitionDto): Promise<ApiResponse<SportsmenCompetitionDto>> {
        try {
            const response = await fetch(`${this.baseUrl}/register-sportsmen-competition`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(spcomp)
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };

            const data: SportsmenCompetitionDto = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async getAllSportsmenCompetitions(): Promise<ApiResponse<SportsmenCompetitionDto[]>> {
        try {
            const response = await fetch(`${this.baseUrl}/all-sportsmens-competitions`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };
            const data: SportsmenCompetitionDto[] = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async updateSportsmenCompetition(spcomp: UpdateSportsmenCompetitionDto): Promise<ApiResponse<SportsmenCompetitionDto>> {
        try {
            // Преобразование ID в число
            const sportsmenId = parseInt(spcomp.sportsmenId.toString());
            const sportTypeId = parseInt(spcomp.sportTypeId.toString())
            const competitionId = parseInt(spcomp.competitionId.toString())
            if (isNaN(sportsmenId)) {
                return {
                    success: false,
                    error: "Некорректный формат ID спортсмена"
                };
            }
            if (isNaN(sportTypeId)) {
                return {
                    success: false,
                    error: "Некорректный формат ID спортсмена"
                };
            }
            if (isNaN(competitionId)) {
                return {
                    success: false,
                    error: "Некорректный формат ID спортсмена"
                };
            }

            // Подготовка тела запроса
            const body = JSON.stringify({
                sportsmenId,
                sportTypeId,
                competitionId,
                place: spcomp.place || undefined,
                result: spcomp.result || undefined,
                ageGroup: spcomp.ageGroup || undefined

            });

            const response = await fetch(`${this.baseUrl}/update-sportsmen-competition`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: SportsmenCompetitionDto = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }

    async deleteSportsmenCompetition(id: DeleteSportsmenCompetitionDto): Promise<ApiResponse<SportsmenCompetitionDto>> {
        try {
            const body = JSON.stringify({
                sportsmenId: parseInt(id.sportsmenId.toString()),
                competitionId: parseInt(id.competitionId.toString()),
                sportTypeId: parseInt(id.sportTypeId.toString()),

            })
            const response = await fetch(`${this.baseUrl}/delete-sportsmen-competition`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`
                };
            }
            const data: SportsmenCompetitionDto = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }
    async getAllReports(year: number): Promise<ApiResponse<CompetitionReportDto[]>> {
        try {
            const response = await fetch(`${this.baseUrl}/all-reports`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    year: year
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };
            const data: CompetitionReportDto[] = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }
    async getDiploma(datatoSend: DiplomaDto): Promise<ApiResponse<DiplomaData>> {
        try {
            const sportsmenId = parseInt(datatoSend.sportsmenId);
            const sportTypeId = parseInt(datatoSend.sportTypeId);
            const competitionId = parseInt(datatoSend.competitionId);

            if (isNaN(sportsmenId)) throw new Error('Invalid sportsmenId');
            if (isNaN(sportTypeId)) throw new Error('Invalid sportTypeId');
            if (isNaN(competitionId)) throw new Error('Invalid competitionId');

            const response = await fetch(`${this.baseUrl}/get-diploma`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sportsmenId,
                    sportTypeId,
                    competitionId
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message || 'HTTP error'
                }
            };
            const data: DiplomaData = await response.json();
            return {
                success: true, data
            };
        }
        catch (error) {
            return {
                success: false,
                error: (error as Error).message || 'Network error'
            };
        }
    }
}
