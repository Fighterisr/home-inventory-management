import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import {auth, db} from "../firebase";
import {ref, set} from "firebase/database";

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

    const deleteCurrentItem = () => {
        // const uid = auth.currentUser.uid;
        // const dbRef = ref(db, '/items/'+uid)
        const newArray = props.inventoryItems.filter((element,index) => index !== props.index)

        const uid = auth.currentUser.uid;
        const dbRef = ref(db, '/items/'+uid)

        set(dbRef, newArray);
        props.setInventoryItems(newArray)
        setOpen(false);
    }

    return (
        <>
            <Button sx={buttonStyle} variant="contained" onClick={handleClickOpen}>Delete Item</Button>
            <Dialog open={open}>
                <DialogTitle>Delete Item</DialogTitle>
                <DialogContent>

                    <Alert severity="error">
                        Are you sure?
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpen(false)}}>Cancel</Button>
                    <Button onClick={deleteCurrentItem}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteItem;