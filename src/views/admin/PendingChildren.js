import React, {useEffect, useState} from "react";

// components
import CardTable from "../../components/Cards/ChildTableCard";

export default function PendingChildren() {

  let [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/allchildren').then(response => response.json()).then(data => {
            setUsers(data);
            console.log(data);
        });
    }, []);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable color={"light"} cls="Pending Children" data={users}/>
        </div>
      </div>
    </>
  );
}
