import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import sortSlice from "./sort-slice";
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import {combineReducers} from 'redux';
import filterSlice from "./filter-slice";
import inventoryItemsSlice from "./inventory-items-slice";
import purchaseListSlice from "./purchase-list-slice";



const reducers = combineReducers({
    auth: authSlice.reducer, sort: sortSlice.reducer, filter: filterSlice.reducer,
    inventoryItems: inventoryItemsSlice.reducer, purchaseList: purchaseListSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;