import {Card, Container, Grid, ListItem, ListItemText} from "@mui/material";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";


const InventoryItem = props => {


    return (
        <Card sx={{border: 1}}>
            <ListItem>
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
        </Card>
    )
}

export default InventoryItem;