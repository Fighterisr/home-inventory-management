import {Container, Grid, ListItem, ListItemText} from "@mui/material";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";


const InventoryItem = props => {


    return (
        <ListItem divider={props.isDividedAtBottom}>
            <Container>
                <ListItemText>{props.name}</ListItemText>
                <ListItemText>{"Description: " + props.description}</ListItemText>
                <ListItemText>{"Amount: " + props.amount}</ListItemText>
                <ListItemText>{"Location: " + props.location}</ListItemText>
            </Container>
            <Grid>
                <EditItem {...props} />
                <DeleteItem index={props.index} inventoryItems={props.inventoryItems}
                            setInventoryItems={props.setInventoryItems}/>
            </Grid>
        </ListItem>
    )
}

export default InventoryItem;