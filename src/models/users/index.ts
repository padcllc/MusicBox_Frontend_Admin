export interface IUsersState {
    data: IUserData[],
    status: string;
}

export interface IUserResponse {
    data: IUserData[],
    statusCode: number,
    statusName: string,

}

export interface IUserData {
    createdAt: string,
    email: string,
    firstName: string,
    id: number,
    lastName: string,
    role: string,

}