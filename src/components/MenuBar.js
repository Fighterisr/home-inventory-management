import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";
import UserPortrait from "./UserPortrait";
import {Fragment} from "react";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


const MenuBar = props => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }


    return (
        <Fragment>
            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <Fragment>
                        <Button variant="contained" {...bindTrigger(popupState)}>
                            Menu
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                            <UserPortrait/>
                            <MenuItem onClick={popupState.close}>???</MenuItem>
                            <MenuItem onClick={popupState.close}>???</MenuItem>
                            <LockOpenIcon></LockOpenIcon>
                            <MenuItem onClick={popupState.close}onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                    </Fragment>
                )}
            </PopupState>
        </Fragment>
    )
}

export default MenuBar;