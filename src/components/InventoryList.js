import {List} from "@mui/material";
import InventoryItem from "./InventoryItem";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";


const InventoryList = (props) => {

    const listItems = props.inventoryItems.map((item, index) =>
        <InventoryItem
            key={index}
            index={index}
            name={item.name}
            description={item.description}
            amount={item.amount}
            location={item.location}
            inventoryItems={props.inventoryItems}
            setInventoryItems={props.setInventoryItems}
            isDividedAtBottom= {index < props.inventoryItems.length - 1}
        />
    )


    return (
        <Paper elevation={24} >
            {listItems}
        </Paper>
    )
}

export default InventoryList
