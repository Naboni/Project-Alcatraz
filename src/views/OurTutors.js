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
                <section className="text-center bg-blueGray-600 relative w-full h-full py-20 px-40 min-h-screen">
                <h4 className="text-white text-2xl font-semibold mt-2 mb-5">Our Tutors</h4>
                <div className="flex flex-wrap">
                    {
                        isLoading ? <p>Loading</p> : 
                        <>      
                                {
                                    data.length > 0 ? 
                                    data.map((tutor) => {
                                        console.log(tutor);
                                    return <div key={tutor.id} className="w-full md:w-4/12 lg:w-3/12 lg:mb-0 mb-12 mt-4">
                                        <div className="">
                                            <img alt="..." src="assets/img/team-1-800x800.jpg" className="shadow-lg rounded-full mx-auto max-w-120-px"/>
                                            <div className="pt-6 text-center">
                                                <h5 className="text-xl font-bold">{tutor.firstname + " " + tutor.lastname}</h5>
                                                <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                                                {tutor.subjects}
                                                </p>
                                                <div className="mt-6">
                                                <Link className="text-grey"to={{
                                                    pathname: `/review/${tutor.id}`,
                                                    state: { tutor }
                                                  }}>details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }) 
                                    : <p> No Tutors.</p>
                                } 
                        </>
                    }
                </div>

                    <FooterSmall absolute/>
                </section>
            </main>
        </>
    );
}