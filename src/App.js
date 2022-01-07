import {Fragment, useState} from "react";
import {useSelector} from "react-redux";
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import Menu from "./components/Menu";


function App() {
    const [showLogin, setShowLogin] = useState(true);
    let buttonText = showLogin ? "I want to Register" : "I want to Login";
    const stateAuth = useSelector(state => state.auth);


    const switchAuthModeHandler = () => {
        setShowLogin((prevState) => !prevState);
    };

    return (
        <Fragment>
            {!stateAuth.isLoggedIn && showLogin && <Login/>}
            {!stateAuth.isLoggedIn && !showLogin && <Register/>}
            {!stateAuth.isLoggedIn && <button onClick={switchAuthModeHandler}>{buttonText}</button>}
            {stateAuth.isLoggedIn && <Menu/>}
        </Fragment>
    );
}

export default App;
