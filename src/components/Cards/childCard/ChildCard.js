import classes from "./ChildCard.module.css";
// bootstrap
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function ChildCard(props) {
    return (<div className="bg-white rounded shadow border p-3 w-64 mt-4"

        style={
            {
                width: '60%',
                minWidth: '300px'
            }
    }>
        <Card.Body>
            <Card.Title> {
                props.name
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
            <Card.Link href="#">Edit</Card.Link>
            <Card.Link href="#">Delete</Card.Link>
        </Card.Body>
    </div>);
}
export default ChildCard;
