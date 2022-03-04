import {useState} from "react";
import {useSelector} from "react-redux";
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import MenuBar from "./components/MenuBar";


import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {CircularProgress} from "@mui/material";
import Home from "./components/Home";


function App() {
    const [showLogin, setShowLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    let buttonText = showLogin ? "Don't have an account? Please Register" : "I want to Login";
    const stateAuth = useSelector(state => state.auth);

    const switchAuthModeHandler = () => {
        setShowLogin((prevState) => !prevState);
    };

    return (
        <Container>
            {!stateAuth.isLoggedIn && showLogin && <Login setIsLoading={setIsLoading}/>}
            {!stateAuth.isLoggedIn && !showLogin && <Register/>}
            <Grid container justifyContent="center">
                {!stateAuth.isLoggedIn && <Link onClick={switchAuthModeHandler} variant="body2">{buttonText}</Link>}
                {isLoading && <CircularProgress/>}
                {stateAuth.isLoggedIn && <MenuBar/>}
            </Grid>
            {stateAuth.isLoggedIn && <Home/>}
        </Container>
    );
}

export default App;
