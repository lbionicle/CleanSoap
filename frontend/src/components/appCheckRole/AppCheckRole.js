import { useEffect, useState } from "react";
import AppNotAdmin from "../appNotAdmin/AppNotAdmin";
import useServices from "../../services/Service";
import Spinner from "../spinner/Spinner";

const AppCheckRole = (props) => {
    const { getRole } = useServices();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await getRole(token);
                setRole(response);
            } catch (error) {
                console.error("Failed to fetch role:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [getRole]);

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center col-12 vh-100"><Spinner/></div>
    }

    return (
        <>
            {role === "Admin" ? (
                <>
                    {props.children}
                </>
            ) : (
                <AppNotAdmin />
            )}
        </>
    );
};

export default AppCheckRole;