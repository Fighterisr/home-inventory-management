import {Fragment, useState} from "react";
import {useSelector} from "react-redux";
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import Menu from "./components/Menu";


import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


function App() {
    const [showLogin, setShowLogin] = useState(true);
    let buttonText = showLogin ? "Don't have an account? Please Register" : "I want to Login";
    const stateAuth = useSelector(state => state.auth);

    const switchAuthModeHandler = () => {
        setShowLogin((prevState) => !prevState);
    };

    return (

        <Fragment>
            <Container>
                {!stateAuth.isLoggedIn && showLogin && <Login/>}
                {!stateAuth.isLoggedIn && !showLogin && <Register/>}
                <Grid container justifyContent="center">
                    {!stateAuth.isLoggedIn && <Link onClick={switchAuthModeHandler} variant="body2">{buttonText}</Link>}
                </Grid>
                {stateAuth.isLoggedIn && <Menu/>}
            </Container>
        </Fragment>

    );
}

export default App;
