import {MyApplications} from "../accApplications/AccApplications";
import AppFooter from "../appFooter/AppFooter";
import { UserHeader } from "../appHeader/AppHeader";

const UserApplications = () => {

    return (
        <>
            <div className="d-flex flex-column w-100 vh-100">
                <UserHeader/>
                <MyApplications/>
                <AppFooter/>
            </div>
        </>
    )
}

export default UserApplications;