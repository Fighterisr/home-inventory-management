import InventoryItem from "./InventoryItem";
import Paper from "@mui/material/Paper";
import {useSelector} from "react-redux";
import SortList from "./SortList";
import {Card} from "@mui/material";

const sortSelector = (type, asc) => {
    return (a, b) => {
        if (a.props[type].toLowerCase() < b.props[type].toLowerCase()) {
            return asc ? -1 : 1
        }
        if (a.props[type].toLowerCase() > b.props[type].toLowerCase()) {
            return asc ? 1 : -1
        }
        return 0
    }
}


const InventoryList = (props) => {

    const stateSort = useSelector(state => state.sort)

    const listItems = props.inventoryItems.map((item, index) =>
        <InventoryItem
            key={index}
            index={index}
            name={item.name}
            description={item.description}
            amount={item.amount}
            location={item.location}
            inventoryItems={props.inventoryItems}
            setInventoryItems={props.setInventoryItems}
        />
    ).sort(sortSelector(stateSort.sortType,stateSort.sortAsc))
        // TODO
        //     .filter((item) => {
        //     return item.props.name.toLowerCase().includes('a')
        // })

    return (
        <>
            <SortList/>
            <Card elevation={24}>
                {listItems}
            </Card>
        </>
    )
}

export default InventoryList
