import { configureStore } from "@reduxjs/toolkit";
import productReducer from './product/ProductSlice.tsx'
import categoryReducer from './category/CategorySlice.ts'


const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer
    }
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store