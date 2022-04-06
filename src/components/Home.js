import {db, auth} from "../firebase"
import {ref, get} from "firebase/database"
import {Fragment, useEffect} from "react";
import InventoryList from "./InventoryList";
import NewItem from "./NewItem";
import {useDispatch, useSelector} from "react-redux";
import {inventoryItemsActions} from "../store/inventory-items-slice";



const Home = props => {

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
        <Fragment>
            <NewItem/>
            <InventoryList/>
        </Fragment>
    )
}

export default Home;