import {Card, Container, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeletePurchaseListItem from "./DeletePurchaseListItem";


const PurchaseListItem = (props) => {

    return (
        <Card variant="outlined">
            <ListItem>
                <Container>
                    <ListItemText>
                        <Typography color="cornflowerblue" variant="h6">
                            {props.name}
                        </Typography>
                    </ListItemText>
                    <ListItemText>{"Amount: " + props.amount}</ListItemText>
                </Container>
                <DeletePurchaseListItem {...props} />
            </ListItem>
        </Card>
    )
}

export default PurchaseListItem