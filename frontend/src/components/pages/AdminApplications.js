import AppFooter from "../appFooter/AppFooter";
import { AdminHeader } from "../appHeader/AppHeader";
import { UsersApplications } from "../accApplications/AccApplications";

const AdminApplications = () => {

    return (
        <div className="d-flex flex-column w-100 vh-100">
            <AdminHeader/>
            <UsersApplications/>
            <AppFooter/>
        </div>
    )
}

export default AdminApplications