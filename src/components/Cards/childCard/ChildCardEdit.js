import {useContext, useState} from "react";
// store
import AppContext from "../../../store/ApplicationCtx";
// bootstrap
import Card from "react-bootstrap/Card";
// 
function ChildCardEdit(props) {
    console.log(props);
    const AppCtx = useContext(AppContext);

    function handleDelete() {
        fetch(`http://127.0.0.1:5000/child/${props.id}`, {
            method: "DELETE",
        }).then((response) => response.json()).then((body) => {
            AppCtx.setChildren(
                AppCtx.children.filter((child) => child.id !== props.id)
            );
        }).catch((err) => console.log(err));
    }
    return (
        <div className="bg-white rounded shadow border p-3 w-64 mt-4"
            style={
                {
                    width: '50%',
                    minWidth: '500px'
                }
        }>

            <Card.Body>
                <Card.Title> {
                    <h3 className="px-2 text-lg"><strong>Full name:</strong> {props.name + " " + props.lname}</h3>
                }</Card.Title>
                <Card.Subtitle className="px-2 mb-2 text-muted text-lg"><strong>Subjects:</strong> {
                    props.subjects
                    //     props.subjects.map((element) => {
                    //         return <Badge variant="secondary"
                    //             style={
                    //                 {color: 'black'}
                    //         }>
                    //             {element}</Badge>
                    // })
                }</Card.Subtitle>
                <Card.Text></Card.Text>
                <button className="ml-5 mt-4 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" 
                onClick={()=>{}}>
                    Details
                </button>
            </Card.Body>
        </div>
    );
}
export default ChildCardEdit;
