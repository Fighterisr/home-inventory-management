import {createSlice} from "@reduxjs/toolkit";
import {db} from "../firebase";
import {ref, set} from "firebase/database";

let dbRef;
const maxItems = 50

const lastPurchaseSlice = createSlice({
    name: 'lastPurchase',
    initialState: {
        lastPurchase: [],
        familyName: "Smith"
    },
    reducers: {
        setLastPurchase(state, action) {
            state.lastPurchase = action.payload
            dbRef = ref(db, `/family/${state.familyName}/lastPurchase`)
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
                dbRef = ref(db, `/family/${state.familyName}/lastPurchase`)
                set(dbRef, state.lastPurchase);
            }
        },
        setFamilyName(state, action) {
            state.familyName = action.payload;
        }
    }
})

export const lastPurchaseActions = lastPurchaseSlice.actions
export default lastPurchaseSlice