import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IInitialState {
    isLoading: boolean;
    isError: boolean;
    value: IProductState[]
}

const initialState: IInitialState = {
    isLoading: false,
    isError: false,
    value: []
}

export interface IProductState {
    title: '',
    subtitle: '',
    image: '',
    description: '',
    rate: 0,
    price: 0,
    color: '',
    size: ''
  }

export const fetchProduct = createAsyncThunk('products-fetch', async () => {
    const response = await axios.get("https://ecommerce-backend-fawn-eight.vercel.app/api/products");
    return response.data;
})

const ProductSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.value = action.payload;
        })
        builder.addCase(fetchProduct.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default ProductSlice.reducer;