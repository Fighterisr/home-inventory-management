import {createSlice} from "@reduxjs/toolkit";

const purchaseListSlice = createSlice({
    name: 'purchaseList',
    initialState: {
        purchaseList: []
    },
    reducers: {
        setPurchaseList(state, action) {
            state.purchaseList = action.payload
        }
    }
})

export const purchaseListActions = purchaseListSlice.actions
export default purchaseListSlice