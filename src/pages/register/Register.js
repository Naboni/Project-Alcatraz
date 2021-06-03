import {useState} from "react";
import classes from "./Register.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function Register(params) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <div className={
            classes.container
        }>
            <div className={
                classes.formBox
            }>

                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control autoFocus type="text"
                            // value={email}
                            // onChange={
                            //     (e) => setEmail(e.target.value)
                            // }
                            />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoFocus type="email"
                            value={email}
                            onChange={
                                (e) => setEmail(e.target.value)
                            }/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            value={password}
                            onChange={
                                (e) => setPassword(e.target.value)
                            }/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="confirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password"
                            // value={password}
                            // onChange={
                            //     (e) => setPassword(e.target.value)
                            // }
                            />
                    </Form.Group>
                    <Button className="mt-3" block size="lg" type="submit"
                        disabled={
                            ! validateForm()
                    }>
                        Register
                    </Button>
                </Form>
            </div>

        </div>
    );
}
export default Register;
