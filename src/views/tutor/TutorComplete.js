import React, {useContext, useRef, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
//
import {googleProvider} from "../../config/providerMethod";
import socialMediaAuth from "../../service/auth"
// store
import AppContext from "../../store/ApplicationCtx";
// 
import cookie from "js-cookie";
// components

export default function TutorComplete() {

  const user_id = cookie.getJSON("currentUser");

  let [users, setUsers] = useState([]);


  const AppCtx = useContext(AppContext);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const addresRef = useRef();
  const subjectsRef = useRef();
  const genderRef = useRef();
  const bioRef = useRef();

  const history = useHistory();
  const kuki = cookie.getJSON("currentUser")
  function handleOnSubmit() {
      
      fetch("http://127.0.0.1:5000/tutor", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              "firstname": firstNameRef.current.value,
              "lastname": lastNameRef.current.value,
              "location": addresRef.current.value,
              "phone": phoneRef.current.value,
              "subjects": subjectsRef.current.value,
              "gender": genderRef.current.value,
              "bio": bioRef.current.value,
              // get Id from kuki
              "uid": kuki.user_id
          }
          )
      }).then((response) => response.json()).then((body) => {
          if (!body.message) {
            console.log(kuki.user_role);
            history.replace(`/user/${kuki.user_role}`,{ from: 'complete' });
          } else {
              console.log(body.message);
          }
          return body;
      }).catch((err) => console.log(err));

  }

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          addresRef.current.value = "Geolocation is not supported by this browser.";
      }
  }

  function showPosition(position) {
      addresRef.current.value = position.coords.latitude + ", " + position.coords.longitude;
  }
  getLocation();

  return (
      <>
          <div className="self-center w-full h-full flex items-stretch">
                <div className="ml-auto  mt-60 self-center mr-auto mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 lg:w-6/12">
                    <div className="bg-blue-200 rounded-t border-b mb-0 px-6 py-6 " >
                        <div className="text-center flex justify-between">
                          <h6 className="text-blueGray-700 text-xl font-bold">Complete Profile</h6>
                          <button className="ml-2 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 rounded shadow hover:shadow-lg py-2" type="button"
                                onClick={handleOnSubmit}>
                                Complete
                            </button>
                      </div>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <form>
                          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                              Please fill this form to continue
                          </h6>
                          <div className="flex flex-wrap">

                              <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                          First Name
                                      </label>
                                      <input ref={firstNameRef}
                                          type="text"
                                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          placeholder="First Name"/>
                                  </div>
                              </div>
                              <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                          Last Name
                                      </label>
                                      <input ref={lastNameRef}
                                          type="text"
                                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          placeholder="Last Name"/>
                                  </div>
                              </div>
                          </div>

                          <hr className="mt-6 border-b-1 border-blueGray-300"/>

                          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                              Contact Information
                          </h6>
                          <div className="flex flex-wrap">
                              <div className="w-full lg:w-12/12 px-4">
                                  <div className="relative w-full mb-3">
                                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                          Address
                                      </label>
                                      <input ref={addresRef}
                                          type="text"
                                          readOnly
                                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          defaultValue=""/>
                                  </div>
                              </div>
                              <div className="w-full lg:w-4/12 px-4">
                                  <div className="relative w-full mb-3">
                                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                          Phone
                                      </label>
                                      <input ref={phoneRef}
                                          type="phone"
                                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          placeholder="Phone Number"/>
                                  </div>
                              </div>
                              <div className="w-full lg:w-4/12 px-4">
                                  <div className="relative w-full mb-3">
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
                              </div>
                              <div className="w-full lg:w-4/12 px-4">
                                  <div className="relative w-full mb-3">
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
                          </div>

                          <hr className="mt-6 border-b-1 border-blueGray-300"/>

                          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                              Bio
                          </h6>
                          <div className="flex flex-wrap">
                              <div className="w-full lg:w-12/12 px-4">
                                  <div className="relative w-full mb-3">
                                      
                                      <textarea ref={bioRef} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="" rows="4"></textarea>
                                  </div>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </>
  );
}