import {useRef, useEffect, useState} from "react";

import ChildCard from "../../components/Cards/childCard/ChildCard";

function ParentHome(params) { // 0913403111

    const [children, setChildren] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const ageRef = useRef();
    const genderRef = useRef();
    const subjectsRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://127.0.0.1:5000/child", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                "firstname": firstNameRef.current.value,
                "lastname": lastNameRef.current.value,
                "gender": genderRef.current.value,
                "age": ageRef.current.value,
                "subjects": subjectsRef.current.value,
                "location": "location",
                "parent_id": 5,
                }
            )
        }).then((response) => response.json()).then((body) => {
            setChildren(children.concat({
                "firstname": firstNameRef.current.value,
                "lastname": lastNameRef.current.value,
                "gender": genderRef.current.value,
                "age": ageRef.current.value,
                "subjects": subjectsRef.current.value,
                "location": "location",
                "parent_id": 5,
                }));

        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5000/allchildren").then((response) => response.json()).then((body) => {
            setChildren(children.concat(body));
            setIsLoading(false);
        });
    }, []);
    
    return (
    <div className="container-fluid ">
        <div className="flex">
            <div className="flex-1 m-4" >
                <div className="p-3 offset-2 mt-5" >
                    <h4 className="text-2xl font-semibold mt-2 mb-5">
                        Registered children
                    </h4>
                    {isLoading ? <p>..................</p> :
                        children.length > 0 ? children.map((child) => <ChildCard key={child.id} name={
                            child.firstname
                        }
                        subjects={
                            child.subjects
                        }/>) : < p > No child registered.</p>
                    } 
                </div>
            </div>

        <div className="flex-1 mt-8 m-4">
            <div className="p-3  mt-5">
                <div className="container">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                        <div className="flex-auto p-5 lg:p-10">
                            <h4 className="text-2xl font-semibold">
                                Child Form......VALIDAAAAAAAAAAATE
                            </h4>
                            <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                                Complete this form and we will get back to you with a tutor for your child.
                            </p>
                            <form>
                                <div className="flex">
                                    <div className="flex-1 m-2">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                            Full Name
                                        </label>
                                        <input ref={firstNameRef}
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Full Name"/>
                                    </div>

                                    <div className="flex-1 m-2">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                            Last Name
                                        </label>
                                        <input ref={lastNameRef}
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Last Name"/>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-1 m-2">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                            Age
                                        </label>
                                        <input ref={ageRef}
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Age"/>

                                    </div>
                                    <div className="flex-1 m-2">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                            Gender
                                        </label>
                                        <select ref={genderRef}
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            defaultValue="Choose...">
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex-1 m-2">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                                        Subjects
                                    </label>
                                    <select ref={subjectsRef}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        as="select"
                                        defaultValue="Choose...">
                                        <option>Choose...</option>
                                        <option>Amh</option>
                                        <option>Eng</option>
                                    </select>
                                </div>
                                <button 
                                    className="ml-2 mt-4 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                    onClick={handleSubmit}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>);
}
export default ParentHome;
