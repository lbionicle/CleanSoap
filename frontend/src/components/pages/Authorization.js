import React, { useState } from 'react';
import loginPage from "../../resources/img/login-main.png";
import AuthLogin from "../authLogin/AuthLogin";
import AuthReg from "../authReg/AuthReg";
import ModalError from "../modalError/ModalError";
import useErrorHandler from '../../hooks/useErrorHandler';

const Authorization = () => {
    const [stage, setStage] = useState("login");
    const { error, handleError } = useErrorHandler();

    return (
        <div style={{ background: `url(${loginPage}) center center/cover no-repeat` }} className="col-12 d-flex justify-content-center align-items-center vh-100">
            {stage === "login" ? <AuthLogin onError={handleError} setStage={setStage} /> : <AuthReg onError={handleError} setStage={setStage} />}
            <ModalError error={error} />
        </div>

    );
};

export default Authorization;
