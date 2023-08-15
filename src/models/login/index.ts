export interface IOrganizationLoginState{
    status:string;
    error:string | null;
    accessToken: string | null,
    refreshToken: string | null,
};

export interface IOrganizationLoginData{
    email:string,
    password:string,
};

export interface IOrganizationLoginResponseData{
    accessToken: string,
    refreshToken: string,
}


export interface IOrganizationLoginResponse {
     data: IOrganizationLoginResponseData;
    statusCode: number;
    statusName: string;
  }

  export interface IOrganizationUserActionFulfilled {
    payload: {
      accessToken: string;
      refreshToken: string;
    };
  };