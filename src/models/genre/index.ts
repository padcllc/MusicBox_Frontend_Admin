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


export interface IAddGenreState{
    status:string,
    error:string |  null,
}


export interface IAddGenreData{
    name:string;
}

export interface IAddGenreResponse{
    statusCode: number,
    statusName: string,
    data: {
        success:boolean,
    }
}