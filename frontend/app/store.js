import { configureStore } from "@reduxjs/toolkit";
import coutnerReducer from "../features/counter/counterSlice"

const store = configureStore({
    reducer: {
        counter: coutnerReducer
    }
})

export default store