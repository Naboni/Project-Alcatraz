import {Link} from "react-router-dom";
// bootstrap

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"


function Navigation(props) {
    return (
        <Navbar className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow" collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand href="#home">eTutor</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/">Home</Link>

                </Nav>
                <Nav>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Navigation;
