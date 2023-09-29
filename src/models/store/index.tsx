import { IAddGenreState, IEditGenreState, IGenreState } from "../genre";
import { IOrganizationLoginState } from "../login";
import { IOrganizationRegistrationState } from "../registration";
import { IRestaurantState } from "../restaurants";
import { IAddSongsState, ISongsState } from "../songs";
import { IUsersState } from "../users";


export interface IGeneralState {
        organizationRegistration: IOrganizationRegistrationState;
        organizationLogin:IOrganizationLoginState;
        restaurants:IRestaurantState,
        users:IUsersState
        songs:ISongsState,
        genre:IGenreState,
        addSongs:IAddSongsState,
        addGenre:IAddGenreState,
        editGenre:IEditGenreState
}