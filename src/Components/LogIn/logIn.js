import React, {useState} from "react";
import { Button, Form } from "react-bootstrap";
import validator from 'validator'

import './logIn.css'

function Login ({logIn}) {

    const [loginError, setLoginError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState(true);

    // Form submit handler
    async function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const form = event.currentTarget;
        // // Validate the Form
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {

            if (emailValidation(event.target.username.value)){
                const result = await logIn(
                        event.target.username.value, 
                        event.target.password.value
                    );

                setInvalidLogin(result)
            };
            setValidated(false);
        };
    };

    function emailValidation(str){
        if (validator.isEmail(str)) {
            setEmailError(false);
            return true;
        } else {
            setEmailError(true);
            return false;
        };
    }

    function handleChangeUserName(event){
        setInvalidLogin(true);
        setEmailError(false);
        if(event.target.value.match("^[a-zA-Z 0-9 @ .]*$")){
            setLoginError(false);
        } else {
            setLoginError(true);
        };
    };

    function handleChangePassword(event){
        if(event.target.value.match("^[a-zA-Z 0-9 @]*$")){
            setPassError(false);
        } else {
            setPassError(true);
        };
    }; 

    return (
        
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <Form className="login" 
                    onSubmit={handleSubmit} 
                    noValidate 
                    validated={validated} 
                    >
                <h3>Login</h3>

                <Form.Group className="login-input" controlId="username">
                    <Form.Label className="login-label">Username</Form.Label>
                    <Form.Control type="text" 
                                onChange={handleChangeUserName}
                                placeholder="Email"
                                required 
                                />
                </Form.Group>
                <span className={loginError ? "d-block inputError" : "d-none inputError"}>Error, only numbers, and letters allowed.</span>
                <span className={emailError ? "d-block inputError" : "d-none inputError"}>Invalid email.</span>
                <span className={!invalidLogin ? "d-block inputError text-center" : "d-none inputError"}>Incorrect Email or Password!.</span>

                <Form.Group className="login-input" controlId="password">
                    <Form.Label className="login-label">Password</Form.Label>
                    <Form.Control type="password" 
                                onChange={handleChangePassword}
                                placeholder="Password"
                                required 
                                />
                </Form.Group>
                <span className={passError ? "d-block inputError" : "d-none inputError"}>Error, only numbers, and letters allowed.</span>
                <span className={!invalidLogin ? "d-block inputError text-center" : "d-none inputError"}>Incorrect Email or Password!.</span>

                <Button className="logIn-button" type="submit">
                    Log In
                </Button>
                
            </Form>
        </div>
    );
};

export default Login;