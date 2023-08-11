export interface IUserRegistrationData {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword?:string;
}

export interface IUserRegistrationState{
    status: string;
    error: string | null;
    accessToken:string,
    refreshToken:string,
}

export interface IUserRegistrationResponseData{
    accessToken:string;
    refreshToken:string;
}

export interface IUserRegistrationResponse{
    data:IUserRegistrationResponseData;
    statusCode:number;
    statusName:string;
}

export interface IUserRegistrationctionFulfilled {
    payload: {
      accessToken: string;
      refreshToken: string;
    };
  };

  export interface IUserRegistrationctionRejected{
    payload:string;
  }
  