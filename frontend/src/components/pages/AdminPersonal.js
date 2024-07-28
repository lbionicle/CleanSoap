import FormPersonal from "../formPersonal/FormPersonal";
import AppFooter from "../appFooter/AppFooter";
import AccReport from "../accReport/AccReport";
import {AdminHeader} from "../appHeader/AppHeader";
import useErrorHandler from "../../hooks/useErrorHandler";
import ModalError from "../modalError/ModalError";
import AppCheckToken from "../appCheckToken/AppCheckToken";
import AppCheckRole from "../appCheckRole/AppCheckRole";

const AdminPersonal = () => {

    const {error, handleError} = useErrorHandler();

    return (
        <AppCheckToken>
            <AppCheckRole>
                <div className="d-flex flex-column col-12 vh-100">
                    <AdminHeader/>
                    <div style={{margin: "10rem 0 1rem 0", flex: "1 0 auto"}} className="d-flex flex-wrap justify-content-center mx-auto col-11">
                            <FormPersonal onError={handleError}/>
                            <AccReport/>
                            <ModalError error={error}/>
                    </div>
                    <AppFooter/>
                </div>
            </AppCheckRole>
        </AppCheckToken>
    )
}

export default AdminPersonal