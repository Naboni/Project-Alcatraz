// bootstrap
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function ChildForm(params) {
    return (
        <div className="p-3  mt-5">
            <div className="container">
                <h3 className="mb-4">Child form</h3>

                <Form>
                    <Row>
                        <Col>
                            <Form.Control placeholder="First name"/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="Last name"/>
                        </Col>
                    </Row>
                    <Row className="mt-4 mb-2">
                        <Col>
                            <Form.Control placeholder="Age"/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="Gender"/>
                        </Col>
                    </Row>
                    <Form.Group as={Col}
                        controlId="formGridState">
                        <Form.Label>Subjects</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>Amh</option>
                            <option>Eng</option>
                        </Form.Control>
                    </Form.Group>
                    <Button className="mt-3" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        </div>
    );
}
export default ChildForm;
