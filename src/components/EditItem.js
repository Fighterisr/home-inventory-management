import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField} from "@mui/material";
import {useRef, useState} from "react";
import {auth, db} from "../firebase";
import {ref, set} from "firebase/database";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {inventoryItemsActions} from "../store/inventory-items-slice";


const EditItem = (props) => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()
    const inventoryItems = useSelector(state => state.inventoryItems.inventoryItems)

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

        const inventoryItemsSpliced = [...inventoryItems]
        inventoryItemsSpliced.splice(props.index,1,itemObj)

        set(dbRef, inventoryItemsSpliced);
        dispatch(inventoryItemsActions.setInventoryItems([...inventoryItemsSpliced]))
        setOpen(false);
    }

    return (
        <>
            <Button size = "small" variant="outlined" onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open}>
                <DialogTitle >Edit Item</DialogTitle>
                <Divider/>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item>
                             <TextField label={"Name"} inputRef={nameInputRef} defaultValue={props.name}/>
                        </Grid>
                        <Grid item>
                            <TextField label={"Description"} inputRef={descriptionInputRef} defaultValue={props.description}/>
                        </Grid>
                        <Grid item>
                            <TextField label={"Amount"} inputRef={amountInputRef} defaultValue={props.amount}/>
                        </Grid>
                        <Grid item>
                            <TextField label={"Location"} inputRef={locationInputRef} defaultValue={props.location}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpen(false)}}>Cancel</Button>
                    <Button onClick={submitHandler} color="success">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditItem;