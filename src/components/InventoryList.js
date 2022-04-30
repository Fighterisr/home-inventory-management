import InventoryItem from "./InventoryItem";
import {useSelector} from "react-redux";
import {Card} from "@mui/material";

const sortSelector = (type, asc) => {
    return (a, b) => {
        if (a.props[type] < b.props[type]) {
            return asc ? -1 : 1
        }
        if (a.props[type] > b.props[type]) {
            return asc ? 1 : -1
        }
        return 0
    }
}

const filterBy = (keyWord) => {
    return (item) => item.props.name.toLowerCase().includes(keyWord) ||
        item.props.description.toLowerCase().includes(keyWord) ||
        item.props.location.toLowerCase().includes(keyWord)

}

const InventoryList = () => {

    const stateFilter = useSelector(state => state.filter)
    const stateSort = useSelector(state => state.sort)
    const inventoryItems = useSelector(state => state.inventoryItems.inventoryItems)

    const listItems = inventoryItems.map((item, index) =>
        <InventoryItem
            key={index}
            index={index}
            name={item.name}
            description={item.description}
            amount={item.amount}
            location={item.location}
        />
    ).sort(sortSelector(stateSort.sortType, stateSort.sortAsc))
        .filter(filterBy(stateFilter.filterKeyWord))

    return (
        <>

            <Card elevation={16}>
                {listItems}
            </Card>
        </>
    )
}

export default InventoryList
