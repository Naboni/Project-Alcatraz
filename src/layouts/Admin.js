import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import FooterAdmin from "../components/Footers/FooterAdmin";
import HeaderStats from "../components/Headers/HeaderStats.js";

// views

import Dashboard from "../views/admin/Dashboard.js";
import Settings from "../views/admin/Settings.js";
import Users from "../views/admin/Users.js";
import AssignedChildren from "../views/admin/AssignedChildren.js";
import PendingChildren from "../views/admin/PendingChildren.js";
import AssignedTutors from "../views/admin/AssignedTutors.js";
import PendingTutors from "../views/admin/PendingTutors.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/users" exact component={Users} />
            <Route path="/admin/assignedchildren" exact component={AssignedChildren} />
            <Route path="/admin/pendingchildren" exact component={PendingChildren} />
            <Route path="/admin/assignedtutors" exact component={AssignedTutors} />
            <Route path="/admin/pendingtutors" exact component={PendingTutors} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}