import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "../components/Navbars/bg-AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";

// views
import ParentHome from "../views/parent/ParentHome";

export default function Main() {
  return (
    <>
      <Navbar/>
      <main>
        <section className="relative w-full h-full py-10 min-h-screen">
          <Switch>
            <Route path="/user/parent" exact component={ParentHome} />
            <Redirect from="/user" to="/NotFound" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
