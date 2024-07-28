import React from "react";
import useServices from "../../services/Service";
import NavPassword from "../navPassword/NavPassword";
import "./authLogin.scss";
import { useNavigate } from "react-router-dom";

const AuthLogin = ({ setStage, onError }) => {
    const { login } = useServices();

    const navigate = useNavigate();

    const handleSubmitClick = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target).entries());

        login(data)
            .then(response => {
                if (!response.detail) {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("role", response.role);
                    navigate("/main")
                } else {
                    onError(response.detail);
                }
            })
            .catch(error => {
                onError({ errorHeader: "Ошибка", errorMessage: "Что-то пошло не так" });
            });
    };

    return (
        <div style={{ zIndex: 3 }} className="auth-wrapper-reg vh-100 bg-white d-flex flex-column justify-content-center align-items-center col-12 col-lg-6 col-xxl-4 px-5">
            <h2 style={{ fontWeight: 600 }} className="col-12 mb-3">Авторизация</h2>
            <form onSubmit={(e) => handleSubmitClick(e)} id="authLogin" className="wrapper-reg-form col-12 my-4">
                <input className="form-control" name="email" type="email" id="firstName" placeholder="Ваш email" required />
                <NavPassword
                    styleElem="mt-3"
                    name="password"
                    placeholder="Пароль"
                    minLength={8}
                    maxLength={16}
                    required
                />
                <div className="form-controls w-100 text-center mt-4">
                    <button className="btn btn-submit btn-dark col-12 text-center" type="submit">Войти</button>
                </div>
            </form>
            <div className="wrapper-reg-login d-flex flex-wrap justify-content-center col-12 mt-3">
                <div style={{ fontWeight: 300 }} className="text-secondary text-nowrap fs-6">У вас нет учетной записи?</div>
                <div onClick={() => setStage("reg")} style={{ cursor: "pointer", fontWeight: 600 }} className="ms-1 fs-6">Зарегистрироваться</div>
            </div>
        </div>
    );
};

export default AuthLogin;
