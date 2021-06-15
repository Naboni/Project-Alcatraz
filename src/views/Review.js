import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import cookie from "js-cookie";

// componenets
import Navbar from "../components/Navbars/AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";

export default function Review() {

        const {state} = useLocation();
        console.log(state);
        const user = cookie.getJSON("currentUser");

        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(true);

        // useEffect(() => {
        //     fetch(`http://127.0.0.1:5000/alltutors`).then(response => response.json()).then(body => {
        //         setIsLoading(false);
        //         setData(body);
        //     });
        // }, []);

        return (<>
            <Navbar/>

            <main>
                <section className="bg-blueGray-600 relative w-full h-full min-h-screen">

                    <div className="container-fluid ">
                        <div className="flex">
                            <div className="flex-1 mt-20 m-4">
                                <div className="p-3  mt-5">
                                    <div className="container">
                                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 border border-indigo-600 rounded-lg ">
                                            <div className="flex-auto p-5 lg:p-10">
                                                <h4 className="text-white text-2xl font-semibold mb-3">
                                                    Tutor Detail
                                                </h4>

                                                <form>
                                                    <div className="flex">
                                                        <div className="flex-1 m-2">
                                                            <label className="block uppercase text-white text-xs font-bold mb-2" htmlFor="full-name">
                                                                Full Name
                                                            </label>
                                                            <input value={
                                                                    state.tutor.firstname
                                                                }
                                                                readOnly
                                                                type="text"
                                                                className="border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                placeholder="Full Name"/>
                                                        </div>

                                                        <div className="flex-1 m-2">
                                                            <label className="block uppercase text-white text-xs font-bold mb-2" htmlFor="full-name">
                                                                Last Name
                                                            </label>
                                                            <input value={
                                                                    state.tutor.lastname
                                                                }
                                                                readOnly
                                                                type="text"
                                                                className="border-0 px-3 py-3 placeholder-blueGray-300  bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                placeholder="Last Name"/>
                                                        </div>
                                                    </div>

                                                    <div className="flex">
                                                        <div className="flex-1 m-2">
                                                            <label className="block uppercase text-white text-xs font-bold mb-2" htmlFor="full-name">
                                                                Phone Number
                                                            </label>
                                                            <input value={
                                                                    state.tutor.phone
                                                                }
                                                                readOnly
                                                                type="text"
                                                                className="border-0 px-3 py-3 placeholder-blueGray-300  bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                placeholder="Age"/>

                                                        </div>
                                                        <div className="flex-1 m-2">
                                                            <label className="block uppercase text-white text-xs font-bold mb-2" htmlFor="full-name">
                                                                Gender
                                                            </label>
                                                            <input value={
                                                                    state.tutor.gender
                                                                }
                                                                readOnly
                                                                type="text"
                                                                className="border-0 px-3 py-3 placeholder-blueGray-300  bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                placeholder="Gender"/>

                                                        </div>
                                                    </div>
                                                    <div className="flex-1 m-2">
                                                        <label className="block uppercase text-white text-xs font-bold mb-2" htmlFor="full-name">
                                                            Subjects
                                                        </label>
                                                        <input value={
                                                                state.tutor.subjects
                                                            }
                                                            readOnly
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300  bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            placeholder="Subjects"/>

                                                    </div>
                                                    <div className="flex-1 m-2">
                                                        <label className="block uppercase text-white text-xs font-bold mb-2" htmlFor="full-name">
                                                            Bio
                                                        </label>
                                                        <textarea value={
                                                                state.tutor.bio
                                                            }
                                                            readOnly
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300  bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            placeholder="Location"/>

                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 mt-20 m-4  p-5 lg:p-10 ">
                                <h4 className="text-2xl text-white font-semibold mb-3">Half</h4>
                                
                            
                            </div>
                    </div>
                </div>
                <FooterSmall absolute/>
            </section>
        </main>
    </>
    );
}
