export interface IOrganizationRegistrationFormData {
  name: string,
  email: string,
  password: string,
  confirmPassword: string;
  address:string;
  phone:string;
  openTime:string;
  closeTime:string;
}



export interface IOrganizationRegistrationData {
  name: string,
  email: string,
  password: string,
  phone:string;
  openTime:string;
  closeTime:string;
  address: {
    addressName: string,
    latitude: number,
    longitude: number,
  }
}

export interface IOrganizationRegistrationState {
  status: string;
  error: string | null;
}

export interface IOrganizationRegistrationResponse {
  accessToken: string;
  refreshToken: string;
  statusCode: number;
  statusName: string;
}
