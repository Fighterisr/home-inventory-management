import {db, auth} from "../firebase"
import {ref, get} from "firebase/database"
import {useEffect} from "react";
import InventoryList from "./InventoryList";
import NewItem from "./NewItem";
import {useDispatch} from "react-redux";
import {inventoryItemsActions} from "../store/inventory-items-slice";



const Home = () => {

    const dispatch = useDispatch()
    const getItems = () => {
        const uid = auth.currentUser.uid
        get(ref(db, '/items/' + uid)).then((snapshot) => {
            if (snapshot.val()) {
                dispatch(inventoryItemsActions.setInventoryItems(snapshot.val()))

            }
        })
    }


    useEffect(() => {
        auth.onAuthStateChanged(() => {
            getItems();
        })
    }, [])


    return (
        <>
            <NewItem/>
            <InventoryList/>
        </>
    )
}

export default Home;