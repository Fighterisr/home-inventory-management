import {Button, Container, Grid, ListItem, ListItemText} from "@mui/material";
import DeleteItem from "./DeleteItem";


const InventoryItem = props => {


    return (
        <ListItem divider={props.isDividedAtBottom}>
            <Container>
                <ListItemText>{props.name}</ListItemText>
                <ListItemText>{"Description: " + props.description}</ListItemText>
                <ListItemText>{"Amount: " + props.amount}</ListItemText>
                <ListItemText>{"Location: " + props.location}</ListItemText>
            </Container>
            <Grid >
                <Button variant="contained">Edit Item</Button>
                <DeleteItem index={props.index} inventoryItems={props.inventoryItems}
                            setInventoryItems={props.setInventoryItems}/>
            </Grid>
        </ListItem>
    )
}

export default InventoryItem;