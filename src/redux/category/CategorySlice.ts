import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IInitialsState {
    isLoading: boolean;
    isError: boolean;
    value: IValue[]
}

export interface IValue {
    id: string;
    name: string;
    image: string;
}

const initialState: IInitialsState = {
    isLoading: false,
    isError: false,
    value: []
}

export const fetchCategory = createAsyncThunk('category-fetch', async () => {
    const response = await axios.get<IValue[]>("https://ecommerce-backend-fawn-eight.vercel.app/api/categories");
    return response.data;
})

const CategorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.value = action.payload;
        })
        builder.addCase(fetchCategory.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default CategorySlice.reducer;