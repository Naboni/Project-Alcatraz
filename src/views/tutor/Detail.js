import {useContext, useEffect, useState} from "react";
import {useLocation,useHistory} from "react-router-dom";

// store
import AppContext from "../../store/ApplicationCtx";
//

function Detail() {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {state} = useLocation();
    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/child/${state.child.id}`)
        .then((response) => response.json()).then((body) => {
            setData(body);
            setIsLoading(false);
        }).catch((err) => console.log(err));
    },[])
    const AppCtx = useContext(AppContext);

    function handleDelete() {
       
    }
    return (
// child_data:
// age: 21
// assigned: false
// firstName: "Boni"
// gender: "Male"
// id: 1
// lastName: "Tlahun"
// location: "9.047606199999999, 38.7599762"
// parent_id: 1
// subjects: "Amh"
// __proto__: Object
// parent_data:
// firstName: "Yonatan"
// id: 1
// lastName: "Merkebu"
// location: "9.047606199999999, 38.7599762"
// phone: "314159265"
        <div className="flex justify-between items-center">
            {
                isLoading ? <p>Loading</p> : 
                <div className="flex justify-between">
                    <div className="p-5">
                        <h4 className="font-bold text-3xl">Child info</h4>
                        <p className="text-2xl">Child name: {data.child_data.firstName + " " + data.child_data.lastName}</p>
                        <p className="text-2xl">Age: {data.child_data.age}</p>
                        <p className="text-2xl">Gender: {data.child_data.gender}</p>
                        <p className="text-2xl">Subjects: {data.child_data.subjects}</p>
                    </div>
                    <div className="p-5 border">
                    <h4 className=" font-bold text-3xl">Parent info</h4>
                        <p className="text-2xl">Parent name: {data.parent_data.firstName + " " + data.parent_data.lastName}</p>
                        <p className="text-2xl">Location: {data.parent_data.location}</p>
                        <p className="text-2xl">Phone number: {data.parent_data.phone}</p>
                    </div>
                </div>
            }
        </div>
    );
}
export default Detail;
