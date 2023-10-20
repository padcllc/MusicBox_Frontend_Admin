import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { GetRestaurants } from "../../../../../services/api";
import { IRestaurantResponse, IRestaurantState } from "../../../../../models/restaurants";
import { IGeneralState } from "../../../../../models";


const initialReataurantState: IRestaurantState = {
    data: [],
    status: '',
};


export const increamentRestautantsAsync = createAsyncThunk(
    "get/restaurants",
    async (search:string, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: AxiosResponse<IRestaurantResponse> = await GetRestaurants(search);
            return fulfillWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response.data.errors[0].message);
        }
    }
);

export const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState: initialReataurantState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(increamentRestautantsAsync.pending, (state: IRestaurantState) => {
        state.status = "loading";
      });
      builder.addCase(
        increamentRestautantsAsync.fulfilled,
        (state: IRestaurantState, action: any) => {
          state.data = action.payload;
          state.status = "idle";
        }
      );
    },
  });
  

export const restaurantInformation = (state: IGeneralState) =>state.restaurants.data;

export const restaurantStatus = (state: IGeneralState) => state.restaurants.status;

export default restaurantsSlice.reducer;



