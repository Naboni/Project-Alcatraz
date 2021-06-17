import React, {useState, useEffect, useRef} from "react";
import {Link, useLocation, useHistory} from "react-router-dom";
//
import cookie from "js-cookie";
import StarRatings from "react-star-ratings";

import Navbar from "../components/Navbars/AuthNavbar.js";
import Footer from "../components/Footers/Footer.js";

export default function Profile() {

    const commentRef = useRef();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [rating, setRating] = useState(0);

    const {state} = useLocation();

    const user = cookie.getJSON("currentUser");

    function handleSubmit() {
        if (user) {
            fetch("http://127.0.0.1:5000/review", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {"count": rating, "parent_name": user.user_username, "tutor_id": state.tutor.id, "comment": commentRef.current.value}
                )
            }).then((response) => response.json()).then((body) => {
                setData(data.concat({"count": rating, "parent_name": user.user_username, "comment": commentRef.current.value, "date": Date.now()}));
                setRating(0);
                commentRef.current.value = "";
            }).catch((err) => console.log(err));
        } else {
            history.push("/auth/login", {
                    from: `/review/${
                    state.tutor.id
                }`,
                tutor: state.tutor
            })
        }
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5000/review").then((response) => response.json()).then((body) => {
            setIsLoading(false);
            setData(data.concat(body.filter((rev) => rev.tutor_id == state.tutor.id)));
            console.log(body);
        }).catch((err) => console.log(err));
    }, [])

    // console.log(data.reduce((a, b) => (a + b.count),0)/2);
    return (
        <>
            <Navbar transparent/>
            <main className="profile-page">
                <section className="relative block h-500-px">
                    <div className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={
                            {backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"}
                    }>
                        <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                    </div>
                    <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style={
                            {transform: "translateZ(0)"}
                    }>
                        <svg className="absolute bottom-0 overflow-hidden" xmlns="https://wallpapercave.com/wp/wp5192934.jpg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img alt="..." src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=976&q=80" className="absolute -m-16 -ml-20 lg:-ml-16 rounded-full h-16 w-16 flex items-center justify-center max-w-200-px"
                                                style={
                                                    {
                                                        width: "200px",
                                                        height: "200px"
                                                    }
                                                }/>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            {/* <button className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                Connect
                                            </button> */} </div>
                                    </div>
                                    {
                                    isLoading ? <p>Loading</p> : <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {
                                                    data.length
                                                } </span>
                                                <span className="text-sm text-blueGray-400">
                                                    Reviews
                                                </span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {
                                                    data.length
                                                } </span>
                                                <span className="text-sm text-blueGray-400">
                                                    Comments
                                                </span>
                                            </div>
                                            <div className="lg:mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {
                                                    data.length > 0 ? ((data.reduce((a, b) => (a + b.count), 0)) / data.length).toFixed(1) : "0"
                                                } </span>
                                                <span className="text-sm text-blueGray-400">
                                                    Average Rating
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                } </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {
                                        state.tutor.firstname + " " + state.tutor.lastname
                                    } </h3>

                                    <div className="mb-2 mt-4 text-blueGray-600 ">
                                        <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                                        Phone number - {
                                        state.tutor.phone
                                    } </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-book mr-2 text-lg text-blueGray-400"></i>
                                        Teaching subjects: {
                                        state.tutor.subjects
                                    } </div>
                                </div>
                                <div className="mt-5 mb-5  text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                {
                                                state.tutor.bio
                                            } </p>

                                        </div>
                                    </div>
                                </div>
                                <div className=" border-b font-bold border-blueGray-200 px-4 ">
                                    Rate this tutor
                                </div>
                                <div className="flex flex-wrap pl-4 mt-4">
                                    <strong className="mt-2 mr-4">Rate</strong>
                                    <StarRatings className="ml-2" starSpacing="2px" starRatedColor="rgb(255, 166, 81)" starHoverColor="rgb(255, 166, 81)"
                                        rating={rating}
                                        starDimension="33px"
                                        changeRating={
                                            (x) => {
                                                return setRating(x)
                                            }
                                        }
                                        numberOfStars={5}
                                        name='rating'/>
                                </div>
                            <div className="pl-4 mt-2">
                                <strong className="mt-2 mr-4">Leave a comment</strong>
                                <textarea ref={commentRef}
                                    type="text"
                                    className="border-0 mr-4 mt-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    defaultValue=""
                                    rows="4"></textarea>
                            </div>
                            <div>
                                <button className="ml-3 mt-4 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit"
                                    onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                            <div className=" border-b mt-4 font-bold border-blueGray-200 px-4 ">
                                Latest Reviews
                            </div>
                            <div className="my-4">
                                <div> {
                                    isLoading ? <p>Loading</p> : data.length == 0 ? <p className="ml-2">No reviews yet.</p> : data.map((rev) => {
                                        return <div className="bg-white rounded-lg p-5 ">
                                            {/*border-b*/}
                                            <div className="flex">

                                                <div>
                                                    <div className="w-10 h-10 bg-cover bg-center rounded-full mr-3 shadow-inner"
                                                        style={
                                                            {backgroundImage: "url('https://i.pinimg.com/736x/38/50/58/3850581fdccab8f0186db5c5328da9bb.jpg')"}
                                                    }></div>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 font-medium">
                                                        {
                                                        rev.parent_name + " " + "(" + rev.count
                                                    }/5)</p>
                                                    <div className="flex items-center text-xs text-gray-600">
                                                        <p>{
                                                            rev.date
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <p className="text-gray-600 text-sm">
                                                    {
                                                    rev.comment
                                                } </p>
                                            </div>
                                        </div>
                                })
                                } </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
    </>
    );
}
