import AppFooter from "../appFooter/AppFooter";
import { AdminHeader } from "../appHeader/AppHeader";
import AdminApp from "../adminApp/AdminApp"
import AppCheckRole from "../appCheckRole/AppCheckRole";
import AppCheckToken from "../appCheckToken/AppCheckToken";
import ModalError from "../modalError/ModalError";
import useErrorHandler from "../../hooks/useErrorHandler";

const AdminApplications = () => {

    const { error, handleError } = useErrorHandler();

    return (
        <AppCheckToken>
            <AppCheckRole>
                <div className="d-flex flex-column w-100 vh-100">
                    <AdminHeader/>
                    <AdminApp onError={handleError}/>
                    <AppFooter/>
                </div>
                <ModalError error={error} />
            </AppCheckRole>
        </AppCheckToken>
    )
}

export default AdminApplications