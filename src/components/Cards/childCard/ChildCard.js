import {useContext, useState} from "react";
// store
import AppContext from "../../../store/ApplicationCtx";
// bootstrap
import Card from "react-bootstrap/Card";
// swal
import SweetAlert from "react-bootstrap-sweetalert";

function ChildCard(props) {
    console.log(props);
    const AppCtx = useContext(AppContext);

    const [alert, setAlert] = useState(false);

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
                    width: '60%',
                    minWidth: '300px'
                }
        }>
            {
            alert && (
                <SweetAlert warning showCancel confirmBtnText="Yes, delete it!" confirmBtnBsStyle="danger" title="Are you sure?"
                    onConfirm={handleDelete}
                    onCancel={() => {setAlert(false);}}
                    focusCancelBtn>
                    This can not be undone!
                </SweetAlert>
            )
        }
            <Card.Body>
                <Card.Title> {
                    props.name + " " + props.lname
                }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Subjects: {
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
                <button onClick={
                    () => setAlert(true)
                }>Delete</button>
            </Card.Body>
        </div>
    );
}
export default ChildCard;
