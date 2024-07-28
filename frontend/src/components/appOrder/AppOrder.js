import { useEffect, useState } from "react";
import "./appOrder.scss";

import card from "../../resources/icons/form-card.svg";
import cashIn from "../../resources/icons/form-cashIn.svg";
import useServices from "../../services/Service";

const AppOrder = ({services, orderServices}) => {
    const [paymentMethod, setPaymentMethod] = useState('Наличными');
    const [dates, setDates] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [bookedTimes, setBookedTimes] = useState([]);
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [corpsNumber, setCorpsNumber] = useState('');
    const [entranceNumber, setEntranceNumber] = useState('');
    const [floorNumber, setFloorNumber] = useState('');

    const [streetError, setStreetError] = useState('');

    const token = localStorage.getItem("token")

    const { getTimesByDate, addOrder } = useServices();

    const getFormattedDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const checkFreeTimes = (date) => {
        getTimesByDate(getFormattedDate(date)).then(response => {
            setBookedTimes(response);
            setFirstFreeTime(response);
        });
    }

    const setFirstFreeTime = (bookedTimes) => {
        const times = generateTimes();
        for (let item of times) {
            if (!bookedTimes.includes(item)) {
                setTime(item);
                break;
            }
        }
    };

    const generateTimes = () => {
        const times = [];
        for (let time = 6 * 60; time <= 22 * 60; time += 30) {
            const hours = Math.floor(time / 60).toString().padStart(2, '0');
            const minutes = (time % 60).toString().padStart(2, '0');
            times.push(`${hours}:${minutes}`);
        }
        return times;
    };

    useEffect(() => {
        const today = new Date();
        const weekLater = new Date(today);
        weekLater.setDate(today.getDate() + 7);

        const formattedToday = getFormattedDate(today);
        setDate(formattedToday);

        checkFreeTimes(today);

        const dateArray = [];
        for (let d = new Date(today); d <= weekLater; d.setDate(d.getDate() + 1)) {
            dateArray.push(new Date(d));
        }
        setDates(dateArray);
    }, []);

    const handlePaymentChange = (method) => {
        setPaymentMethod(method);
    };

    const validateStreet = (street) => {
        const streetPattern = /^ул\. [А-Яа-яЁё]+$/;
        return streetPattern.test(street);
    }

    const handleStreetChange = (e) => {
        const value = e.target.value;
        setStreet(value);

        if (!validateStreet(value)) {
            setStreetError('Введите улицу в правильном формате, например, ул. Сурганова');
        } else {
            setStreetError('');
        }
    }

    const handleFieldChange = (field, setValue) => (e) => {
        const value = e.target.value === '-' ? '0' : e.target.value;
        setValue(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (streetError) return;

        const formData = {
            street: street,
            house_number: houseNumber === '' ? '0' : houseNumber,
            apartment_number: apartmentNumber === '' ? '0' : apartmentNumber,
            corps_number: corpsNumber === '' ? '0' : corpsNumber,
            entrance_number: entranceNumber === '' ? '0' : entranceNumber,
            floor_number: floorNumber === '' ? '0' : floorNumber,
        };

        addOrder(token, { address: formData, date: date, time: time, services: orderServices, payment: paymentMethod })
            .then(response => {
                const today = new Date();
                const formattedToday = getFormattedDate(today);
                setDate(formattedToday);
                setTime('');
                setPaymentMethod('Наличными');
                getTimesByDate(formattedToday).then(response => {
                    setBookedTimes(response);
                    setFirstFreeTime(response);
                });
                e.target.reset();
            });
    };

    const renderTimes = () => {
        const times = generateTimes();

        const items = times.map(item => (
            <div key={item} onClick={() => setTime(item)} className={`time-slot col-3 col-lg-2 p-2 ${item === time ? "selected" : (bookedTimes.includes(item) ? "disabled" : "")}`}>
                {item}
            </div>
        ));

        return (
            <div style={{ padding: ".375em 0" }} className="d-flex flex-wrap justify-content-center w-100">
                {items}
            </div>
        );
    };

    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

    return (
        <div className="booking-form col-12">
            <div className="d-flex flex-column justify-content-center align-items-center booking-form-wrapper col-11 mx-auto">
                <h3 style={{ fontWeight: 600, paddingBottom: "1.5rem" }}>Введите данные</h3>
                <form id="booking" className="mx-auto col-12 col-lg-8 col-xxl-4" onSubmit={handleSubmit}>
                    <div className="col-12 my-2">
                        <label htmlFor="form-street">Улица <span className="text-danger">*</span></label>
                        <input 
                            id="form-street" 
                            name="street" 
                            className={`form-control ${streetError ? 'is-invalid' : (street && !streetError ? 'is-valid' : '')}`} 
                            type="text" 
                            placeholder="ул. Сурганова" 
                            value={street}
                            onChange={handleStreetChange}
                            required 
                        />                
                        {streetError && <div className="invalid-feedback">{streetError}</div>}    
                    </div>
                    <div className="col-12 my-2">
                        <label htmlFor="form-house">Дом</label>
                        <input 
                            onKeyDown={blockInvalidChar} 
                            id="form-house" 
                            name="house_number" 
                            className="form-control" 
                            type="number" 
                            placeholder="X" 
                            value={houseNumber}
                            onChange={handleFieldChange('houseNumber', setHouseNumber)}
                        />
                    </div>
                    <div className="col-12 my-2">
                        <label htmlFor="form-flat">Квартира</label>
                        <input 
                            onKeyDown={blockInvalidChar} 
                            id="form-flat" 
                            name="apartment_number" 
                            className="form-control" 
                            type="number" 
                            placeholder="X" 
                            value={apartmentNumber}
                            onChange={handleFieldChange('apartmentNumber', setApartmentNumber)}
                        />
                    </div>
                    <div className="col-12 my-2">
                        <label htmlFor="form-corpus">Корпус</label>
                        <input 
                            onKeyDown={blockInvalidChar} 
                            id="form-corpus" 
                            name="corps_number" 
                            className="form-control" 
                            type="number" 
                            placeholder="X" 
                            value={corpsNumber}
                            onChange={handleFieldChange('corpsNumber', setCorpsNumber)}
                        />
                    </div>
                    <div className="col-12 my-2">
                        <label htmlFor="form-entrance">Подъезд</label>
                        <input 
                            onKeyDown={blockInvalidChar} 
                            id="form-entrance" 
                            name="entrance_number" 
                            className="form-control" 
                            type="number" 
                            placeholder="X" 
                            value={entranceNumber}
                            onChange={handleFieldChange('entranceNumber', setEntranceNumber)}
                        />
                    </div>
                    <div className="col-12 my-2">
                        <label htmlFor="form-floor">Этаж</label>
                        <input 
                            onKeyDown={blockInvalidChar} 
                            id="form-floor" 
                            name="floor_number" 
                            className="form-control" 
                            type="number" 
                            placeholder="X" 
                            value={floorNumber}
                            onChange={handleFieldChange('floorNumber', setFloorNumber)}
                        />
                    </div>
                    <div className="col-12 my-2">
                        <h6 style={{ fontWeight: 400 }}>Дата <span className="text-danger">*</span></h6>
                        <div className="dropdown w-100 text-start">
                            <button
                                style={{ border: "1px solid #ddd", margin: ".375em 0" }}
                                className="btn btn-white dropdown-toggle col-12 text-start"
                                type="button"
                                id="dateDropdownButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {date}
                            </button>
                            <ul className="dropdown-menu col-12" aria-labelledby="dateDropdownButton">
                                {dates.map((date, index) => (
                                    <li key={index}>
                                        <div
                                            style={{ cursor: "pointer" }}
                                            className="dropdown-item"
                                            onClick={() => { setDate(getFormattedDate(date)); checkFreeTimes(date); }}
                                        >
                                            {getFormattedDate(date)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 my-2">
                        <h6 style={{ fontWeight: 400 }}>Время <span className="text-danger">*</span></h6>
                        {renderTimes()}
                    </div>
                    <h4 style={{ fontWeight: 600 }} className="text-center mt-5">Выберите способ оплаты</h4>
                    <div className="d-flex justify-content-center mt-4">
                        <div
                            style={{ padding: "1.5rem 2.5rem" }}
                            type="button"
                            className={`d-flex justify-content-center align-items-center btn btn-origin-form col-6 col-lg-5 me-2 ${paymentMethod === 'Наличными' ? 'active' : ''}`}
                            onClick={() => handlePaymentChange('Наличными')}>
                            <img
                                className={`payment-icon ${paymentMethod === 'Наличными' ? 'active-icon' : ''}`}
                                height={34}
                                width={34}
                                src={cashIn}
                                alt=""
                            />Наличными
                        </div>
                        <div
                            style={{ padding: "1.5rem 2.5rem" }}
                            type="button"
                            className={`d-flex justify-content-center align-items-center btn btn-origin-form col-6 col-lg-5 ${paymentMethod === 'Картой' ? 'active' : ''}`}
                            onClick={() => handlePaymentChange('Картой')}>
                            <img
                                className={`payment-icon ${paymentMethod === 'Картой' ? 'active-icon' : ''}`}
                                height={34}
                                width={34}
                                src={card}
                                alt=""
                            />Картой
                        </div>
                    </div>

                    <div style={{ fontWeight: 600 }} className="text-center mt-5 fs-4">Общая стоимость:<br /><span>{orderServices.length === 0 ? 0 : Object.values(orderServices).reduce((prev, curr) => prev + curr.price, 0)}</span> BYN</div>

                    <div className="d-flex justify-content-center text-center my-5 col-12">
                        <button type="submit" className={`btn btn-origin col-11 col-lg-10 ${street && !streetError && Object.keys(services).length !== 0 ? "" : "disabled"}`}>Отправить заявку</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AppOrder;
