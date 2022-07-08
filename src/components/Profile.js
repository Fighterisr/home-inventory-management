import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField} from "@mui/material";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ref, set} from "firebase/database";
import {auth, db} from "../firebase";



const Profile = ({open, onClose}) => {
    const familyInputRef = useRef();
    const familyName = useSelector(state => state.purchaseList.familyName);

    const dispatch = useDispatch();

    const submitHandler = () => {

        const uid = auth.currentUser.uid;
        const enteredFamilyName = familyInputRef.current.value;
        if(enteredFamilyName === familyName)
            return;
        const dbRef = ref(db, `/profile/${uid}/familyName`)
        set(dbRef, enteredFamilyName);



        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    return(
        <>
            <Dialog open={open}>
                <DialogTitle>Profile</DialogTitle>
                <Divider/>
                <DialogContent>
                    <TextField label={"Family Name:"} defaultValue={familyName} inputRef={familyInputRef}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button color="success"  onClick={submitHandler}>Submit</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default Profile;