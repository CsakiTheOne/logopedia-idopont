import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        logIn: (state, action) => state = action.payload,
        logOut: state => state = {},
    }
});

export const store = configureStore({
    user: userSlice.reducer,
});
