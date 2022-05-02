import {createSlice} from "@reduxjs/toolkit";
import {db} from "../firebase";
import {ref, set} from "firebase/database";

const dbRef = ref(db, '/family/smith/lastPurchase')

const maxItems = 50

const lastPurchaseSlice = createSlice({
    name: 'lastPurchase',
    initialState: {
        lastPurchase: []
    },
    reducers: {
        setLastPurchase(state, action) {
            state.lastPurchase = action.payload
            set(dbRef, state.lastPurchase);
        },
        addLastPurchaseItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.lastPurchase.find((item) => item.name === newItem.name);
            if (!existingItem) {
                if (state.lastPurchase.length >= maxItems) {
                    state.lastPurchase.shift()
                }
                state.lastPurchase.push({
                    name: newItem.name,
                    description: "",
                    amount: 1,
                    location: ""
                });
                set(dbRef, state.lastPurchase);
            }
        }
    }
})

export const lastPurchaseActions = lastPurchaseSlice.actions
export default lastPurchaseSlice