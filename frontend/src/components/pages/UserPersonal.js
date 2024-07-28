import useErrorHandler from "../../hooks/useErrorHandler";
import AppFooter from "../appFooter/AppFooter";
import { UserHeader } from "../appHeader/AppHeader";
import FormPersonal from "../formPersonal/FormPersonal";
import ModalError from "../modalError/ModalError";
import AppCheckToken from "../appCheckToken/AppCheckToken";

const UserPersonal = () => {

    const { error, handleError } = useErrorHandler();

    return (
        <AppCheckToken>
            <div className="d-flex flex-column w-100 vh-100">
                <UserHeader/>
                <div style={{margin: "10rem 0 3rem 0", flex: "1 0 auto"}} className="d-flex align-items-cente justify-content-center col-11 mx-auto">
                    <FormPersonal onError={handleError}/>
                    <ModalError error={error}/>
                </div>
                <AppFooter/>
            </div>
        </AppCheckToken>
    )
}

export default UserPersonal;