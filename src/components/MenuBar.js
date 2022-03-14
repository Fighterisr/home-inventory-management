import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";
import UserPortrait from "./UserPortrait";
import {Fragment} from "react";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';
import {AppBar, Divider, IconButton, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import FilterList from "./FilterList";
import SortList from "./SortList";



const MenuBar = props => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }


    return (
            <AppBar position="static" elevation={0} >
                <Toolbar>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <div>
                                <IconButton  {...bindTrigger(popupState)}>
                                    <MenuIcon/>
                                </IconButton>
                                <Menu  {...bindMenu(popupState)}>
                                    <Paper color="cyan" sx={{width: 320}}>
                                        <MenuItem>
                                            <ListItemIcon>
                                                <UserPortrait/>
                                            </ListItemIcon>
                                        </MenuItem>
                                        <MenuItem onClick={popupState.close}>
                                            <ListItemIcon>
                                                <AccountBoxIcon/>
                                            </ListItemIcon>
                                            <ListItemText>
                                                Profile
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={popupState.close}>???</MenuItem>

                                        <MenuItem onClick={popupState.close} onClick={logoutHandler}>
                                            <ListItemIcon>
                                                <LockOpenIcon fontSize="small"/>
                                            </ListItemIcon>
                                            <ListItemText>
                                                Logout
                                            </ListItemText>
                                        </MenuItem>
                                    </Paper>
                                </Menu>
                            </div>
                        )}
                    </PopupState>

                    <Typography variant="h6">
                        Home Inventory Management
                    </Typography>

                </Toolbar>
                <Toolbar>
                    <SortList/>
                    <FilterList/>
                </Toolbar>

            </AppBar>
    )
}

export default MenuBar;