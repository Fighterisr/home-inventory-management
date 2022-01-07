import {useRef, Fragment} from "react";
import {app} from '../firebase'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'


const Register = props => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const submitHandler = event => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
            });
    }

    return (
        <Fragment>
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required ref={emailInputRef}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required ref={passwordInputRef}/>
                </div>
                <button>Register</button>
            </form>
        </Fragment>
    )
}
export default Register;