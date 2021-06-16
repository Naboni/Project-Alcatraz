import React from "react";

// components

export default function CardProfile(props) {
  const tutor = (props.data).tutor;
  const children = (props.data).children;
  console.log(tutor);

//   bio: "jh"
// firstname: "boni"
// gender: "M"
// lastname: "abebe"
// location: "adama"
// phone: "0099"
// subjects: "bio, amh"
// tid: 2
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-blue-200 w-full mb-6 border rounded-lg p-5">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              {/* <div className="relative">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=976&q=80"
                  className="rounded-full h-16 w-16 flex items-center justify-center"
                  style={
                    {
                      width:"200px",
                      height:"200px"
                    }
                  }
                />
              </div> */}
            </div>
            <div className="w-full px-4 text-center">
              <div className="flex justify-center lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {children.length}
                  </span>
                  <span className="text-sm text-blueGray-400">Students</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    10
                  </span>
                  <span className="text-sm text-blueGray-400">Rating</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    89
                  </span>
                  <span className="text-sm text-blueGray-400">Comments</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
             {tutor.firstname + " " + tutor.lastname}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
               {tutor.location}
            </div>
            <div className="mb-2 text-blueGray-600 ">
              <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
              Phone number - {tutor.phone}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-book mr-2 text-lg text-blueGray-400"></i>
              Teaching subjects: {tutor.subjects}
            </div>
          </div>
          
          <div className="border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                {tutor.bio}
                </p>
                {/* <a
                  href="#pablo"
                  className="font-normal text-lightBlue-500 py-10"
                  onClick={(e) => e.preventDefault()}
                >
                  Edit profile
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
