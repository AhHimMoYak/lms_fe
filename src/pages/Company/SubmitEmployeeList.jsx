import {useLocation} from "react-router-dom";
import SubmitEmployeeListComponent from "../../components/Company/SubmitEmployeeList.jsx"

function SubmitEmployeeList() {

    const location = useLocation();
    const {courseProvideId,attendeeCount} = location.state || {};
    return (
        <>
            <SubmitEmployeeListComponent courseProvideId={courseProvideId} attendeeCount={attendeeCount}/>
        </>
    )
}

export default SubmitEmployeeList;