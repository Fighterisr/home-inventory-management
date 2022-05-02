import {
    Alert,
    AppBar,
    Button,
    Card,
    Checkbox,
    Container,
    Dialog,
    IconButton,
    ListItem, ListItemText, Snackbar,
    Toolbar,
    Typography,
} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {purchaseListActions} from "../../store/purchase-list-slice";
import {useDispatch, useSelector} from "react-redux";
import {get, ref} from "firebase/database";
import {db} from "../../firebase";
import {lastPurchaseActions} from "../../store/last-purchase-slice";


const useStyles = makeStyles(theme => ({
    select: {


        display: "flex",
        flex: 1,
        justifyContent: "left",
    },
    bottom: {
        display: "flex",
        flex: 1,
        justifyContent: "right",
    }
}))


const PurchaseListItem = (props) => {

    return (
        <Card variant="outlined">
            <ListItem>
                <Checkbox onChange={(event) => props.changeHandler(event, props.itemRef)}/>
                <Container>
                    <ListItemText>
                        <Typography color="cornflowerblue" variant="h6">
                            {props.name}
                        </Typography>
                    </ListItemText>
                    <ListItemText>{"Amount: " + props.amount}</ListItemText>
                </Container>
            </ListItem>
        </Card>
    )
}

const itemsToAdd = []


const itemCheckboxHandler = (event, item) => {
    if (event.target.checked) {
        itemsToAdd.push(item)
    } else {
        let itemIndex = itemsToAdd.findIndex((itemToRemove) => itemToRemove.name === item.name)
        itemsToAdd.splice(itemIndex, 1)
    }
}

const AddFromLastPurchase = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()
    const lastPurchase = useSelector(state => state.lastPurchase.lastPurchase)


    const addSelectedItemsToInventory = () => {
        if (itemsToAdd.length) {
            itemsToAdd.forEach((item) => dispatch(purchaseListActions.addPurchaseListItem(item)))
            setOpenAlert(true)
        }
    }

    const getItems = () => {
        get(ref(db, '/family/smith/lastPurchase')).then((snapshot) => {
            if (snapshot.val()) {
                dispatch(lastPurchaseActions.setLastPurchase(snapshot.val()))
            }
        })
    }

    useEffect(() => {
        getItems();
    }, [])

    const listItems = lastPurchase.map((item, index) =>
        <PurchaseListItem
            key={index}
            index={index}
            name={item.name}
            amount={item.amount}
            itemRef={item}
            changeHandler={itemCheckboxHandler}
        />
    )


    return (
        <>
            <Button sx={{ml: 2}} variant="contained" onClick={handleClickOpen}>
                Add items from your last purchases
            </Button>
            <Dialog fullScreen open={open}>
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Items from last purchases
                        </Typography>
                        <Button color="success" variant="contained" onClick={addSelectedItemsToInventory}>
                            Add selected items to purchase list
                        </Button>
                    </Toolbar>
                </AppBar>
                {!lastPurchase.length && <h1 align={"center"}>There are no last purchases yet.</h1>}
                {lastPurchase.length > 0 && listItems}
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}
                          anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                >
                    <Alert severity="success">
                        Selected items have been added to your purchase list successfully
                    </Alert>
                </Snackbar>
            </Dialog>
        </>
    )
}

export default AddFromLastPurchase