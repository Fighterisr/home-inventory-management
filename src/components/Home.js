import {db, auth} from "../firebase"
import {ref, get} from "firebase/database"
import {Fragment, useEffect, useState} from "react";
import InventoryList from "./InventoryList";
import NewItem from "./NewItem";
import PurchaseList from "./PurchaseList";


const Home = props => {
    const [inventoryItems, setInventoryItems] = useState([]);

    const getItems = () => {
        const uid = auth.currentUser.uid
        get(ref(db, '/items/' + uid)).then((snapshot) => {
            if (snapshot.val()) {
                setInventoryItems(snapshot.val());
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
            <PurchaseList inventoryItems={inventoryItems} setInventoryItems={setInventoryItems}/>
            <NewItem inventoryItems={inventoryItems} setInventoryItems={setInventoryItems}/>
            <InventoryList inventoryItems={inventoryItems} setInventoryItems={setInventoryItems}/>
        </Fragment>
    )
}

export default Home;