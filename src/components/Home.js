import {db, auth} from "../firebase"
import {ref, get} from "firebase/database"
import {Fragment, useEffect, useState} from "react";
import InventoryList from "./InventoryList";
import NewItem from "./NewItem";


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
            <NewItem inventoryItems={inventoryItems} setInventoryItems={setInventoryItems}/>
            <InventoryList inventoryItems={inventoryItems}/>
        </Fragment>
    )
}

export default Home;