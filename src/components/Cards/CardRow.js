import React from "react";
//components
import TableDropdown from "../Dropdowns/TableDropdown.js";

export default function CardRow(props) {

    return (
        <tr>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="flex">
                    <img src="assets/img/team-4-470x470.png" alt="..." className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"></img>
                </div>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <strong>{props.name}</strong>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.email} 
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-circle text-teal-500 mr-2"></i>
                {/* text-orange-500 */}
                {props.role}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="flex items-center">
                    <p>{props.date}</p>
                </div>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                <TableDropdown/>
            </td>
        </tr>
    );
}
