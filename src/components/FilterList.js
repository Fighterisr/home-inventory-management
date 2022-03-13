import {TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {filterActions} from "../store/filter-slice";


const FilterList = () => {
    const dispatch = useDispatch()

    const inputHandler = (event) => {
        dispatch(filterActions.setFilterKeyWord(event.target.value))
    }

    return (
        <TextField sx={{bgcolor: 'white'}} variant="filled" onChange={inputHandler}/>
    )
}

export default FilterList