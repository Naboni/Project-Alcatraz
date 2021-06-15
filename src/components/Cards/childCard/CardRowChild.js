import React from "react";
import {Link} from "react-router-dom";
//components

export default function CardRowChild(props) {
    // console.log("from props");
    // console.log(props);
    return (
        <tr>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <strong>{props.fname}</strong>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <strong>{props.lname}</strong>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.subjects} 
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.gender}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="flex items-center">
                    <p>{props.age}</p>
                </div>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="flex items-center">
                    <p>{(props.assigned).toString().toUpperCase()}</p>
                </div>
            </td>
            {
                props.assigned ? null :  <td className=" p-4 text-left">
                <Link to={{
                    pathname: `/admin/assign/${props.id}`,
                    state: { child: props }
                }}   >
                    Assign
                </Link>
            </td>
            }
           
        </tr>
    );
}
