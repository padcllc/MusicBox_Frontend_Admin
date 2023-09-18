import { api } from "../services/base";
import { IOrganizationRegistrationData } from "../models";
import { IRestaurantResponse } from "../models/restaurants";
import { IUserResponse } from "../models/users";
import { IAddSongData, IAddSongResponse, ISongsResponse } from "../models/songs";
import { IGenreResponse } from "../models/genre";



export const OrganizationRegistration = (body: IOrganizationRegistrationData) => {
    return api.post('auth/organization/register', body);
};

export const OrganizatiolLogin = (body: any) => {
    return api.post('auth/organization/login', body);
}


export const GetRestaurants = (search:string) => {
    return api.get<IRestaurantResponse>('organizations', {
        params: {
            offset: 0,
            limit: 10000,
            search
        }
    })
};

export const GetUsers = (search:string) => {
    return api.get<IUserResponse>('users', {
        params: {
            offset: 0,
            limit: 10000,
            search
        }
    })
};

export const GetSongs = (search:string) => {
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

}