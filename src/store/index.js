import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    auth: authSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;