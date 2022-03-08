import {Button, Container, Grid, ListItem, ListItemText} from "@mui/material";


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
                <Button variant="contained">Edit</Button>
                <Button sx={{bgcolor: 'red'}} variant="contained">Delete</Button>
            </Grid>
        </ListItem>
    )
}

export default InventoryItem;