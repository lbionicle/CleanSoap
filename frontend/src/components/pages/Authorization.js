import { useState } from "react";

import loginPage from "../../resources/img/login-main.png"

import AuthLogin from "../authLogin/AuthLogin";
import AuthReg from "../authReg/AuthReg";

const Authorization = () => {
    const [stage, setStage] = useState("login");

    return (
        <div style={{background: `url(${loginPage}) center center/cover no-repeat`}} className="col-12 d-flex justify-content-center align-items-center vh-100">
            {stage === "login" ? <AuthLogin setStage={setStage}/> : <AuthReg setStage={setStage}/>}
        </div>
    )
}

export default Authorization;
