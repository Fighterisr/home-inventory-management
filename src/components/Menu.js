import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";


const Menu = (props) => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }


    return (
        <button onClick={logoutHandler}>Log out</button>
    )
}

export default Menu;