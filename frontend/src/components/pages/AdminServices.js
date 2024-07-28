import AppFooter from "../appFooter/AppFooter";
import {AdminHeader} from "../appHeader/AppHeader";
import AccServices from "../accServices/AccServices"
import useErrorHandler from "../../hooks/useErrorHandler";
import ModalError from "../modalError/ModalError";
import AppCheckToken from "../appCheckToken/AppCheckToken";
import AppCheckRole from "../appCheckRole/AppCheckRole";

const AdminServices = () => {

    const {error, handleError} = useErrorHandler();

    return (
        <AppCheckToken>
            <AppCheckRole>
                <div className="d-flex flex-column w-100 vh-100">
                    <AdminHeader/>
                    <AccServices onError={handleError}/>
                    <AppFooter/>
                    <ModalError error={error}/>
                </div>
            </AppCheckRole>
        </AppCheckToken>
    )
}

export default AdminServices;