import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Fragment, useRef, useState} from "react";
import {ref, set} from "firebase/database"
import {db, auth} from "../firebase"

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
}



const NewItem = (props) => {
    const [open, setOpen] = useState(false);

    const nameInputRef = useRef();
    const descriptionInputRef = useRef();
    const amountInputRef = useRef();
    const locationInputRef = useRef();

    const handleClickOpen = () => {
        setOpen(true);
    };


    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredAmount = amountInputRef.current.value;
        const enteredLocation = locationInputRef.current.value;
        const itemObj = {
            name: enteredName,
            description: enteredDescription,
            amount: enteredAmount,
            location: enteredLocation
        }

        const uid = auth.currentUser.uid;
        const dbRef = ref(db, '/items/'+uid)


        set(dbRef, [...props.inventoryItems, itemObj]);
        props.setInventoryItems([...props.inventoryItems, itemObj])
        setOpen(false);


    }

    return (
        <Fragment>
            <Fab color="primary" variant="extended" aria-label="add" style={fabStyle} onClick={handleClickOpen}>
                <AddIcon/>
                New Item
            </Fab>
            <Dialog open={open}>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                    <TextField label={"Name"} inputRef={nameInputRef}/>
                    <TextField label={"Description"} inputRef={descriptionInputRef}/>
                    <TextField label={"Amount"} inputRef={amountInputRef}/>
                    <TextField label={"Location"} inputRef={locationInputRef}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setOpen(false)}}>Cancel</Button>
                    <Button onClick={submitHandler}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default NewItem