import ChildForm from "../../components/childForm/ChildForm";
import ChildCard from "../../components/childCard/ChildCard";

function ParentHome(params) {
    const mock = [
        {
            name: "Yonatan Merkebu",
            subjects: ["22", "33"]
        }, {
            name: "Nafathe Merkebu",
            subjects: ["11", "00"]
        }
    ];
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <div className="p-3 offset-2 mt-5">
                        <h3 className="mb-4">Registered childs</h3>
                        {
                        mock.map((child) => <ChildCard name={
                                child.name
                            }
                            subjects={
                                child.subjects
                            }/>)
                    } </div>
                </div>
                <div className="col-md-6">
                    <ChildForm/>
                </div>
            </div>
        </div>

    );
}
export default ParentHome;
