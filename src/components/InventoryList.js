import {List} from "@mui/material";
import InventoryItem from "./InventoryItem";


const InventoryList = (props) => {

    const listItems = props.inventoryItems.map((item, index) =>
        <InventoryItem
            key={index}
            name={item.name}
            description={item.description}
            amount={item.amount}
            location={item.location}
            isDividedAtBottom= {index < props.inventoryItems.length - 1}
        />
    )


    return (
        <List sx={{bgcolor: 'lightBlue'}}>
            {listItems}
        </List>
    )
}

export default InventoryList
