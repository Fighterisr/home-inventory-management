import {
    AppBar,
    Button,
    Card,
    Checkbox,
    Container,
    Dialog,
    IconButton,
    ListItem, ListItemText, MenuItem, Select,
    Toolbar,
    Typography
} from "@mui/material";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {purchaseListActions} from "../../store/purchase-list-slice";
import {useDispatch} from "react-redux";
import categories from "./categories";

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
        itemsToAdd.splice(itemIndex, 1)
    }
}

const AddItemFromCategory = () => {
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(categories.diary.categoryName)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const categoryChangeHandler = event => {
        setSelectedCategory(event.target.value)
    }

    const dispatch = useDispatch()

    const addSelectedItemsToInventory = () => {
        itemsToAdd.forEach((item) => dispatch(purchaseListActions.addPurchaseListItem(item)))
    }

    const categoryList = Object.keys(categories).map((item, index) => {
        let categoryName = categories[item].categoryName
        return <MenuItem key={index} value={categoryName}>{categoryName}</MenuItem>
    })

    const listItems = categories[selectedCategory.toLowerCase()].items.map((item, index) =>
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
            <Dialog fullScreen open={open}>
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Items by category
                        </Typography>
                        <Select
                            value={selectedCategory}
                            onChange={categoryChangeHandler}
                        >
                            {categoryList}
                        </Select>
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