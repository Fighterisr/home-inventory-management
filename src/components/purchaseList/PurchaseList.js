import {useEffect, useState} from "react";
import {db} from "../../firebase"
import {ref, get} from "firebase/database"
import {AppBar, Button, Dialog, IconButton, Toolbar, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PurchaseListItem from "./PurchaseListItem";
import {useDispatch, useSelector} from "react-redux";
import {purchaseListActions} from "../../store/purchase-list-slice";
import NewPurchaseListItem from "./NewPurchaseListItem";
import {inventoryItemsActions} from "../../store/inventory-items-slice";

const itemsToAdd = []

const itemCheckboxHandler = (event, item) => {
    if (event.target.checked) {
        itemsToAdd.push(item)
    } else {
        let itemIndex = itemsToAdd.findIndex((itemToRemove) => itemToRemove.name === item.name)
        itemsToAdd.splice(itemIndex,1)
    }
}



const PurchaseList = () => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()
    const purchaseList = useSelector(state => state.purchaseList.purchaseList)


    const getItems = () => {
        get(ref(db, '/family/smith/purchaseList')).then((snapshot) => {
            if (snapshot.val()) {
                dispatch(purchaseListActions.setPurchaseList(snapshot.val()))
            }
        })
    }

    useEffect(() => {
            getItems();
    }, [])

    const listItems = purchaseList.map((item, index) =>
        <PurchaseListItem
            key={index}
            index={index}
            name={item.name}
            amount={item.amount}
            itemRef={item}
            changeHandler={itemCheckboxHandler}
        />
    )

    const addSelectedItemsToInventory = () => {
        itemsToAdd.forEach((item) => dispatch(inventoryItemsActions.addInventoryItem(item)))
        const newPurchaseList = purchaseList.filter((item) => !itemsToAdd.includes(item))
        dispatch(purchaseListActions.setPurchaseList([...newPurchaseList]))
        //TODO add lastPurchaseList logic


    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Purchase List
            </Button>
            <Dialog fullScreen open={open}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Purchase List
                        </Typography>
                        <Button variant="contained" onClick={addSelectedItemsToInventory}>
                            Add selected items to inventory list
                        </Button>
                    </Toolbar>
                </AppBar>
                {listItems}
                <NewPurchaseListItem/>
            </Dialog>
        </>
    )
}

export default PurchaseList