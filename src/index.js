import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
// store
import {AppContextProvider} from "./store/ApplicationCtx"
//
// style
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

// layouts

import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth.js";
import Main from "./layouts/Main";
import NotFound from "./layouts/NotFound";
import OurTutors from "./views/OurTutors";

// views without layouts

import Landing from "./views/Landing.js";
import Profile from "./views/Profile.js";


import cookie from "js-cookie";
const user = cookie.getJSON("currentUser");


ReactDOM.render (

    <AppContextProvider>
        <BrowserRouter>
            <Switch>
                <Route path="/admin"
                    render={
                        () => user.user_role !== "admin" ? (
                            <Redirect to={
                                {pathname: "/"}
                            }/>
                        ) : (
                            <Admin/>)
                    }/>

                <Route path="/NotFound" exact
                    component={NotFound}/>

                <Route path="/user"
                    component={Main}/>


                <Route path="/auth"
                    component={Auth}/>
                <Route path="/ourtutors" exact
                    component={OurTutors}/>
                <Route path="/review/:id" exact
                    component={Profile}/>
                <Route path="/" exact
                    component={Landing}/> {/* <Redirect from="*" to="/NotFound"/> */}
            </Switch>
        </BrowserRouter>
    </AppContextProvider>,
    document.getElementById("root")
);
