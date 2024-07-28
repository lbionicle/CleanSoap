import FormPersonal from "../formPersonal/FormPersonal";
import AppFooter from "../appFooter/AppFooter";
import AccReport from "../accReport/AccReport";
import {AdminHeader} from "../appHeader/AppHeader";

const AdminPersonal = () => {

    return (
        <div className="d-flex flex-column col-12 vh-100">
            <AdminHeader/>
            <div style={{margin: "10rem 0 1rem 0", flex: "1 0 auto"}} className="d-flex flex-wrap justify-content-center mx-auto col-11">
                    <FormPersonal/>
                    <AccReport/>
            </div>
            <AppFooter/>
        </div>
    )
}

export default AdminPersonal