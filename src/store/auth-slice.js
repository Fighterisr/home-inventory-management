import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isLoggedIn: false,
    },
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem('token', state.token);
        },
        logout(state) {
            state.token = '';
            state.isLoggedIn = false;
            localStorage.removeItem('token');
        }
    }

});

export const authActions = authSlice.actions;
export default authSlice;