import { api } from "../services/base";
import { IUserRegistrationData } from "../models";



export const UserRegistration = (body:IUserRegistrationData) => {
    return api.post('auth/user/register',body);
};