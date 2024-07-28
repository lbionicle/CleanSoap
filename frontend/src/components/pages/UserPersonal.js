import AppFooter from "../appFooter/AppFooter";
import { UserHeader } from "../appHeader/AppHeader";
import FormPersonal from "../formPersonal/FormPersonal";

const UserPersonal = () => {

    return (
        <div className="d-flex flex-column w-100 vh-100">
            <UserHeader/>
            <div style={{margin: "10rem 0 3rem 0", flex: "1 0 auto"}} className="d-flex align-items-cente justify-content-center col-11 mx-auto">
                <FormPersonal/>
            </div>
            <AppFooter/>
        </div>
    )
}

export default UserPersonal;