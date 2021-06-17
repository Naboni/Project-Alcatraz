/*eslint-disable*/
import React, {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
// store
import AppContext from "../../store/ApplicationCtx";
// components
import PagesDropdown from "../Dropdowns/PagesDropdown.js";
//
import cookie from "js-cookie";

export default function Navbar(props) {
    const history = useHistory();

    function handleLogout() {
        AppCtx.setUser(null);
        cookie.remove("currentUser");
        history.replace('/');
    }

    const AppCtx = useContext(AppContext);

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="bg-blueGray-800 top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg mb-4">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase dancingFont text-2xl" to="/">
                            e-Tutor
                        </Link>
                        <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button"
                            onClick={
                                () => setNavbarOpen(!navbarOpen)
                        }>
                            <i className="text-white fas fa-bars"></i>
                        </button>
                    </div>
                    <div className={
                            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none oxaniumFont text-xm" + (
                            navbarOpen ? " block rounded shadow-lg" : " hidden"
                        )
                        }
                        id="example-navbar-warning">
                        <ul className="flex flex-col lg:flex-row list-none mr-auto">
                            <li className="flex items-center"></li>
                        </ul>

                        {
                        AppCtx.user ? <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="flex items-center">
                                <PagesDropdown user={
                                    AppCtx.user
                                }/>
                            </li>
                            <li className="flex items-center">
                                <Link onClick={handleLogout}
                                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                                    Logout
                                </Link>
                            </li>
                        </ul> : <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

                            <li className="flex items-center">
                                <Link className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" to="/auth/login">
                                    Login
                                </Link>
                            </li>
                            <li className="flex items-center">
                                <Link className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" to="/auth/register">
                                    Register
                                </Link>
                            </li>

                        </ul>
                    } </div>
                </div>
            </nav>
        </>
    );
}
