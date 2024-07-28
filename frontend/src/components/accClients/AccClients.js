import { useEffect, useState } from "react";
import "./accClients.scss";
import useServices from "../../services/Service";
import Spinner from "../spinner/Spinner";

const AccClients = ({onError}) => {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [blockedStatus, setBlockedStatus] = useState("");
    const [loading, setLoading] = useState(true)
    
    const {getClients, putClientById, deleteClientById} = useServices();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        getClients()
        .then(data => {
            setClients(data)
            setLoading(false)
        })
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEditClick = (id, currentStatus) => {
        setEditingId(id);
        setBlockedStatus(currentStatus);
    };

    const handleBlockedStatusChange = (e) => {
        setBlockedStatus(e.target.value === "Заблокирован" ? true : false);
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setBlockedStatus("");
    };

    const handleSubmitClick = (id) => {

        putClientById(id, blockedStatus)
            .then((response) => {
                if(!response.detail) {
                    setLoading(true)
                    onRequest();
                    setEditingId(null);
                    setBlockedStatus("");
                } else {
                    onError(response.detail)
                }
            }).catch(e => {
                onError({ errorHeader: "Ошибка", errorMessage: "Что-то пошло не так" });
            })
    };

    const handleDeleteClick = (id) => {

        deleteClientById(id)
            .then((response) => {
                if(!response.detail) {
                    setLoading(true)
                    onRequest();
                } else {
                    onError(response.detail)
                }
            }).catch(e => {
                onError({ errorHeader: "Ошибка", errorMessage: "Что-то пошло не так" });
            })
    }

    const filteredClients = Array.isArray(clients) ? clients.filter(client => 
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div style={{ padding: "10rem 0 5rem 0", flex: "1 0 auto" }} className="d-flex flex-column align-items-center col-11 mx-auto">
            <input
                type="text"
                className="form-control col-12"
                placeholder="Введите email для поиска аккаунта клиента..."
                value={searchTerm}
                onChange={handleSearchChange}
                disabled={clients.length > 0 ? false : true}
            />
            <div style={{ margin: "2rem auto 4rem auto" }} className="d-flex flex-column align-items-center admin-clients col-12">
                {loading ? 
                <Spinner/>
                :
                <>
                {filteredClients.length === 0 ?
                <>
                    <div style={{fontWeight: 500}} className="col-12 text-center fs-4">Список клиентов пуст</div>
                </>
                :
                <>
                {filteredClients.map(({ id_client, first_name, last_name, phone, email, password, blocking_status }, i) => (
                    <div key={id_client} className="d-flex flex-wrap justify-content-start align-items-stretch admin-clients-client text-start col-12 p-3">
                        <div className="clients-client-id col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">№</div>
                            <div className="fs-6 col-12">{id_client}</div>
                        </div>
                        <div className="clients-client-phone col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Телефон</div>
                            <div className="fs-6 col-12">{phone}</div>
                        </div>
                        <div className="clients-client-lastName col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Фамилия</div>
                            <div className="fs-6 col-12">{last_name}</div>
                        </div>
                        <div className="clients-client-firstName col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Имя</div>
                            <div className="fs-6 col-12">{first_name}</div>
                        </div>
                        <div className="clients-client-email col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Email</div>
                            <div className="fs-6 col-12">
                                {email.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, index) =>
                                    part.toLowerCase() === searchTerm.toLowerCase() ? (
                                        <span key={index} style={{ backgroundColor: 'orange' }}>{part}</span>
                                    ) : (
                                        part
                                    )
                                )}
                            </div>
                        </div>
                        <div className="clients-client-password col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Пароль</div>
                            <div className="fs-6 col-12">{password}</div>
                        </div>
                        <div className="clients-client-status col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                            <div className="fs-6 col-12 client-label">Блокировка</div>
                            {editingId === id_client ? (
                                <>
                                    <select
                                        name="status"
                                        value={blockedStatus ? "Заблокирован" : "Не заблокирован"}
                                        onChange={handleBlockedStatusChange}
                                        className="form-select col-12 p-1"
                                    >
                                        <option value="Не заблокирован">Не заблокирован</option>
                                        <option value="Заблокирован">Заблокирован</option>
                                    </select>
                                </>
                            ) : (
                                <div className="fs-6 col-12">{blocking_status ? "Заблокирован" : "Не заблокирвоан"}</div>
                            )}
                        </div>
                        <div className="d-flex align-items-stretch justify-content-between applications-application-controls col-6 col-lg-12 col-xxl-1 py-2 text-center">
                            {editingId === id_client ? (
                                <>
                                    <div
                                        onClick={() => handleSubmitClick(id_client)}
                                        style={{ borderRight: "none" }}
                                        className="btn btn-success d-flex align-items-center justify-content-start applications-application-edit col-6 rounded-0"
                                    >
                                        <i className="bi fa-lg bi-check2 col-12"></i>
                                    </div>
                                    <div
                                        onClick={handleCancelClick}
                                        className="btn btn-danger d-flex align-items-center justify-content-start applications-application-delete col-6 rounded-0"
                                    >
                                        <i className="bi fa-lg bi-x-lg col-12"></i>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        onClick={() => handleEditClick(id_client, blocking_status)}
                                        style={{ borderRight: "none" }}
                                        className="btn btn-outline-dark d-flex align-items-center justify-content-start applications-application-edit col-6 rounded-0"
                                    >
                                        <i className="bi fa-lg bi-pencil col-12"></i>
                                    </div>
                                    <div onClick={() => handleDeleteClick(id_client)} className="btn btn-outline-dark d-flex align-items-center justify-content-start applications-application-delete col-6 rounded-0">
                                        <i className="bi fa-lg bi-trash3 col-12"></i>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                </>} 
                </>}
            </div>
        </div>
    );
};

export default AccClients;
