import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";
import UserPortrait from "./UserPortrait";
import {Fragment} from "react";


const Menu = props => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }


    return (
        <Fragment>
            <UserPortrait/>
            <button onClick={logoutHandler}>Log out</button>
        </Fragment>
    )
}

export default Menu;