
import "./accServices.scss"

const AccServices = () => {
    const services = [
        {
            id: 1,
            serviceName: "Уборка помещений",
            cost: 6,
            executionTime: 0.213
        },
        {
            id: 2,
            serviceName: "Уборка санузлов",
            cost: 5,
            executionTime: 0.213
        },
        {
            id: 3,
            serviceName: "Мойка окон",
            cost: 3,
            executionTime: 0.213
        },
        {
            id: 4,
            serviceName: "Чистка ковров",
            cost: 2,
            executionTime: 0.213
        },
        {
            id: 5,
            serviceName: "Чистка мебели",
            cost: 3,
            executionTime: 0.213
        },
        {
            id: 6,
            serviceName: "Генеральная уборка",
            cost: 4,
            executionTime: 0.213
        }
    ];
    

    return (
        <div style={{ padding: "10rem 0 5rem 0", flex: "1 0 auto" }} className="d-flex flex-column align-items-center col-11 mx-auto">
            <input type="text" className="form-control col-12" placeholder="Введите email для поиска аккаунта клиента..." />
            <div style={{fontWeight: 500}} className="btn btn-outline-dark col-12 my-4">Добавить услугу</div>
            <div style={{ margin: "0 auto 5rem auto" }} className="d-flex flex-column align-items-center admin-services col-12">
                {services.map(({id, serviceName, cost, executionTime}) => (
                    <div key={id} className="d-flex flex-wrap justify-content-start align-items-center admin-services-service text-start col-12 p-3">
                        <div className="services-service-id col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">№</div>
                            <div className="fs-6 col-12">{id}</div>
                        </div>
                        <div className="services-service-serviceName col-6 col-lg-4 col-xxl-4 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Название услуги</div>
                            <div className="fs-6 col-12">{serviceName}</div>
                        </div>
                        <div className="services-service-cost col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Стоимость</div>
                            <div className="fs-6 col-12">{cost}</div>
                        </div>
                        <div className="services-service-executionTime col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Время выполнения</div>
                            <div className="fs-6 col-12">{executionTime}</div>
                        </div>
                        <div className="d-flex align-items-stretch justify-content-between services-service-controls col-12 col-lg-8 col-xxl-3 py-2 text-center">
                            <div className="btn btn-outline-dark d-flex align-items-center justify-content-start services-service-edit col-6 rounded-0">
                                <i className="bi fa-lg bi-pencil col-12"></i>
                            </div>
                            <div className="btn btn-outline-dark d-flex align-items-center justify-content-start services-service-delete col-6 rounded-0">
                                <i className="bi fa-lg bi-trash3 col-12"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    </div>
    )
}

export default AccServices