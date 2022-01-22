import React from "react";
import { Button, Form } from "react-bootstrap";

import './logIn.css'

function Login ({logIn}) {

    // Form submit handler
    function handleSubmit(event) {
        console.log(222222222)
        event.preventDefault();
        event.stopPropagation();

        // const form = event.currentTarget;
        // // Validate the Form
        // if (form.checkValidity() === false) {

        //     this.setState({ 
        //         validated: true,
        //     });
        // } else {
        //     // Prepare DB data 
        //     //this.prepareDataForDB(event);
        // };
        logIn();
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
                    // validated={validated} 
                    // onSubmit={onSubmit}
                    >
                <h3>Login Here</h3>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" 
                                placeholder="Email"
                                required 
                                />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" 
                                placeholder="Password"
                                required 
                                />
                </Form.Group>

                <Button type="submit">
                    Log In
                </Button>
                
            </Form>
        </div>
    );
};

export default Login;