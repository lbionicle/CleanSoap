
const useServices = () => {
    const _apiBase = "http://45.146.166.88:1480";

    const getResources = async (url) => {
        let res = await fetch(url, {headers: new Headers({'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem("token")})});

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    const sendData = async (url, data, method) => {
        const res = await fetch(url, {
            method: method,
            body: method !== 'DELETE' ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-admin-token': localStorage.getItem("token")
            }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return method !== 'DELETE' ? await res.json() : { message: 'Удалено' };
    };

    const register = (json) => sendData(`${_apiBase}/register`, json, "POST");

    const login = (json) => sendData(`${_apiBase}/login`, json, "POST");

    const addService = (json) => sendData(`${_apiBase}/services`, json, "POST");

    const addOrder = (token, json) => sendData(`${_apiBase}/orders/${token}`, json, "POST");

    const getClientByToken = (token) => getResources(`${_apiBase}/clients/${token}`);

    const getClientById = (client_id) => getResources(`${_apiBase}/clients/id/${client_id}`);

    const getClients = () => getResources(`${_apiBase}/clients`);

    const getServices = () => getResources(`${_apiBase}/services`);

    const getOrders = () => getResources(`${_apiBase}/orders`);

    const getOrderByToken = (token) => getResources(`${_apiBase}/orders/user/${token}`);

    const getTimesByDate = (date) => getResources(`${_apiBase}/orders/times/${date}`);

    const getServiceById = (service_id) => getResources(`${_apiBase}/services/${service_id}`);

    const getRole = (token) => getResources(`${_apiBase}/role/${token}`);

    const putClientByToken = (token, json) => sendData(`${_apiBase}/clients/${token}`, json, "PUT");

    const putClientById = (client_id, blocking_status) => sendData(`${_apiBase}/clients/id/${client_id}/${blocking_status}`, {}, "PUT");

    const putServiceById = (id_service, json) => sendData(`${_apiBase}/service/${id_service}`, json, "PUT");

    const putOrderPayment = (order_id, json) => sendData(`${_apiBase}/orders/${order_id}/payment`, json, "PUT");

    const putOrderStatus = (order_id, json) => sendData(`${_apiBase}/orders/${order_id}/status`, json, "PUT");

    const deleteClientById = (client_id) => sendData(`${_apiBase}/clients/id/${client_id}`, {}, "DELETE");

    const deleteServiceById = (service_id) => sendData(`${_apiBase}/service/${service_id}`, {}, "DELETE");

    const deleteOrderById = (order_id) => sendData(`${_apiBase}/orders/${order_id}`, {}, "DELETE");

    const exportReport = async () => {
        const response = await fetch(`${_apiBase}/report`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
                'x-admin-token': localStorage.getItem("token")
            }
        });

        if (!response.ok) {
            throw new Error('Could not fetch report');
        }

        const blob = await response.blob();
        return blob;
    };

    return {
        _apiBase,
        login,
        register,
        addService,
        addOrder,
        getClientByToken,
        getClients,
        getServices,
        getOrders,
        getClientById,
        getServiceById,
        getRole,
        putClientByToken,
        putClientById,
        putOrderPayment,
        putOrderStatus,
        getOrderByToken,
        getTimesByDate,
        putServiceById,
        deleteClientById,
        deleteServiceById,
        deleteOrderById,
        exportReport
    };
};

export default useServices;