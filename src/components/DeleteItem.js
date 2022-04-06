import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider} from "@mui/material";
import {useState} from "react";
import {auth, db} from "../firebase";
import {ref, set} from "firebase/database";
import {useDispatch, useSelector} from "react-redux";
import {inventoryItemsActions} from "../store/inventory-items-slice";

const buttonStyle = {
    bgcolor: 'red',
    ':hover': {
        bgcolor: 'red'
    }
}

const DeleteItem = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch()
    const inventoryItems = useSelector(state => state.inventoryItems.inventoryItems)

    const deleteCurrentItem = () => {
        const newArray = inventoryItems.filter((element,index) => index !== props.index)

        const uid = auth.currentUser.uid;
        const dbRef = ref(db, '/items/'+uid)

        set(dbRef, newArray);
        dispatch(inventoryItemsActions.setInventoryItems([...newArray]))
        setOpen(false);
    }

    return (
        <>
            <Button size = "small" color = "error" variant="outlined" onClick={handleClickOpen}>Delete</Button>
            <Dialog open={open}>
                <DialogTitle>Delete Item</DialogTitle>
                <Divider/>
                <DialogContent>

                    <Alert severity="error">
                        Are you sure?
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpen(false)}}>Cancel</Button>
                    <Button color="error" onClick={deleteCurrentItem}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteItem;