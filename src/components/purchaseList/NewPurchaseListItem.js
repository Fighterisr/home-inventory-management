import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {purchaseListActions} from "../../store/purchase-list-slice";


const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
}

const NewPurchaseListItem = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const dispatch = useDispatch()

    const nameInputRef = useRef();
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAmount = parseInt(amountInputRef.current.value);
        const newItem = {
            name: enteredName,
            description: "",
            amount: enteredAmount,
            location: ""
        }

        dispatch(purchaseListActions.addPurchaseListItem(newItem))
        setOpen(false);


    }

    return (
        <>
            <Fab color="primary" variant="extended" aria-label="add" style={fabStyle} onClick={handleClickOpen}>
                <AddIcon/>
                Add Item to Purchase List
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
                            <TextField label={"Amount"} inputRef={amountInputRef}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setOpen(false)}}>Cancel</Button>
                    <Button color="success" onClick={submitHandler}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default NewPurchaseListItem