import "./accApplications.scss";

const MyApplications = () => {
    const applications = [
        {
            id: 1,
            services: "Уборка санузла, чистка ковров",
            date: "26.05.2024",
            time: "17:30",
            cost: 16,
            leadTime: 2,
            pay: "Картой",
            appStatus: "Одобрена",
            orderStatus: "В процессе"
        },
        {
            id: 2,
            services: "Мойка окон, чистка мебели",
            date: "27.05.2024",
            time: "10:00",
            cost: 20,
            leadTime: 3,
            pay: "Наличными",
            appStatus: "Не одобрена",
            orderStatus: "Отменена"
        }
    ];

    return (
        <div style={{ padding: "10rem 0 5rem 0", flex: "1 0 auto" }} className="d-flex flex-column align-items-center col-11 mx-auto">
            <input type="text" className="form-control col-12" placeholder="Введите название услуги для поиска заявки..." />
            <div style={{ margin: "2rem auto 5rem auto" }} className="d-flex flex-column align-items-center user-applications col-12">
                {applications.map(application => (
                    <div key={application.id} className="d-flex flex-wrap justify-content-start align-items-stretch user-applications-application text-start col-12 p-3">
                        <div className="applications-application-id col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 application-label">№</div>
                            <div className="fs-6 col-12">{application.id}</div>
                        </div>
                        <div className="applications-application-services col-6 col-lg-4 col-xxl-3 pe-2 pb-2">
                            <div className="fs-6 col-12 application-label">Услуги</div>
                            <div className="fs-6 col-12">{application.services}</div>
                        </div>
                        <div className="applications-application-date col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 application-label">Дата</div>
                            <div className="fs-6 col-12">{application.date}</div>
                        </div>
                        <div className="applications-application-time col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 application-label">Время</div>
                            <div className="fs-6 col-12">{application.time}</div>
                        </div>
                        <div className="applications-application-cost col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 application-label">Стоимость</div>
                            <div className="fs-6 col-12">{application.cost} BYN</div>
                        </div>
                        <div className="applications-application-leadTime col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 application-label">Время выполнения</div>
                            <div className="fs-6 col-12">{application.leadTime} мин.</div>
                        </div>
                        <div className="applications-application-pay col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 application-label">Оплата</div>
                            <div className="fs-6 col-12">{application.pay}</div>
                        </div>
                        <div className="applications-application-appStatus col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 application-label">Статус заявки</div>
                            <div className="fs-6 col-12">{application.appStatus}</div>
                        </div>
                        <div className="applications-application-orderStatus col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 application-label">Статус заказа</div>
                            <div className="fs-6 col-12">{application.orderStatus}</div>
                        </div>
                        {application.appStatus === "Не одобрена" && (
                            <div className="d-flex align-items-stretch justify-content-between applications-application-controls col-6 col-lg-12 col-xxl-1 py-2 text-center">
                                <div className="btn btn-outline-dark d-flex align-items-center justify-content-start applications-application-edit col-6 rounded-0">
                                    <i className="bi fa-lg bi-pencil col-12"></i>
                                </div>
                                <div className="btn btn-outline-dark d-flex align-items-center justify-content-start applications-application-delete col-6 rounded-0">
                                    <i className="bi fa-lg bi-trash3 col-12"></i>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const UsersApplications = () => {
    const orders = [
        {
            id: 1,
            email: "client1@gmail.com",
            date: "26.05.2024",
            time: "17:30",
            servicesCount: 2,
            totalCost: 16,
            executionTime: 2,
            paymentMethod: "Картой",
            requestStatus: "Одобрена",
            orderStatus: "Не выполнен"
        },
        {
            id: 2,
            email: "client2@gmail.com",
            date: "26.05.2024",
            time: "17:30",
            servicesCount: 2,
            totalCost: 16,
            executionTime: 2,
            paymentMethod: "Наличными",
            requestStatus: "Одобрена",
            orderStatus: "Не выполнен"
        },
        {
            id: 3,
            email: "client3@gmail.com",
            date: "26.05.2024",
            time: "17:30",
            servicesCount: 2,
            totalCost: 16,
            executionTime: 2,
            paymentMethod: "Картой",
            requestStatus: "Одобрена",
            orderStatus: "Не выполнен"
        },
        {
            id: 4,
            email: "client4@gmail.com",
            date: "26.05.2024",
            time: "17:30",
            servicesCount: 2,
            totalCost: 16,
            executionTime: 2,
            paymentMethod: "Наличными",
            requestStatus: "Одобрена",
            orderStatus: "Не выполнен"
        },
        {
            id: 5,
            email: "client5@gmail.com",
            date: "26.05.2024",
            time: "17:30",
            servicesCount: 2,
            totalCost: 16,
            executionTime: 2,
            paymentMethod: "Наличными",
            requestStatus: "Одобрена",
            orderStatus: "Не выполнен"
        },
        {
            id: 6,
            email: "client6@gmail.com",
            date: "26.05.2024",
            time: "17:30",
            servicesCount: 2,
            totalCost: 16,
            executionTime: 2,
            paymentMethod: "Наличными",
            requestStatus: "Одобрена",
            orderStatus: "Не выполнен"
        }
    ];
    

    return (
        <div style={{ padding: "10rem 0 1rem 0", flex: "1 0 auto" }} className="d-flex flex-column align-items-center col-11 mx-auto">
            <input type="text" className="form-control col-12" placeholder="Введите email для поиска заявки..." />
            <div style={{ margin: "2rem auto 4rem auto" }} className="d-flex flex-column align-items-center user-applications col-12">
                {orders.map(({id, email, date, time, servicesCount, totalCost, executionTime, paymentMethod, requestStatus, orderStatus}) => (
                    <div key={id} className="d-flex flex-wrap justify-content-start align-items-stretch user-applications-application text-start col-12 p-3">
                    <div className="applications-application-id col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                        <div className="fs-6 col-12 application-label">№</div>
                        <div className="fs-6 col-12">{id}</div>
                    </div>
                    <div className="applications-application-email col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                        <div className="fs-6 col-12 application-label">Email</div>
                        <div className="fs-6 col-12">{email}</div>
                    </div>
                    <div className="applications-application-date col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                        <div className="fs-6 col-12 application-label">Дата</div>
                        <div className="fs-6 col-12">{date}</div>
                    </div>
                    <div className="applications-application-time col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                        <div className="fs-6 col-12 application-label">Время</div>
                        <div className="fs-6 col-12">{time}</div>
                    </div>
                    <div className="applications-application-servicesCount col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                        <div className="fs-6 col-12 application-label">Количество услуг</div>
                        <div className="fs-6 col-12">{servicesCount}</div>
                    </div>
                    <div className="applications-application-totalCost col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                        <div className="fs-6 col-12 application-label">Общая стоимость</div>
                        <div className="fs-6 col-12">{totalCost} BYN</div>
                    </div>
                    <div className="applications-application-executionTime col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                        <div className="fs-6 col-12 application-label">Время выполнения</div>
                        <div className="fs-6 col-12">{executionTime} мин.</div>
                    </div>
                    <div className="applications-application-pay col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                        <div className="fs-6 col-12 application-label">Оплата</div>
                        <div className="fs-6 col-12">{paymentMethod}</div>
                    </div>
                    <div className="applications-application-requestStatus col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                        <div className="fs-6 col-12 application-label">Статус заявки</div>
                        <div className="fs-6 col-12">{requestStatus}</div>
                    </div>
                    <div className="applications-application-orderStatus col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                        <div className="fs-6 col-12 application-label">Статус заказа</div>
                        <div className="fs-6 col-12">{orderStatus}</div>
                    </div>
                    <div className="d-flex align-items-stretch justify-content-between applications-application-controls col-12 col-lg-8 col-xxl-1 py-2 text-center">
                        <div className="btn btn-outline-dark d-flex align-items-center justify-content-start applications-application-edit col-6 rounded-0">
                            <i className="bi fa-lg bi-pencil col-12"></i>
                        </div>
                        <div className="btn btn-outline-dark d-flex align-items-center justify-content-start applications-application-delete col-6 rounded-0">
                            <i className="bi fa-lg bi-trash3 col-12"></i>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export {MyApplications, UsersApplications};
