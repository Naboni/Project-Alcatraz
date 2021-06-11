import {useRef, useEffect, useState} from "react";
//
import cookie from "js-cookie";

// components
import CardProfile from "../../components/Cards/CardProfile";
import ChildCard from "../../components/Cards/childCard/ChildCard";
function TutorHome(params) {
    const id = cookie.getJSON("currentUser").user_id;

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/tutor/${id}`).then((response) => response.json()).then((body) => {
            setData(body);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="container-fluid ">
            <div className="flex">

                {
                isLoading ? <p>Loading</p> : <>
                    <div className="w-full lg:w-8/12 m-4">
                    <div className="p-3 offset-2 mt-5" >
                    <h4 className="text-2xl font-semibold mt-2 mb-5">
                        Your children ;)
                    </h4>
                    {
                        data.children.length > 0 ? data.children.map((child) => { 
                            console.log(child);
                        return <ChildCard key={child.id} name={
                            child.firstName
                        }
                        subjects={
                            child.subjects
                        }/>}) : < p > No child registered.</p>
                    } 
                </div>
                    </div>

                    <div className="w-full lg:w-4/12 m-4 p-5">
                        <CardProfile data={data}/>
                    </div>
                </>
            } </div>
        </div>
    );
}
export default TutorHome;
