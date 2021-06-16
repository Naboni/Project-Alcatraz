import React, {useState, useEffect} from "react";
import {Switch, Route, Redirect, useHistory} from "react-router-dom";

// components
import Navbar from "../components/Navbars/bg-AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";

// views
import ParentHome from "../views/parent/ParentHome";
import ParentComplete from "../views/parent/ParentComplete";

import TutorHome from "../views/tutor/TutorHome";
import TutorComplete from "../views/tutor/TutorComplete";
//
import cookie from "js-cookie";

export default function Main() {

    const history = useHistory();
    const user = cookie.getJSON("currentUser");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch(`http://127.0.0.1:5000/parent_profile/${user_id}`).then(response => response.json()).then(data => {
    //         setLoading(false);
    //         setData(data);
    //         return data;
    //     }).then((data) => {
    //         if (!data.user_detail) {
    //             history.replace("/user/parent/complete_profile");
    //         }
    //     });
    // }, []);

    return (
        <>
            <Navbar/>
            <main>
                <section className="flex itemes-center justify-center relative w-full h-full py-16 min-h-screen">
                    <Switch> {/* parent */}
                        <Route path="/user/parent" exact
                            render={
                                () => user.user_role !== "parent" ? (
                                    <Redirect to={
                                        {pathname: "/"}
                                    }/>
                                ) : (
                                    <ParentHome/>)
                            }/>

                        <Route path="/user/parent/complete_profile" exact
                            component={ParentComplete}/> {/* Tutor */}
                        <Route path="/user/tutor" exact
                            render={
                                () => user.user_role !== "tutor" ? (
                                    <Redirect to={
                                        {pathname: "/"}
                                    }/>
                                ) : (
                                    <TutorHome/>)
                            }
                            />

                        <Route path="/user/tutor/complete_profile" exact
                            component={TutorComplete}/>

                        <Redirect from="/user" to="/NotFound"/>
                    </Switch>
                    <FooterSmall absolute/>
                </section>
            </main>
        </>
    );
}
