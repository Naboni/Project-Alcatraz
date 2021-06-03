import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";


export default function Auth(props) {
  return (
    <>
      {/* <Navbar transparent /> */}
      <main className="overflow-hidden">
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(./img/register_bg_2.png)",
            }}
          ></div>

         {props.children}
            
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
