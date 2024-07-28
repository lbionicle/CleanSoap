
import { useNavigate } from "react-router-dom";
import useServices from "../../services/Service";
import NavPassword from "../navPassword/NavPassword"

import "./authReg.scss"

const AuthReg = ({setStage, onError}) => {
    const {register} = useServices();

    const navigate = useNavigate();

    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

    const handleSubmitClick = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target).entries());

        register(data)
            .then(response => {
                if (!response.detail) {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("role", "User");
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
        <div style={{zIndex: 3}} className="auth-wrapper-reg vh-100 bg-white d-flex flex-column justify-content-center align-items-center col-12 col-lg-6 col-xxl-4 px-5">
            <h2 style={{fontWeight: 600}} className="col-12 mb-3">Регистрация</h2>
            <form onSubmit={(e) => handleSubmitClick(e)} id="authReg" className="wrapper-reg-form col-12 my-4">
                <input className="form-control" name="first_name" type="name" id="first_name" placeholder="Имя" required></input>
                <input className="form-control mt-3" name="last_name" type="name" id="last_name" placeholder="Фамилия" required></input>
                <input className="form-control mt-3" name="email" type="email" id="email" placeholder="Ваш email" required></input>
                <input onKeyDown={blockInvalidChar} className="form-control mt-3" maxLength={12} minLength={12} name="phone" type="number" id="phone" pattern="+[3][7][5][0-9]{9}" placeholder="375123456789" required></input>
                <NavPassword
                    styleElem="mt-3"
                    name="password"
                    placeholder="Пароль"
                    minLength={8}
                    maxLength={16}
                    required
                />
                <NavPassword
                    styleElem="mt-3"
                    name="repeat_password"
                    placeholder="Подтвердить пароль"
                    minLength={8}
                    maxLength={16}
                    required
                />
                <div className="form-controls w-100 text-center mt-4">
                    <button className="btn btn-submit btn-dark col-12 text-center" type="submit">Зарегистрироваться</button>
                </div>
            </form>
            <div className="wrapper-reg-login d-flex flex-wrap justify-content-center align-items-start col-12 mt-3">
                <div style={{fontWeight: 300}} className="text-secondary fs-6">У вас уже есть учетная запись?</div>
                <div onClick={() => setStage("login")} style={{cursor: "pointer", fontWeight: 600}} className="ms-1 fs-6">Войти</div>
            </div>
        </div>
    )
}

export default AuthReg;