import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Fragment, useRef, useState} from "react";
import Grid from "@mui/material/Grid";
import {useDispatch} from "react-redux";
import {inventoryItemsActions} from "../store/inventory-items-slice";

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
}



const NewItem = () => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()

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

        const newItem = {
            name: enteredName,
            description: enteredDescription,
            amount: enteredAmount,
            location: enteredLocation
        }

        dispatch(inventoryItemsActions.addInventoryItem(newItem))
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
                <Divider/>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item>
                            <TextField label={"Name"} inputRef={nameInputRef}/>
                        </Grid>
                        <Grid item>
                            <TextField label={"Description"} inputRef={descriptionInputRef}/>
                        </Grid>
                        <Grid item>
                            <TextField label={"Amount"} inputRef={amountInputRef}
                                       inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}/>
                        </Grid>
                        <Grid item>
                            <TextField label={"Location"} inputRef={locationInputRef}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setOpen(false)}}>Cancel</Button>
                    <Button color="success" onClick={submitHandler}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default NewItem