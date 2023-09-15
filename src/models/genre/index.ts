export interface IGenreState{
    data:IGenreData[],
}

export interface IGenreResponse {
    data: IGenreData[],
    statusCode: number,
    statusName: string,

}

export interface IGenreData {
    id:number,
    name:string,
}