import React, {useEffect, useState} from "react";
 
// components
import CardTable from "../../components/Cards/CardTable.js";

export default function Users() {

    let [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/allusers').then(response => response.json()).then(data => {
            setUsers(data);
            console.log(data)
        });
    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTable cls="Users"
                        data={users}/>
                </div>
            </div>
        </>
    );
}
