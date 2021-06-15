import React from "react";

// components

import CardStats from "../Cards/CardStats.js";

export default function HeaderStats(props) {
  console.log(props);
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Users"
                  statTitle={props.users.length}
                  statIconName="fas fa-users"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Parents"
                  statTitle={props.users.filter((u)=>u.user_role == "parent").length}
                  statPercentColor="text-red-500"
                  statIconName="fas fa-users"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="tutors"
                  statTitle={props.users.filter((u)=>u.user_role == "tutor").length}
                  statPercentColor="text-orange-500"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Admin"
                  statTitle={props.users.filter((u)=>u.user_role == "sa").length}
                  statPercentColor="text-emerald-500"
                  statIconName="fas fa-users"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
