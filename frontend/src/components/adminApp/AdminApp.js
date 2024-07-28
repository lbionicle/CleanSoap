import { useEffect, useRef, useState } from "react";
import "./adminApp.scss";
import Spinner from "../spinner/Spinner";
import useServices from "../../services/Service";

const AdminApp = ({onError}) => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterOrderStatus, setFilterOrderStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [reqStatus, setReqStatus] = useState("");
    const [ordStatus, setOrdStatus] = useState("");
    const [loading, setLoading] = useState(true);

    const { getOrders, deleteOrderById, putOrderStatus } = useServices();

    useEffect(() => {
        if (orders.length === 0) {
            onRequest();
        }
    }, []);

    useEffect(() => {
        filterOrders();
    }, [searchTerm, filterStatus, filterOrderStatus, orders]);

    const filterOrders = () => {
        let updatedOrders = [...orders];

        if (searchTerm) {
            updatedOrders = updatedOrders.filter(order =>
                order.phone.includes(searchTerm)
            );
        }

        if (filterStatus !== "all") {
            updatedOrders = updatedOrders.filter(order =>
                order.request_status.toLowerCase() === filterStatus.toLowerCase()
            );
        }

        if (filterOrderStatus !== "all") {
            updatedOrders = updatedOrders.filter(order =>
                order.order_status.toLowerCase() === filterOrderStatus.toLowerCase()
            );
        }

        setFilteredOrders(updatedOrders);
    };

    const onRequest = async () => {
        const response = await getOrders();
        if (!response.detail) {
            setOrders(response);
            setFilteredOrders(response);
            setLoading(false);
        } else {
            onError(response.detail)
        }
    };

    const handleEditClick = (id) => {
        setEditingId(id);
    };

    const handleChange = (e) => {
        e.target.name === "orderStatus" ? setOrdStatus(e.target.value) : setReqStatus(e.target.value);
    };

    const handleCancelClick = () => {
        setEditingId(null);
    };

    const handleSubmitClick = (id) => {
        putOrderStatus(id, {request_status: reqStatus, order_status: ordStatus})
            .then((response) => {
                if (!response.detail) {
                    setLoading(true);
                    setEditingId(null);
                    onRequest();
                } else {
                    onError(response.detail)
                }
            })
    };

    const handleFilterChange = (e) => {
        if (e.target.name === "filterStatus") {
            setFilterStatus(e.target.value);
        } else {
            setFilterOrderStatus(e.target.value);
        }
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

    const handleDeleteClick = (id) => {
        deleteOrderById(id)
            .then((response) => {
                if(!response.detail) {
                    setLoading(true)
                    onRequest();
                } else {
                    onError(response.detail)
                }
            })
    }

    return (
        <div style={{ padding: "10rem 0 1rem 0", flex: "1 0 auto" }} className="d-flex flex-column align-items-center col-11 mx-auto">
            <input
                type="text"
                className="form-control col-12"
                placeholder="Введите телефон для поиска заявки..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={orders.length === 0}
            />
            <div className="d-flex align-items-center justify-content-between col-12 mt-2 mb-3">
                <div className="filter-request col-5 col-xxl-4">
                    <div>Статус заявки</div>
                    <select
                        name="filterStatus"
                        onChange={handleFilterChange}
                        className="form-select rounded-2 p-1"
                        aria-label="Default select"
                        disabled={orders.length === 0}
                    >
                        <option value="all">Все</option>
                        <option value="в рассмотрении">В рассмотрении</option>
                        <option value="не одобрена">Не одобрена</option>
                        <option value="одобрена">Одобрена</option>
                    </select>
                </div>
                <div className="filter-order col-5 col-xxl-4">
                    <div>Статус заказа</div>
                    <select
                        name="filterOrderStatus"
                        onChange={handleFilterChange}
                        className="form-select rounded-2 p-1"
                        aria-label="Default select"
                        disabled={orders.length === 0}
                    >
                        <option value="all">Все</option>
                        <option value="в процессе">В процессе</option>
                        <option value="отменена">Отменена</option>
                        <option value="выполнена">Выполнена</option>
                    </select>
                </div>
            </div>
            <div style={{ margin: "0 auto 4rem auto" }} className="d-flex flex-column align-items-center user-applications col-12">
                {loading ? (
                    <Spinner />
                ) : (
                    filteredOrders.length === 0 ? (
                        <div style={{ fontWeight: 500 }} className="col-12 text-center fs-4">Список заявок пуст</div>
                    ) : (
                        filteredOrders.map(({ id_order, phone, date, time, services, payment, request_status, order_status }) => (
                            <div key={id_order} className="d-flex flex-wrap justify-content-start align-items-stretch user-applications-application text-start col-12 p-3">
                                <div className="applications-application-id col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">№</div>
                                    <div className="fs-6 col-12">{id_order}</div>
                                </div>
                                <div className="applications-application-email col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">Моб.тел</div>
                                    <div className="fs-6 col-12"><a style={{textDecoration: 'underline'}} href={`tel: +${phone}`}>+{getHighlightedText(phone, searchTerm)}</a></div>
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
                                    <div className="fs-6 col-12">{Object.keys(services).length}</div>
                                </div>
                                <div className="applications-application-totalCost col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">Общая стоимость</div>
                                    <div className="fs-6 col-12">{Object.values(services).reduce((total, service) => total + service.price, 0)} BYN</div>
                                </div>
                                <div className="applications-application-executionTime col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">Время выполнения</div>
                                    <div className="fs-6 col-12">{Object.values(services).reduce((total, service) => total + service.runtime, 0)} мин.</div>
                                </div>
                                <div className="applications-application-pay col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                    <div className="fs-6 col-12 application-label">Оплата</div>
                                    <div className="fs-6 col-12">{payment}</div>
                                </div>
                                <div className="d-flex flex-wrap col-12 col-lg-8 col-xxl-3">
                                    <div className="applications-application-requestStatus col-6 pe-2 pb-2">
                                        {editingId === id_order ? (
                                            <>
                                                <div className="fs-6 col-12 application-label">Статус заявки</div>
                                                <select name="requestStatus" value={reqStatus} onChange={handleChange} className="form-select col-12 p-1">
                                                    <option value="В рассмотрении">В рассмотрении</option>
                                                    <option value="Одобрена">Одобрена</option>
                                                    <option value="Не одобрена">Не одобрена</option>
                                                </select>
                                            </>
                                        ) : (
                                            <>
                                                <div className="fs-6 col-12 application-label">Статус заявки</div>
                                                <div className="fs-6 col-12">{request_status}</div>
                                            </>
                                        )}
                                    </div>
                                    <div className="applications-application-orderStatus col-6 pe-2 pb-2">
                                        {editingId === id_order ? (
                                            <>
                                                <div className="fs-6 col-12 application-label">Статус заказа</div>
                                                <select name="orderStatus" value={ordStatus} onChange={handleChange} className="form-select col-12 p-1">
                                                    <option value="В процессе">В процессе</option>
                                                    <option value="Выполнена">Выполнена</option>
                                                    <option value="Отменён">Отменён</option>
                                                </select>
                                            </>
                                        ) : (
                                            <>
                                                <div className="fs-6 col-12 application-label">Статус заказа</div>
                                                <div className="fs-6 col-12">{order_status}</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex align-items-stretch justify-content-between applications-application-controls col-12 col-lg-8 col-xxl-1 py-2 text-center">
                                    {editingId === id_order ? (
                                        <>
                                            <div onClick={() => handleSubmitClick(id_order)} style={{ borderRight: "none" }} className="btn btn-success d-flex align-items-center justify-content-start applications-application-edit col-6 rounded-0">
                                                <i className="bi fa-lg bi-check2 col-12"></i>
                                            </div>
                                            <div onClick={() => { handleCancelClick(id_order) }} className="btn btn-danger d-flex align-items-center justify-content-start applications-application-delete col-6 rounded-0">
                                                <i className="bi fa-lg bi-x-lg col-12"></i>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div onClick={() => handleEditClick(id_order)} style={{ borderRight: "none" }} className="btn btn-outline-dark d-flex align-items-center justify-content-start applications-application-edit col-6 rounded-0">
                                                <i className="bi fa-lg bi-pencil col-12"></i>
                                            </div>
                                            <div onClick={() => handleDeleteClick(id_order)} className="btn btn-outline-dark d-flex align-items-center justify-content-start applications-application-delete col-6 rounded-0">
                                                <i className="bi fa-lg bi-trash3 col-12"></i>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default AdminApp;
