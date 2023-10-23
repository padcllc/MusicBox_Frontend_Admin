export interface IYoutubeSongDataResponse {
    apiKey:string,
    videoId:string,
}

export interface IYoutubeSongState{
    youtubeSongData:any;
}

export interface IYoutubeSongData{
    youtubeSongData:any;
}

export interface IVideoInfoData {
    categoryId: string,
    channelId: string,
    channelTitle: string,
    defaultAudioLanguage: string,
    description: string,
    liveBroadcastContent: string,
    localized: {
        description: string,
        title: string,
    },
    publishedAt: string,
    tags: (26)[],
    thumbnails: {
        default: {
            height: number,
            url: string,
            width: number,
        },
        high: {
            height: number,
            url: string,
            width: number,
        },
        maxres: {
            height: number,
            url: string,
            width: number,
        },
        medium: {
            height: number,
            url: string,
            width: number,
        },
        standard: {
            height: number,
            url: string,
            width: number,
        }
    }
    title: string,
}