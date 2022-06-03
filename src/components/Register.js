import {useRef, useState} from "react";
import {auth} from "../firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'

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

const theme = createTheme();

const Register = props => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const repeatPasswordInputRef = useRef();

    const [passwordError, setPasswordError] = useState("")
    const [repeatPasswordError, setRepeatPasswordError] = useState("")


    const submitHandler = async event => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredRepeatPassword = repeatPasswordInputRef.current.value;

        setPasswordError("")
        setRepeatPasswordError("")

        if(enteredPassword.length < 6){
            setPasswordError("Password should be at least 6 characters.")
            return
        }

        if(enteredPassword !== enteredRepeatPassword){
            setRepeatPasswordError("Password and Repeat Password do not match.")
            return
        }

        await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
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
                        Register
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
                            error={passwordError.length !== 0}
                            helperText={passwordError}
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
                        <TextField
                            error={repeatPasswordError.length !== 0}
                            helperText={repeatPasswordError}
                            htmlFor="repeatPassword"
                            margin="normal"
                            required
                            fullWidth
                            name="repeatPassword"
                            label="Repeat Password"
                            type="password"
                            id="repeatPassword"
                            inputRef={repeatPasswordInputRef}
                        />
                        <Button type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}>
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
export default Register;