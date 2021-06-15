import React, {useEffect, useState} from "react";

// components

import CardTable from "../../components/Cards/ChildTableCard.js";

export default function AssignedChildren() {
  let [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/allchildren').then(response => response.json()).then(data => {
            const pending = data.filter((child) => child.assigned == true);
            setUsers(pending);
        });
    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTable color={"light"}
                        cls="Assigned Children"
                        data={users}/>
                </div>
            </div>
        </>
  );
}
