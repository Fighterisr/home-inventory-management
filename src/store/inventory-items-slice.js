import {createSlice} from "@reduxjs/toolkit";
import {auth, db} from "../firebase";
import {ref, set} from "firebase/database";

let uid, dbRef
auth.onAuthStateChanged(() => {
    uid = auth.currentUser.uid;
    dbRef = ref(db, '/items/'+uid)
})

const inventoryItemsSlice = createSlice({
        name: 'inventoryItems',
        initialState: {
            inventoryItems: []
        },
        reducers: {
            setInventoryItems(state, action) {
                state.inventoryItems = action.payload
                set(dbRef, state.inventoryItems);
            },
            addInventoryItem(state, action) {
                const newItem = action.payload;
                const existingItem = state.inventoryItems.find((item) => item.name.toLowerCase() === newItem.name.toLowerCase());
                if (!existingItem) {
                    state.inventoryItems.push({
                        name: newItem.name,
                        description: newItem.description,
                        amount: newItem.amount,
                        location: newItem.location
                    });
                } else {
                    existingItem.amount += newItem.amount
                    if(newItem.description && newItem.location) {
                        console.log(newItem.description + " " + newItem.location)
                        existingItem.description = newItem.description
                        existingItem.location = newItem.location
                    }
                }
                set(dbRef, state.inventoryItems);
            }
        }
    })

export const inventoryItemsActions = inventoryItemsSlice.actions
export default inventoryItemsSlice