
import NavPassword from "../navPassword/NavPassword"

import "./formPersonal.scss"

const FormPersonal = () => {

    return (
        <div className="d-flex flex-column justify-conttent-center align-items-center text-start col-12 col-lg-8 col-xl-5 col-xxl-4">
            <div className="col-12 fs-3 text-center" style={{fontWeight: 600}}>Редактирование данных</div>
            <form id="authLogin" className="wrapper-reg-form col-12 my-4" action="">
                <div className="col-12 my-2">
                    <label htmlFor="form-firstName">Имя <span className="text-danger">*</span></label>
                    <input id="form-firstName" name="firstName" className="form-control" type="text" placeholder="Иван" required />
                </div>
                <div className="col-12 my-2">
                    <label htmlFor="form-lastName">Фамилия <span className="text-danger">*</span></label>
                    <input id="form-lastName" name="lastName" className="form-control" type="text" placeholder="Иванов" required />
                </div>
                <div className="col-12 my-2">
                    <label htmlFor="form-email">Почта <span className="text-danger">*</span></label>
                    <input id="form-email" name="email" className="form-control" type="text" placeholder="example@gmail.com" required />
                </div>
                <div className="col-12 my-2">
                    <label htmlFor="form-telephone">Номер телефона <span className="text-danger">*</span></label>
                    <input id="form-telephone" name="telephone" className="form-control" pattern="+[3][7][5][0-9]{9}" type="number" placeholder="+375123456789" required />
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
                        required
                    />                
                </div>
                <div className="col-12 my-2">
                    <label htmlFor="form-submit-password">Подтвердить пароль <span className="text-danger">*</span></label>
                    <NavPassword
                        id="form-submit-password"
                        styleElem="mt-1"
                        name="submit-password"
                        placeholder="Подтвердить пароль"
                        minLength={8}
                        maxLength={16}
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