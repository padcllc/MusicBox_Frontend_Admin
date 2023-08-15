import { api } from "../services/base";
import { IOrganizationRegistrationData } from "../models";



export const OrganizationRegistration = (body:IOrganizationRegistrationData) => {
    return api.post('auth/organization/register',body);
};

export const OrganizatiolLogin = (body:any) =>{
return api.post('auth/organization/login',body);
}
