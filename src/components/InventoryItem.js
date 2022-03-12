import {Card, Container, Grid, ListItem, ListItemText, Stack} from "@mui/material";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";
import Typography from "@mui/material/Typography";


const InventoryItem = props => {


    return (
        <Card variant="outlined">
            <ListItem>
                <Container>
                    <ListItemText>
                        <Typography color="blue" variant="h6">
                            {props.name}
                        </Typography>
                    </ListItemText>
                    <ListItemText>{"Description: " + props.description}</ListItemText>
                    <ListItemText>{"Amount: " + props.amount}</ListItemText>
                    <ListItemText>{"Location: " + props.location}</ListItemText>
                </Container>
                <Stack spacing={1}>
                    <EditItem {...props} />
                    <DeleteItem index={props.index} inventoryItems={props.inventoryItems}
                                setInventoryItems={props.setInventoryItems}/>
                </Stack>
            </ListItem>
        </Card>
    )
}

export default InventoryItem;