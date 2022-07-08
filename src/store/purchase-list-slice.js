import {createSlice} from "@reduxjs/toolkit";
import {db} from "../firebase";
import {ref, set} from "firebase/database";

let dbRef;

const purchaseListSlice = createSlice({
    name: 'purchaseList',
    initialState: {
        purchaseList: [],
        familyName: "Smith"
    },
    reducers: {
        setPurchaseList(state, action) {
            state.purchaseList = action.payload
            dbRef = ref(db, `/family/${state.familyName}/purchaseList`)
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
            dbRef = ref(db, `/family/${state.familyName}/purchaseList`)
            set(dbRef, state.purchaseList);
        },
        setFamilyName(state, action) {
            state.familyName = action.payload;
        }
    }
})

export const purchaseListActions = purchaseListSlice.actions
export default purchaseListSlice