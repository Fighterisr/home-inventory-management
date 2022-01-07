import {useRef, Fragment} from "react";
import {useDispatch} from "react-redux";
import {app} from '../firebase'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {authActions} from "../store/auth-slice";

const Login = props => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const dispatch = useDispatch();

    const submitHandler = event => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                const userObj = {
                    token: user.accessToken
                }
                dispatch(authActions.login(userObj))
            });
    }

    return (
        <Fragment>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required ref={emailInputRef}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required ref={passwordInputRef}/>
                </div>
                <button>Login</button>
            </form>
        </Fragment>
    )
}

export default Login;