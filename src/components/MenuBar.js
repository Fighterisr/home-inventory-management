import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";
import UserPortrait from "./UserPortrait";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {AppBar, Divider, IconButton, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import FilterList from "./FilterList";
import SortList from "./SortList";
import PurchaseList from "./purchaseList/PurchaseList";
import {makeStyles} from '@mui/styles';
import {useState} from "react";


const useStyles = makeStyles(theme => ({
    toolbutton: {
        display: "flex",
        flex: 1,
        justifyContent: "right"
    }
}))


const MenuBar = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    // const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // setAnchorEl(document.getElementById('menu'));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                <IconButton onClick={handleClick}>
                    <MenuIcon/>

                </IconButton>
                <Menu id="menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}

                >
                    <MenuItem sx={{ width : 200}}>
                        <ListItemIcon>
                            <UserPortrait/>
                        </ListItemIcon>
                    </MenuItem>
                    <Divider style={{fill: "black"}} sx={{ my: 0.5 }} />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <AccountBoxIcon/>
                        </ListItemIcon>

                        <ListItemText>
                            Profile
                        </ListItemText>
                    </MenuItem>

                    <MenuItem onClick={handleClose} onClick={logoutHandler}>
                        <ListItemIcon>
                            <LockOpenIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>
                            Logout
                        </ListItemText>
                    </MenuItem>
                </Menu>


                <Typography variant="h6">
                    Home Inventory Management
                </Typography>

            </Toolbar>
            <Toolbar>
                <SortList/>

                <FilterList/>
                <div className={classes.toolbutton}>
                    <PurchaseList/>
                </div>
            </Toolbar>

        </AppBar>
    )
}

export default MenuBar;