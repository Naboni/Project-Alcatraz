import React, {useEffect, useState} from "react";

// components

export default function PendingChildren() {

    let [data, setData] = useState([]);


    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://127.0.0.1:5000/child", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).then((response) => response.json()).then((body) => {}).catch((err) => console.log(err));
    }
    // useEffect(() => {
    //     fetch('http://127.0.0.1:5000/allchildren').then(response => response.json()).then(data => {
    //         const pending = data.filter((child) => child.assigned == false);
    //         setData(pending);
    //     });
    // }, []);

    return (
        <>
            <div className="container-fluid ">
                <div className="flex mt-20 ">
                    <div className="flex-1 mt-20 m-4">
                        <div className="p-3  mt-5">
                            <div className="container">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                                    <div className="flex-auto p-5 lg:p-10">
                                        <h4 className="text-2xl font-semibold mb-3">
                                            Child Detail
                                        </h4>

                                        <form>
                                            <div className="flex">
                                                <div className="flex-1 m-2">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                        Full Name
                                                    </label>
                                                    <input readOnly type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Full Name"/>
                                                </div>

                                                <div className="flex-1 m-2">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                        Last Name
                                                    </label>
                                                    <input readOnly type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Last Name"/>
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <div className="flex-1 m-2">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                        Age
                                                    </label>
                                                    <input readOnly type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Age"/>

                                                </div>
                                                <div className="flex-1 m-2">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                        Gender
                                                    </label>
                                                    <input readOnly type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Gender"/>

                                                </div>
                                            </div>
                                            <div className="flex-1 m-2">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                    Location
                                                </label>
                                                <input readOnly type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Location"/>

                                            </div>
                                            <div className="flex-1 m-2">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                    Subjects
                                                </label>
                                                <input readOnly type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Subjects"/>

                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 mt-20 m-4">
                        
                    </div>
                </div>
            </div>
        </>
    );
}
