import {createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filterKeyWord: ''
    },
    reducers: {
        setFilterKeyWord(state, action){
            state.filterKeyWord = action.payload
        }
    }
})

export const filterActions = filterSlice.actions
export default filterSlice