import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField} from "@mui/material";
import {useRef, useState} from "react";
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
        let enteredAmount = amountInputRef.current.value;
        const enteredLocation = locationInputRef.current.value;

        if(enteredName.length === 0)
            return

        if(enteredAmount.match(/[1-9]/)) {
            enteredAmount = parseInt(enteredAmount)
        } else {
            return
        }

        const itemObj = {
            name: enteredName,
            description: enteredDescription,
            amount: enteredAmount,
            location: enteredLocation
        }

        const inventoryItemsSpliced = [...inventoryItems]
        inventoryItemsSpliced.splice(props.index,1,itemObj)
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
                            <TextField label={"Amount"} inputRef={amountInputRef} defaultValue={props.amount}
                                       inputProps={{ inputMode: 'numeric'}}/>
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