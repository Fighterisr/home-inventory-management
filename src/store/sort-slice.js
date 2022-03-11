import {createSlice} from "@reduxjs/toolkit";

const sortSlice = createSlice({
    name: 'sort',
    initialState: {
        sortType: 'name',
        sortAsc: true
    },
    reducers: {
        setSortType(state, action){
            state.sortType = action.payload
        },
        setSortAsc(state, action){
            state.sortAsc = action.payload
        }
    }
})

export const sortActions = sortSlice.actions
export default sortSlice