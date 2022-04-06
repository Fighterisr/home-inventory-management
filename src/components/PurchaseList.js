import {useEffect, useState} from "react";
import {auth, db} from "../firebase"
import {ref, get} from "firebase/database"



const PurchaseList = () => {
    const [purchaseListArray, setPurchaseListArray] = useState([])

    const getItems = () => {
        get(ref(db, '/family/smith/purchaseList')).then((snapshot) => {
            if (snapshot.val()) {
                setPurchaseListArray(snapshot.val());
            }
        })
    }

    useEffect(() => {
            getItems();
    }, [])

    return (
        <>
            {!purchaseListArray.length && "Purchase list is empty"}

        </>
    )
}

export default PurchaseList