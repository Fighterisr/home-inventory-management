import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider} from "@mui/material";
import {useState} from "react";
import {db} from "../../firebase";
import {ref, set} from "firebase/database";
import {useDispatch, useSelector} from "react-redux";
import {purchaseListActions} from "../../store/purchase-list-slice";


const DeletePurchaseListItem = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch()
    const purchaseList = useSelector(state => state.purchaseList.purchaseList)

    const deleteCurrentItem = () => {
        const newArray = purchaseList.filter((element,index) => index !== props.index)

        const dbRef = ref(db, '/family/smith/purchaseList')

        set(dbRef, newArray);
        dispatch(purchaseListActions.setPurchaseList([...newArray]))
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

export default DeletePurchaseListItem;