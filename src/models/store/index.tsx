import { IOrganizationLoginState } from "../login";
import { IOrganizationRegistrationState } from "../registration";


export interface IGeneralState {
        organizationRegistration: IOrganizationRegistrationState;
        organizationLogin:IOrganizationLoginState;
  
}