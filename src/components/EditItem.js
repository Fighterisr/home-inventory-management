import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useRef, useState} from "react";
import {auth, db} from "../firebase";
import {ref, set} from "firebase/database";


const EditItem = (props) => {
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
        const dbRef = ref(db, '/items/' + uid)

        props.inventoryItems.splice(props.index,1,itemObj)

        set(dbRef, [...props.inventoryItems]);
        props.setInventoryItems([...props.inventoryItems])
        setOpen(false);
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>Edit Item</Button>
            <Dialog open={open}>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                    <TextField label={"Name"} inputRef={nameInputRef} defaultValue={props.name}/>
                    <TextField label={"Description"} inputRef={descriptionInputRef} defaultValue={props.description}/>
                    <TextField label={"Amount"} inputRef={amountInputRef} defaultValue={props.amount}/>
                    <TextField label={"Location"} inputRef={locationInputRef} defaultValue={props.location}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpen(false)}}>Cancel</Button>
                    <Button onClick={submitHandler}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditItem;