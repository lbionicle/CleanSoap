import MyApp from "../myApp/MyApp"
import AppFooter from "../appFooter/AppFooter";
import { UserHeader } from "../appHeader/AppHeader";
import AppCheckToken from "../appCheckToken/AppCheckToken";
import useErrorHandler from "../../hooks/useErrorHandler";
import ModalError from "../modalError/ModalError";

const UserApplications = () => {

    const { error, handleError } = useErrorHandler();

    return (
        <AppCheckToken>
            <div className="d-flex flex-column w-100 vh-100">
                <UserHeader/>
                <MyApp onError={handleError}/>
                <AppFooter/>
            </div>
            <ModalError error={error}/>
        </AppCheckToken>
    )
}

export default UserApplications;