import {Route, Switch,Redirect} from "react-router-dom";
// components
import Navigation from "./components/Layout/Navigation";
// pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./pages/home/Home";

//
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Button from "react-bootstrap/Button"
import ParentHome from "./pages/parent/ParentHome";

function App() {
    return (
        <div>
            <Navigation/>
            
            <Switch>
                <Route path="/" exact>
                    <div className="">
                        <Home/>
                    </div>
                </Route>
                <Route path="/login">
                    <div className="">
                        <Login/>
                    </div>
                </Route>
                <Route path="/register">
                    <div className="">
                        <Register/>
                    </div>
                </Route>
                <Route path="/parenthome">
                    <div className="">
                        <ParentHome/>
                    </div>
                </Route>
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    );
}
export default App;
