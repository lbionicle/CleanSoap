import { useEffect, useState } from "react"
import NavPassword from "../navPassword/NavPassword"

import "./formPersonal.scss"
import useServices from "../../services/Service"

const FormPersonal = ({onError}) => {
    const { getClientByToken, putClientByToken } = useServices();
    const token = localStorage.getItem("token");

    const [userInfo, setUserInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        repeat_password: ""
    });

    useEffect(() => {
        if (userInfo.email === "") {
            getClientByToken(token)
            .then(user =>
                setUserInfo({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    password: user.password,
                    repeat_password: user.repeat_password
                })
            )
        }
    }, [getClientByToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = userInfo
        data.phone = data.phone.replace("+", "")

        putClientByToken(token, data)
            .then(response => {
                if (!response.detail) {
                    setUserInfo({
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                        password: "",
                        repeat_password: ""
                    })
                } else {
                    onError(response.detail);
                }
            }).catch(error => {
                onError({ errorHeader: "Ошибка", errorMessage: "Что-то пошло не так" });
            });
    };

    return (
        <div className="d-flex flex-column justify-conttent-center align-items-center text-start col-12 col-lg-8 col-xl-5 col-xxl-4">
            <div className="col-12 fs-3 text-center" style={{ fontWeight: 600 }}>Редактирование данных</div>
            <form id="authLogin" className="wrapper-reg-form col-12 my-4" onSubmit={handleSubmit}>
                <div className="col-12 my-2">
                    <label htmlFor="form-firstName">Имя <span className="text-danger">*</span></label>
                    <input
                        id="form-firstName"
                        name="first_name"
                        className="form-control"
                        type="text"
                        placeholder="Иван"
                        value={userInfo.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-12 my-2">
                    <label htmlFor="form-lastName">Фамилия <span className="text-danger">*</span></label>
                    <input
                        id="form-lastName"
                        name="last_name"
                        className="form-control"
                        type="text"
                        placeholder="Иванов"
                        value={userInfo.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-12 my-2">
                    <label htmlFor="form-email">Почта <span className="text-danger">*</span></label>
                    <input
                        id="form-email"
                        name="email"
                        className="form-control"
                        type="text"
                        placeholder="example@gmail.com"
                        value={userInfo.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-12 my-2">
                    <label htmlFor="form-telephone">Номер телефона <span className="text-danger">*</span></label>
                    <input
                        id="form-telephone"
                        name="phone"
                        className="form-control"
                        pattern="+[3][7][5][0-9]{9}"
                        type="text"
                        maxLength={13}
                        minLength={12}
                        placeholder="+375123456789"
                        value={userInfo.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-12 my-2">
                    <label htmlFor="form-password">Пароль <span className="text-danger">*</span></label>
                    <NavPassword
                        id="form-password"
                        styleElem="mt-1"
                        name="password"
                        placeholder="Пароль"
                        minLength={8}
                        maxLength={16}
                        value={userInfo.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-12 my-2">
                    <label htmlFor="form-submit-password">Подтвердить пароль <span className="text-danger">*</span></label>
                    <NavPassword
                        id="form-submit-password"
                        styleElem="mt-1"
                        name="repeat_password"
                        placeholder="Подтвердить пароль"
                        minLength={8}
                        maxLength={16}
                        value={userInfo.repeat_password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-controls w-100 text-center mt-4">
                    <button className="btn btn-submit btn-origin col-12 text-center" type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default FormPersonal
