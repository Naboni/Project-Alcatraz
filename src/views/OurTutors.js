import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import cookie from "js-cookie";

// componenets
import Navbar from "../components/Navbars/AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";

export default function OurTutors() {

    const user = cookie.getJSON("currentUser");

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/alltutors`).then(response => response.json()).then(body => {
            setIsLoading(false);
            setData(body);
        });
    }, []);

    return (
        <>
            <Navbar/>
            <main>
                <section className="bg-blueGray-600 relative w-full h-full py-40 min-h-screen">
                    
                    {
                        isLoading ? <p>Loading</p> : 
                        <>
                            <div className="w-full lg:w-4/12 m-4 p-4">
                                <h4 className="text-white text-2xl font-semibold mt-2 mb-5">
                                    Our Tutors
                                </h4>
                                {
                                    data.length > 0 ? 
                                    data.map((tutor) => {
                                        console.log(tutor);
                                        return <div key={tutor.id} className="border p-4">
                                                  <p className="text-white">Name: {tutor.firstname + " " + tutor.lastname}</p>
                                                  <p className="text-white">Gender: {tutor.gender}</p>
                                                  <p className="text-white">Subjects: {tutor.subjects}</p>
                                                  <Link className="text-grey"to={{
                                                    pathname: `/review/${tutor.id}`,
                                                    state: { tutor }
                                                  }}>details</Link>
                                               </div>
                                    }) 
                                    : <p> No Tutors.</p>
                                } 
                            </div>
                        </>
                    }
                    <FooterSmall absolute/>
                </section>
            </main>
        </>
    );
}
