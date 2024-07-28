import AppFooter from "../appFooter/AppFooter";
import { AdminHeader } from "../appHeader/AppHeader";
import AccClients from "../accClients/AccClients";
import ModalError from "../modalError/ModalError";
import useErrorHandler from "../../hooks/useErrorHandler";
import AppCheckToken from "../appCheckToken/AppCheckToken";
import AppCheckRole from "../appCheckRole/AppCheckRole";

const AdminClients = () => {

    const {error, handleError} = useErrorHandler();

    return (
        <AppCheckToken>
            <AppCheckRole>
                <div className="d-flex flex-column w-100 vh-100">
                    <AdminHeader/>
                    <AccClients onError={handleError}/>
                    <AppFooter/>
                    <ModalError error={error}/>
                </div>
            </AppCheckRole>
        </AppCheckToken>
    )
}

export default AdminClients;