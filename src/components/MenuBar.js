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


const MenuBar = props => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }


    return (
        <Fragment>
            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <Paper>
                        <Button variant="contained" {...bindTrigger(popupState)}>
                            Menu
                        </Button>
                        <Menu  {...bindMenu(popupState)}>
                            <Paper sx={{width: 320}}>
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
                    </Paper>
                )}
            </PopupState>
        </Fragment>
    )
}

export default MenuBar;