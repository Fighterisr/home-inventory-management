import {Divider, List} from "@mui/material";
import {Fragment} from "react";
import InventoryItem from "./InventoryItem";


const InventoryList = (props) => {

    const listItems = props.inventoryItems.map((item, index) =>
        <Fragment key={index}>
            <InventoryItem
                name={item.name}
                description={item.description}
                amount={item.amount}
                location={item.location}
            />
            {index !== props.inventoryItems.length - 1 ? <Divider/> : null}


        </Fragment>
    )


    return (
        <Fragment>
            <List sx={{bgcolor: 'lightBlue'}}>
                {listItems}
            </List>
        </Fragment>
    )
}

export default InventoryList
