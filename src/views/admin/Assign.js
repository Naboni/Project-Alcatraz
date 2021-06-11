import React, {useEffect, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";

// components
import TutorCard from "../../components/Cards/TutorCard/TutorCard";
export default function PendingChildren() { // get child state from location
    const {state} = useLocation();
    const history = useHistory();

    // make the widget load till data is served
    let [isLoading, setIsLoading] = useState(true);
    let [data, setData] = useState([]);

    function handleSubmit(childId, tutorId) {
        console.log(childId, tutorId);
        fetch("http://127.0.0.1:5000/match", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {"tutor_id": tutorId, "child_id": childId}
            )
        }).then((response) => response.json()).then((body) => {
            console.log(body);
            // history.replace(`/user/${body.user_role}`);
        }).catch((err) => console.log(err));
    }
    // fetch matchs
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/match/${
            state.child.id
        }`).then((response) => response.json()).then((body) => {
            setData(body);
            setIsLoading(false);
        }).catch((err) => console.log(err));
    }, [state])

    return (<>
        <div className="container-fluid ">
            <div className="flex mt-20 ">
                <div className="flex-1 mt-20 m-4">
                    <div className="p-3  mt-5">
                        <div className="container">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 border border-indigo-600 rounded-lg ">
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
                                                <input value={
                                                        state.child.fname
                                                    }
                                                    readOnly
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Full Name"/>
                                            </div>

                                            <div className="flex-1 m-2">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                    Last Name
                                                </label>
                                                <input value={
                                                        state.child.lname
                                                    }
                                                    readOnly
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Last Name"/>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="flex-1 m-2">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                    Age
                                                </label>
                                                <input value={
                                                        state.child.age
                                                    }
                                                    readOnly
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Age"/>

                                            </div>
                                            <div className="flex-1 m-2">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                    Gender
                                                </label>
                                                <input value={
                                                        state.child.gender
                                                    }
                                                    readOnly
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Gender"/>

                                            </div>
                                        </div>
                                        <div className="flex-1 m-2">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                Location
                                            </label>
                                            <input value={
                                                    state.child.location
                                                }
                                                readOnly
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Location"/>

                                        </div>
                                        <div className="flex-1 m-2">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                                Subjects
                                            </label>
                                            <input value={
                                                    state.child.subjects
                                                }
                                                readOnly
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Subjects"/>

                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 mt-20 m-4  p-5 lg:p-10 ">
                    <h4 className="text-2xl font-semibold mb-3">Tutors</h4>
                    {isLoading ? <p>Loading</p> : data.match.length > 0 ? data.match.map((tutor) => <TutorCard handler={handleSubmit} childId={state.child.id} tutor={tutor} key={tutor.tutor_data.id}/>) : < p > No tutors found. </p>}
                </div>
        </div>
    </div>
</>);
}
