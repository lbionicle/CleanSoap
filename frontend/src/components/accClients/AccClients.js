

import "./accClients.scss"

const AccClients = () => {
    const clients = [
        {
            id: 1,
            firstName: "Мария",
            lastName: "Михайловская",
            phone: "+375292559257",
            email: "admin@gmail.com",
            password: "admin",
            status: "Не заблокирован"
        },
        {
            id: 2,
            firstName: "Алина",
            lastName: "Мелеш",
            phone: "+375292555256",
            email: "client1@gmail.com",
            password: "1111",
            status: "Не заблокирован"
        },
        {
            id: 3,
            firstName: "Виктория",
            lastName: "Невская",
            phone: "+375292555255",
            email: "client2@gmail.com",
            password: "2222",
            status: "Не заблокирован"
        },
        {
            id: 4,
            firstName: "Федор",
            lastName: "Онисенко",
            phone: "+375292555254",
            email: "client3@mail.ru",
            password: "3333",
            status: "Заблокирован"
        },
        {
            id: 5,
            firstName: "Евгений",
            lastName: "Самойлов",
            phone: "+375292555253",
            email: "client4@mail.ru",
            password: "4444",
            status: "Не заблокирован"
        }
    ];
    

    return (
        <div style={{ padding: "10rem 0 5rem 0", flex: "1 0 auto" }} className="d-flex flex-column align-items-center col-11 mx-auto">
            <input type="text" className="form-control col-12" placeholder="Введите email для поиска аккаунта клиента..." />
            <div style={{ margin: "2rem auto 4rem auto" }} className="d-flex flex-column align-items-center admin-clients col-12">
                {clients.map(({id, firstName, lastName, phone, email, password, status}) => (
                    <div key={id} className="d-flex flex-wrap justify-content-start align-items-stretch admin-clients-client text-start col-12 p-3">
                        <div className="clients-client-id col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">№</div>
                            <div className="fs-6 col-12">{id}</div>
                        </div>
                        <div className="clients-client-phone col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Телефон</div>
                            <div className="fs-6 col-12">{phone}</div>
                        </div>
                        <div className="clients-client-lastName col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Фамилия</div>
                            <div className="fs-6 col-12">{lastName}</div>
                        </div>
                        <div className="clients-client-firstName col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Имя</div>
                            <div className="fs-6 col-12">{firstName}</div>
                        </div>
                        <div className="clients-client-email col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Email</div>
                            <div className="fs-6 col-12">{email}</div>
                        </div>
                        <div className="clients-client-password col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Пароль</div>
                            <div className="fs-6 col-12">{password}</div>
                        </div>
                        <div className="clients-client-status col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Блокировка</div>
                            <div className="fs-6 col-12">{status}</div>
                        </div>
                        <div className="d-flex align-items-stretch justify-content-between clients-client-controls col-6 col-lg-8 col-xxl-1 py-2 text-center">
                            <div className="btn btn-outline-dark d-flex align-items-center justify-content-start clients-client-edit col-6 rounded-0">
                                <i className="bi fa-lg bi-pencil col-12"></i>
                            </div>
                            <div className="btn btn-outline-dark d-flex align-items-center justify-content-start clients-client-delete col-6 rounded-0">
                                <i className="bi fa-lg bi-trash3 col-12"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AccClients;