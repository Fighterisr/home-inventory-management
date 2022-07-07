import {createSlice} from "@reduxjs/toolkit";
import {db} from "../firebase";
import {ref, set} from "firebase/database";


const dbRef = ref(db, '/family/smith/purchaseList')

const purchaseListSlice = createSlice({
    name: 'purchaseList',
    initialState: {
        purchaseList: []
    },
    reducers: {
        setPurchaseList(state, action) {
            state.purchaseList = action.payload
            set(dbRef, state.purchaseList);
        },
        addPurchaseListItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.purchaseList.find((item) => item.name.toLowerCase() === newItem.name.toLowerCase());
            if (!existingItem) {
                state.purchaseList.push({
                    name: newItem.name,
                    description: "",
                    amount: newItem.amount,
                    location: ""
                });
            } else {
                existingItem.amount += newItem.amount
            }
            set(dbRef, state.purchaseList);
        }
    }
})

export const purchaseListActions = purchaseListSlice.actions
export default purchaseListSlice