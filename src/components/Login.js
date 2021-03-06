import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {auth} from "../firebase";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {authActions} from "../store/auth-slice";


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Alert, Snackbar} from "@mui/material";

const theme = createTheme();

const Login = props => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const dispatch = useDispatch();

    const [openAlert, setOpenAlert] = useState(false)

    const submitHandler = async event => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        // TODO: check for form validation
        props.setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
            const user = userCredential.user;
            const userObj = {
                token: user.accessToken
            }
            dispatch(authActions.login(userObj))
            props.setIsLoading(false);
        }
        catch(err) {
            setOpenAlert(true)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={submitHandler}>

                        <TextField
                            htmlFor="email"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={emailInputRef}
                        />
                        <TextField
                            htmlFor="password"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={passwordInputRef}
                        />
                        <Button type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}>
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}
                      anchorOrigin={{vertical: "top", horizontal: "center"}} style={{top: "35%"}}
            >
                <Alert severity="error">
                    Wrong email or password entered, try again.
                </Alert>
            </Snackbar>
        </ThemeProvider>
    )
}

export default Login;