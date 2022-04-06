import {useEffect, useState} from "react";
import {db} from "../../firebase"
import {ref, get} from "firebase/database"
import {AppBar, Button, Dialog, IconButton, Toolbar, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PurchaseListItem from "./PurchaseListItem";
import {useDispatch, useSelector} from "react-redux";
import {purchaseListActions} from "../../store/purchase-list-slice";
import NewPurchaseListItem from "./NewPurchaseListItem";



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
        />
    )

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
                    </Toolbar>
                </AppBar>
                {listItems}
                <NewPurchaseListItem/>
            </Dialog>
        </>
    )
}

export default PurchaseList