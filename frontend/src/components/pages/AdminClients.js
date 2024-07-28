import AppFooter from "../appFooter/AppFooter";
import { AdminHeader } from "../appHeader/AppHeader";
import AccClients from "../accClients/AccClients"

const AdminClients = () => {

    return (
        <div className="d-flex flex-column w-100 vh-100">
            <AdminHeader/>
            <AccClients/>
            <AppFooter/>
        </div>
    )
}

export default AdminClients;