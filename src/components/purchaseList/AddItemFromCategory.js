import {
    AppBar,
    Button,
    Card,
    Checkbox,
    Container,
    Dialog,
    IconButton,
    ListItem, ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {purchaseListActions} from "../../store/purchase-list-slice";
import {useDispatch} from "react-redux";

const amount = 1

const diary = [
    {
        name: "Milk",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Pudding",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Cheese",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Ice cream",
        description: "",
        amount,
        location: ""
    }
]
const meat = [
    {
        name: "Steak",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Ribbs",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Shnitzel",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Hamburger",
        description: "",
        amount,
        location: ""
    }
]
const toiletries = [
    {
        name: "Soap",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Shampoo",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Showering gel",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Toilet paper",
        description: "",
        amount,
        location: ""
    },

]
const vegetables = [
    {
        name: "Tomato",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Potato",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Lettuce",
        description: "",
        amount,
        location: ""
    },
    {
        name: "Cucumber",
        description: "",
        amount,
        location: ""
    },

]

const PurchaseListItem = (props) => {

    return (
        <Card variant="outlined">
            <ListItem>
                <Checkbox onChange={(event) => props.changeHandler(event, props.itemRef)}/>
                <Container>
                    <ListItemText>
                        <Typography color="cornflowerblue" variant="h6">
                            {props.name}
                        </Typography>
                    </ListItemText>
                    <ListItemText>{"Amount: " + props.amount}</ListItemText>
                </Container>
            </ListItem>
        </Card>
    )
}

const itemsToAdd = []

const itemCheckboxHandler = (event, item) => {
    if (event.target.checked) {
        itemsToAdd.push(item)
    } else {
        let itemIndex = itemsToAdd.findIndex((itemToRemove) => itemToRemove.name === item.name)
        itemsToAdd.splice(itemIndex,1)
    }
}

const AddItemFromCategory = () => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()

    const addSelectedItemsToInventory = () => {
        itemsToAdd.forEach((item) => dispatch(purchaseListActions.addPurchaseListItem(item)))
    }

    const listItems = diary.map((item, index) =>
        <PurchaseListItem
            key={index}
            index={index}
            name={item.name}
            amount={item.amount}
            itemRef={item}
            changeHandler={itemCheckboxHandler}
        />
    )

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Add item from a category
            </Button>
            <Dialog  fullScreen open={open}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Items by category
                        </Typography>
                        <Button variant="contained" onClick={addSelectedItemsToInventory}>
                            Add selected items to purchase list
                        </Button>
                    </Toolbar>
                </AppBar>
                {listItems}
            </Dialog>
        </>
    )
}

export default AddItemFromCategory