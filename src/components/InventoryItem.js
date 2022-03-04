import {ListItem, ListItemText} from "@mui/material";


const InventoryItem = props => {


    return (
        <ListItem>
            <ListItemText>{props.name}</ListItemText>
            <ListItemText>{"Description: " + props.description}</ListItemText>
            <ListItemText>{"Amount: " + props.amount}</ListItemText>
            <ListItemText>{"Location: " + props.location}</ListItemText>
        </ListItem>
    )
}

export default InventoryItem;