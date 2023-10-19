export interface ISongsState {
    data: ISongsData[],
    status: string,

}

export interface ISongsResponse {
    data: ISongsData[],
    statusCode: number,
    statusName: string,

}

export interface ISongsData {
    id: number,
    endSecond: number,
    genre: { id: number, name: string }
    name: string,
    startSecond: number,
    url: string,
}

/////add song

export interface IAddSongData {
    name: string,
    url: string,
    startSecond: number,
    endSecond: number,
    genreId: number,
}


export interface IAddSongsState {
    status: string,
    error: string | null,
}

export interface IAddSongResponse {

    statusCode: number,
    statusName: string,
    data: {
        success:boolean,
    }
}


/////export interface player 


export interface ISongPlayerStatus{
    action:string;
}


export interface ISongPlayerState{
    songItem:ISongsData | any;
    status:ISongPlayerStatus | any;
    selectedSongIndex:number;
    videoIsPlaying:false,
}