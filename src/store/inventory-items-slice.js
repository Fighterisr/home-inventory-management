import {createSlice} from "@reduxjs/toolkit";

const inventoryItemsSlice = createSlice({
    name: 'inventoryItems',
    initialState: {
        inventoryItems: []
    },
    reducers: {
        setInventoryItems(state, action) {
            state.inventoryItems = action.payload
        }
    }
})

export const inventoryItemsActions = inventoryItemsSlice.actions
export default inventoryItemsSlice