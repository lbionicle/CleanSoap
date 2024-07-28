import { useEffect, useState } from "react";
import "./myApp.scss";
import Spinner from "../spinner/Spinner";
import useServices from "../../services/Service";

const MyApp = ({onError}) => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [pay, setPay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const token = localStorage.getItem("token");

    const { getOrderByToken, putOrderPayment, deleteOrderById } = useServices();

    useEffect(() => {
        onRequest();
    }, []);

    useEffect(() => {
        filterApplications();
    }, [searchTerm, applications]);

    const onRequest = () => {
        getOrderByToken(token).then(response => {
            if(!response.detail) {
                setApplications(response);
                setLoading(false);
            } else {
                onError(response.detail)
            }
        });
    };

    const filterApplications = () => {
        const filtered = applications.filter(app => {
            const services = Object.keys(app.services).join(", ").toLowerCase();
            return services.includes(searchTerm.toLowerCase());
        });
        setFilteredApplications(filtered);
    };

    const handleEditClick = (id_order, payment) => {
        setEditingId(id_order);
        setPay(payment);
    };

    const handleChange = (e) => {
        setPay(e.target.value);
    };

    const handleCancelClick = () => {
        setEditingId(null);
    };

    const handleSubmitClick = (id_order) => {
        putOrderPayment(id_order, {payment: pay})
            .then(response => {
                if(!response.detail) {
                    setEditingId(null);
                    setLoading(true);
                    onRequest();
                } else {
                    onError(response.detail)
                }
            })
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'i'));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} style={{ backgroundColor: 'orange' }}>{part}</span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const handleDeleteClick = (id) => {
        deleteOrderById(id)
            .then(response => {
                if(!response.detail) {
                    setLoading(true);
                    onRequest();
                } else {
                    onError(response.detail)
                }
            })
    }

    return (
        <div style={{ padding: "10rem 0 5rem 0", flex: "1 0 auto" }} className="d-flex flex-column align-items-center col-11 mx-auto">
            <input 
                type="text" 
                className="form-control col-12" 
                placeholder="Введите название услуги для поиска заявки..." 
                value={searchTerm}
                onChange={handleSearchChange}
                disabled={applications.length === 0}
            />
            <div style={{ margin: "2rem auto 5rem auto" }} className="d-flex flex-column align-items-center user-applications col-12">
                {loading ? (
                    <Spinner />
                ) : (
                    filteredApplications.length === 0 ? (
                        <div style={{ fontWeight: 500 }} className="col-12 text-center fs-4">Список заявок пуст</div>
                    ) : (
                        filteredApplications.map(({ id_order, services, date, time, payment, request_status, order_status }) => (
                            <div key={id_order} className="d-flex flex-wrap justify-content-start align-items-stretch user-applications-application text-start col-12 p-3">
                                <div className="applications-application-id col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">№</div>
                                    <div className="fs-6 col-12">{id_order}</div>
                                </div>
                                <div className="applications-application-services col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">Услуги</div>
                                    <div className="fs-6 col-12">{getHighlightedText(Object.keys(services).map(service => capitalizeFirstLetter(service)).join(", "), searchTerm)}</div>
                                </div>
                                <div className="applications-application-date col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">Дата</div>
                                    <div className="fs-6 col-12">{date}</div>
                                </div>
                                <div className="applications-application-time col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">Время</div>
                                    <div className="fs-6 col-12">{time}</div>
                                </div>
                                <div className="applications-application-cost col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">Стоимость</div>
                                    <div className="fs-6 col-12">{Object.values(services).reduce((prev, curr) => prev + curr.price, 0)} BYN</div>
                                </div>
                                <div className="applications-application-leadTime col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">Время выполнения</div>
                                    <div className="fs-6 col-12">{Object.values(services).reduce((prev, curr) => prev + curr.runtime, 0)} мин.</div>
                                </div>
                                <div className="applications-application-pay col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    {editingId === id_order ? (
                                        <>
                                            <div className="fs-6 col-12 application-label">Оплата</div>
                                            <select name="pay" value={pay} onChange={handleChange} className="form-select col-12 p-1">
                                                <option value="Наличными">Наличными</option>
                                                <option value="Картой">Картой</option>
                                            </select>
                                        </>
                                    ) : (
                                        <>
                                            <div className="fs-6 col-12 application-label">Оплата</div>
                                            <div className="fs-6 col-12">{payment}</div>
                                        </>
                                    )}
                                </div>
                                <div className="d-flex flex-wrap col-12 col-lg-8 col-xxl-3">
                                    <div className="applications-application-appStatus col-6 pe-2 pb-2">
                                        <div className="fs-6 col-12 application-label">Статус заявки</div>
                                        <div className="fs-6 col-12">{request_status}</div>
                                    </div>
                                    <div className="applications-application-orderStatus col-6 pe-2 pb-2">
                                        <div className="fs-6 col-12 application-label">Статус заказа</div>
                                        <div className="fs-6 col-12">{order_status}</div>
                                    </div>
                                </div>
                                {request_status === "В рассмотрении" && (
                                    <div className="d-flex align-items-stretch justify-content-between applications-application-controls col-12 col-xxl-1 py-2 text-center">
                                        {editingId === id_order ? (
                                            <>
                                                <div onClick={() => handleSubmitClick(id_order)} style={{ borderRight: "none" }} className="btn btn-success d-flex align-items-center justify-content-start applications-application-edit col-6 rounded-0">
                                                    <i className="bi fa-lg bi-check2 col-12"></i>
                                                </div>
                                                <div onClick={() => handleCancelClick(id_order)} className="btn btn-danger d-flex align-items-center justify-content-start applications-application-delete col-6 rounded-0">
                                                    <i className="bi fa-lg bi-x-lg col-12"></i>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div onClick={() => handleEditClick(id_order, payment)} style={{ borderRight: "none" }} className="btn btn-outline-dark d-flex align-items-center justify-content-start applications-application-edit col-6 rounded-0">
                                                    <i className="bi fa-lg bi-pencil col-12"></i>
                                                </div>
                                                <div onClick={() => handleDeleteClick(id_order)} className="btn btn-outline-dark d-flex align-items-center justify-content-start applications-application-edit col-6 rounded-0">
                                                    <i className="bi fa-lg bi-trash3 col-12"></i>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default MyApp;
