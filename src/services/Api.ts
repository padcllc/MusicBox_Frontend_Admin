import { api } from "../services/base";
import { IOrganizationRegistrationData } from "../models";
import { IRestaurantResponse } from "../models/restaurants";
import { IUserResponse } from "../models/users";
import { IAddSongData, IAddSongResponse, ISongsResponse } from "../models/songs";
import { IAddGenreData, IAddGenreResponse, IEditGenreData, IGenreResponse } from "../models/genre";



export const OrganizationRegistration = (body: IOrganizationRegistrationData) => {
    return api.post('auth/organization/register', body);
};

export const OrganizatiolLogin = (body: any) => {
    return api.post('auth/organization/login', body);
}


export const GetRestaurants = (search: string) => {
    return api.get<IRestaurantResponse>('organizations', {
        params: {
            offset: 0,
            limit: 10000,
            search
        }
    })
};

export const GetUsers = (search: string) => {
    return api.get<IUserResponse>('users', {
        params: {
            offset: 0,
            limit: 10000,
            search
        }
    })
};

export const GetSongs = (search: string) => {
    return api.get<ISongsResponse>('songs', {
        params: {
            offset: 0,
            limit: 10000,
            search
        }
    })
};


export const GetGenre = () => {
    return api.get<IGenreResponse>('genre', {
        params: {
            offset: 0,
            limit: 10000
        }
    })
};

export const AddSong = (body: IAddSongData) => {
    return api.post<IAddSongResponse>('songs', body);

};

export const Balk = (file: any) => {
    var data = new FormData();
    data.append('file', file);
    return api.post<any>('songs/bulk', data);
};

export const AddGenre = (body: IAddGenreData) => {
    return api.post<IAddGenreResponse>('genre', body);
};


export const DeleteGenreItem = (id: number) => {
    return api.delete(`genre/${id}`);
};

export const GetGenreById = (id: number) => {
    return api.get(`genre/${id}`);
};

export const EditGenre = (id: number, body: IEditGenreData) => {
    return api.put(`genre/${id}`, body);
}

export const GetYoutubeVideo = (apiKey:string,videoId:string) =>{
    return api.get(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=snippet`, 
    {headers: {'non_auth':"true"}}
    
    );
}