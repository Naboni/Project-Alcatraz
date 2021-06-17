import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
// components

import Navbar from "../components/Navbars/AuthNavbar.js";
import Footer from "../components/Footers/Footer.js";
//css 
import "../layouts/fonts.css"

export default function Landing(props) {
    const nameRef = useRef();
    const mssgRef = useRef();

    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function handleFeedbackSubmit() {
        if (nameRef.current.value && mssgRef.current.value) {
            fetch("http://127.0.0.1:5000/feedback", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {"username": nameRef.current.value, "comment": mssgRef.current.value}
                )
            }).then((response) => response.json()).then((body) => {
                if (!body.message) {
                    setFeedbacks(feedbacks.concat({"username": nameRef.current.value, "comment": mssgRef.current.value, "date": Date.now()}));
                    nameRef.current.value = "";
                    mssgRef.current.value = "";
                } else {
                    console.log(body.message);
                }
                return body;
            }).catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5000/feedback").then((response) => response.json()).then((body) => {
            if (!body.message) {
                setFeedbacks(feedbacks.concat(body));
                setIsLoading(false);
            } else {
                console.log(body.message);
            }
            return body;
        }).catch((err) => console.log(err));
    }, [])
    return (
        <>
            <Navbar transparent/>
            <main>
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={
                            {backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')"}
                    }>
                        <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4 ml-auto mr-auto text-center">
                                <div className="pr-12">
                                    <h1 className="robotoFont text-white text-5xl">
                                        Find Qualified Tutors at an Affordable Price.
                                    </h1>
                                    <p className="mt-4 text-lg text-blueGray-200 comfortFont">
                                        At E-Tutor we understand finding a tutor is not always easy task. We strive to make the process as simple as possible - listing all personal and private tutors closest to you...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style={
                            {transform: "translateZ(0)"}
                    }>
                        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </div>

<section className="pb-20 bg-blueGray-200 -mt-24">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap">
                            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                            <i className="fas fa-award"></i>
                                        </div>
                                        <h6 className="text-xl oxaniumFont font-semibold">SEARCH BASED ON YOUR NEEDS</h6>
                                        <p className="mt-2 mb-4 serifFont text-blueGray-500">
                                            After hitting the search button, you can filter the results to find your perfect tutor. You can filter by price, subject, grade level, and schedule
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                                            <i className="fas fa-retweet"></i>
                                        </div>
                                        <h6 className="text-xl oxaniumFont font-semibold">ONLY THE TOP TUTORS</h6>
                                        <p className="mt-2 mb-4 serifFont text-blueGray-500">Our tutors have scored 4.0 in 10th grade and 500+ in 12th grade National Exams. Moreover, we conduct a very rigorous screening and interviewing procedure to select on the very best.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                                            <i className="fas fa-fingerprint"></i>
                                        </div>
                                        <h6 className="text-xl oxaniumFont font-semibold">CHOOSE THE TUTOR YOU WANT</h6>
                                        <p className="mt-2 mb-4 serifFont text-blueGray-500">Every tutor's profile has a name, profile picture, education background, service price and elevator pitch as to why they are the best tutor for the subject you want help with. This makes it ideal for you to find the perfect tutor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

<div className="flex flex-wrap items-center mt-32">
                            <div className="serifFont w-full md:w-5/12 px-4 mr-auto ml-auto">
                                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                    <i className="fas fa-user-friends text-xl"></i>
                                </div>
                                <h3 className="text-4xl dancingFont mb-2 font-semibold leading-normal">
                                    Working with us is a pleasure
                                </h3>
                                <p className="text-lg  font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                    After you get the tutor you like, you just click a button to hire him/her and we will take care of the rest. In the rare case where you are not able to find the tutor you want we will personally find them for you. Just let us know!</p>
                                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                                    Through our filter option, you get to choose how you want to pay: monthly or hourly, when you want to meet and who you want to hire by viewing our tutors background, bio and profile.
                                </p>
                                <Link to="/ourtutors" className="font-bold text-blueGray-700 mt-8">
                                    Check Our Tutors!
                                </Link>
                            </div>

                            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                                    <img alt="..." src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" className="w-full align-middle rounded-t-lg"/>
                                    <blockquote className="relative p-8 mb-4">
                                        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block h-95-px -top-94-px">
                                            <polygon points="-30,95 583,95 583,65" className="text-lightBlue-500 fill-current"></polygon>
                                        </svg>
                                        <h4 className="text-xl serifFont font-bold text-white">
                                            We Produce Results
                                        </h4>
                                        <p className="text-md text-xl font-light mt-2 text-white">
                                            Learn why tutoring is so beneficial for your child. Tutoring is for all students at all levels of their learning journey.</p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                
<section className="relative py-20">
                    <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
                        style={
                            {transform: "translateZ(0)"}
                    }>
                        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>

                    <div className="container mx-auto px-4">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                                <img alt="..." className="max-w-full rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/>
                            </div>
                            <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                                <div className="serifFont md:pr-12">
                                    <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                                        <i className="fas fa-rocket text-xl"></i>
                                    </div>
                                    <h3 className="text-4xl dancingFont font-semibold">A Growing Company</h3>
                                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                                        At E-Tutors, we believe parents who want to hire tutors or students who seek tutoring should get an easy and convenient access to find top quality tutors. 
                                                                            Hence, we have build online platform in Ethiopia that connects parents/students who seek tutoring service with top tutors based on their needs.
                                    </p>
                                    <ul className=" list-none mt-6">
                                        <li className="py-2">
                                            <div className="flex items-center">
                                                <div>
                                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                                                        <i className="fas fa-fingerprint"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="text-blueGray-500">
                                                        The Best Tutors
                                                    </h4>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="py-2">
                                            <div className="flex items-center">
                                                <div>
                                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                                                        <i className="fab fa-html5"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="text-blueGray-500">

Personalized
                                                    </h4>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="py-2">
                                            <div className="flex items-center">
                                                <div>
                                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                                                        <i className="far fa-paper-plane"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="text-blueGray-500">
                                                        Variety of Subjects
                                                    </h4>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


<section className="pt-20 pb-48">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center text-center mb-24">
                            <div className="w-full lg:w-6/12 px-4">
                                <h2 className="dancingFont text-4xl font-semibold">About Us</h2>
                                <p className="text-lg serifFont leading-relaxed m-4 text-blueGray-500">
                                    We are a team of students who are trying to start a company, that will be helpful to students in Ethiopia.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                                <div className="px-6">
                                    <img alt="..." src="assets/img/team-1-800x800.jpg" className="shadow-lg rounded-full mx-auto max-w-120-px"/>
                                    <div className="pt-6 text-center">
                                        <h5 className="text-xl oxaniumFont font-bold">Yonathan Merkebu</h5>
                                        <p className="mt-1 robotoFont text-sm text-blueGray-400 uppercase font-semibold">
                                            Web Developer
                                        </p>
                                        <div className="mt-6">
                                            <button className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-twitter"></i>
                                            </button>
                                            <button className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>
                                            <button className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-dribbble"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                                <div className="px-6">
                                    <img alt="..." src="assets/img/team-1-800x800.jpg" className="shadow-lg rounded-full mx-auto max-w-120-px"/>
                                    <div className="pt-6 text-center">
                                        <h5 className="text-xl oxaniumFont font-bold">Naboni Abebe</h5>
                                        <p className="mt-1 robotoFont text-sm text-blueGray-400 uppercase font-semibold">
                                            Web Developer
                                        </p>
                                        <div className="mt-6">
                                            <button className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-twitter"></i>
                                            </button>
                                            <button className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>

<button className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">

                                                <i className="fab fa-dribbble"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                                <div className="px-6">
                                    <img alt="..." src="assets/img/team-2-800x800.jpg" className="shadow-lg rounded-full mx-auto max-w-120-px"/>
                                    <div className="pt-6 text-center">
                                        <h5 className="text-xl oxaniumFont font-bold">Abiy Menberu</h5>
                                        <p className="mt-1 robotoFont text-sm text-blueGray-400 uppercase font-semibold">
                                            Web Developer
                                        </p>
                                        <div className="mt-6">
                                            <button className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-google"></i>
                                            </button>
                                            <button className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                                <div className="px-6">
                                    <img alt="..." src="assets/img/team-3-800x800.jpg" className="shadow-lg rounded-full mx-auto max-w-120-px"/>
                                    <div className="pt-6 text-center">
                                        <h5 className="text-xl oxaniumFont font-bold">Bisrat Fekede</h5>
                                        <p className="mt-1 robotoFont text-sm text-blueGray-400 uppercase font-semibold">
                                            Web Developer
                                        </p>
                                        <div className="mt-6">
                                            <button className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-google"></i>
                                            </button>
                                            <button className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-twitter"></i>
                                            </button>
                                            <button className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-instagram"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                                <div className="px-6">

<img alt="..." src="assets/img/team-4-470x470.png" className="shadow-lg rounded-full mx-auto max-w-120-px"/>
                                    <div className="pt-6 text-center">
                                        <h5 className="text-xl oxaniumFont font-bold">Yohannes Adisu</h5>

                                        <p className="mt-1 robotoFont text-sm text-blueGray-400 uppercase font-semibold">
                                            Web Developer
                                        </p>
                                        <div className="mt-6">
                                            <button className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-dribbble"></i>
                                            </button>
                                            <button className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-google"></i>
                                            </button>
                                            <button className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-twitter"></i>
                                            </button>
                                            <button className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1" type="button">
                                                <i className="fab fa-instagram"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                


                <section className="pb-20 relative block bg-blueGray-800">
                    <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
                        style={
                            {transform: "translateZ(0)"}
                    }>
                        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="text-blueGray-800 fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>

                    <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
                        <div className="flex flex-wrap text-center justify-center">
                            <div className="w-full lg:w-6/12 px-4">
                                <h2 className="dancingFont text-5xl font-semibold text-white">
                                    Testimonials
                                </h2>
                                <p className="serifFont text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                                  What our customers said about us...
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-12 justify-center">
                            {/* feddback */}
                            {
                            isLoading ? <p>Loading</p> : feedbacks.length == 0 ? <h6 className="text-xl mt-5 font-semibold text-white">No feedbacks</h6> : feedbacks.map((fb) => {
                                return <div className="w-full lg:w-3/12 px-4 text-center">
                                    <h6 className="text-xl mt-5 font-semibold text-white">
                                        {
                                        fb.username
                                    } </h6>
                                    <p className="mt-2 mb-4 text-blueGray-400">
                                        {
                                        fb.comment
                                    } </p>
                                    <p className="mt-2 mb-4 text-blueGray-400">
                                        {
                                        fb.date
                                    } </p>
                                </div>
                        })
                        }

                            {/*  */} </div>
                    </div>
                </section>
                


                <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                                    <div className="flex-auto p-5 lg:p-10">
                                        <h4 className="serifFont text-center text-2xl font-semibold">
                                            Tell us what you feel
                                        </h4>
                                        <p className="dancingFont text-2xl text-center leading-relaxed mt-2 mb-2 text-blueGray-500">
                                            Fill this form to let us know
                                        </p>
                                        <div className="relative w-full mb-3 mt-8">
                                            <label className="block oxaniumFont text-blueGray-600 text-xm font-bold mb-2" htmlFor="full-name">
                                                Full Name
                                            </label>
                                            <input ref={nameRef}
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Full Name"/>
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label className="block oxaniumFont text-blueGray-600 text-xm font-bold mb-2" htmlFor="message">
                                                Message
                                            </label>
                                            <textarea ref={mssgRef}
                                                rows="4"
                                                cols="80"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Type a message..."/>
                                        </div>
                                        <div className="text-center mt-6">
                                            <button onClick={handleFeedbackSubmit}
                                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold oxaniumFont px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button">
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
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
