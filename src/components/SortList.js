import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormGroup,
    MenuItem,
    Select
} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sortActions} from "../store/sort-slice";


const SortList = (props) => {
    const dispatch = useDispatch()
    const stateSort = useSelector(state => state.sort)
    const [open, setOpen] = useState(false)
    const [typeValue, setTypeValue] = useState(stateSort.sortType)
    const [ascValue, setAscValue] = useState(stateSort.sortAsc)


    const typeHandleChange = event => {
        setTypeValue(event.target.value)
    }

    const ascHandleChange = event => {
        setAscValue(event.target.value)
    }

    const sortHandler = () => {
        dispatch(sortActions.setSortType(typeValue))
        dispatch(sortActions.setSortAsc(ascValue))

        setOpen(false)
    }


    return (
        <>
            <Button  size="small" color="primary" variant="contained" onClick={() => setOpen(true)}>Sort</Button>
            <Dialog open={open}>
                <DialogTitle>Sort List</DialogTitle>
                <Divider/>
                <DialogContent>
                    <FormGroup>
                        <Select
                            value={typeValue}
                            onChange={typeHandleChange}
                        >
                            <MenuItem value={'name'}>Name</MenuItem>
                            <MenuItem value={'amount'}>Amount</MenuItem>
                            <MenuItem value={'location'}>Location</MenuItem>
                        </Select>
                        <Select
                            value={ascValue}
                            onChange={ascHandleChange}
                        >
                            <MenuItem value={true}>Ascending</MenuItem>
                            <MenuItem value={false}>Descending</MenuItem>
                        </Select>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpen(false)
                    }}>Cancel</Button>
                    <Button onClick={sortHandler}>Sort</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SortList