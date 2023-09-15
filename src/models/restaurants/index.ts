export interface IRestaurantState {
    data: IRestaurantData[],
    status: string,
}


export interface IRestaurantResponse {
    data: IRestaurantData[],
    statusCode: number,
    statusName: string,

}

export interface IRestaurantData {
    closeTime: string,
    createdAt: string,
    email: string,
    id: number,
    name: string,
    openTime: string,
    phone: string,
    role: string,
    updatedAt: string,
}