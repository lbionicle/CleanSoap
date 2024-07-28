import { useEffect, useState } from "react";
import "./appOrder.scss";

import card from "../../resources/icons/form-card.svg";
import cashIn from "../../resources/icons/form-cashIn.svg";

const AppOrder = () => {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [dates, setDates] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const getFormattedDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

    useEffect(() => {
        const today = new Date();
        const weekLater = new Date(today);
        weekLater.setDate(today.getDate() + 7);

        setDate(getFormattedDate(today))
    
        const dateArray = [];
        for (let d = new Date(today); d <= weekLater; d.setDate(d.getDate() + 1)) {
          dateArray.push(new Date(d));
        }
        setDates(dateArray);
      }, []);

    const handlePaymentChange = (method) => {
        setPaymentMethod(method);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date();
        const selectedDate = new Date(`${date}T${time}`);
        if (selectedDate < now) {
            alert("Выбранная дата и время не могут быть в прошлом.");
            return;
        }
        // Add logic to handle form submission
    };

    const renderTimes = () => {
        const times = [];

        for (let time = 6 * 60; time <= 22 * 60; time += 30) {
            const hours = Math.floor(time / 60).toString().padStart(2, '0');
            const minutes = (time % 60).toString().padStart(2, '0');
            times.push(`${hours}:${minutes}`);
          }

        const items = times.map(item => {
            return <div onClick={() => setTime(item)} className={`time-slot col-3 col-lg-2 p-2 ${item === time ? "selected" : ""}`}>{item}</div>
        })

        return (
            <div style={{padding: ".375em 0"}} class="d-flex flex-wrap justify-content-center w-100">
                {items}
            </div>
        )
    }

    return (
        <div className="booking-form col-12">
            <div className="d-flex flex-column justify-content-center align-items-center booking-form-wrapper col-11 mx-auto">
                <h3 style={{ fontWeight: 600, paddingBottom: "1.5rem" }}>Введите данные</h3>
                <form id="booking" className="mx-auto col-12 col-lg-8 col-xxl-4" onSubmit={handleSubmit}>
                    <div className="col-12 my-2">
                        <label htmlFor="form-street">Улица <span className="text-danger">*</span></label>
                        <input id="form-street" name="form-street" className="form-control" type="text" placeholder="ул. Сурганова" required />
                    </div>
                    <div className="col-12 my-2">
                        <label htmlFor="form-house">Дом <span className="text-danger">*</span></label>
                        <input id="form-house" name="form-house" className="form-control" type="text" placeholder="1" required />
                    </div>
                    <div className="col-12 my-2">
                        <label htmlFor="form-flat">Квартира <span className="text-danger">*</span></label>
                        <input id="form-flat" name="form-flat" className="form-control" type="text" placeholder="1" required />
                    </div>
                    <div className="col-12 my-2">
                        <label htmlFor="form-corpus">Корпус <span className="text-danger">*</span></label>
                        <input id="form-corpus" name="form-corpus" className="form-control" type="text" placeholder="1" required />
                    </div>
                    <div className="col-12 my-2">
                        <label htmlFor="form-entrance">Подъезд <span className="text-danger">*</span></label>
                        <input id="form-entrance" name="form-entrance" className="form-control" type="text" placeholder="1" required />
                    </div>
                    <div className="col-12 my-2">
                        <label htmlFor="form-floor">Этаж <span className="text-danger">*</span></label>
                        <input id="form-floor" name="form-floor" className="form-control" type="text" placeholder="1" required />
                    </div>
                    <div className="col-12 my-2">
                        <h6 style={{fontWeight: 400}}>Дата <span className="text-danger">*</span></h6>
                        <div className="dropdown w-100 text-start">
                            <button
                            style={{border: "1px solid #ddd", margin: ".375em 0"}}
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
                                        style={{cursor: "pointer"}}
                                        className="dropdown-item"
                                        onClick={() => setDate(getFormattedDate(date))}
                                    >
                                        {getFormattedDate(date)}
                                    </div>
                                </li>
                            ))}
                            </ul>
                    </div>
                    </div>
                    <div class="col-12 my-2">
                        <h6 style={{fontWeight: 400}}>Время <span className="text-danger">*</span></h6>
                        {renderTimes([])}
                    </div>
                    <h4 style={{ fontWeight: 600 }} className="text-center mt-5">Выберите способ оплаты</h4>
                    <div className="d-flex justify-content-center mt-4">
                        <div
                            style={{ padding: "1.5rem 2.5rem" }}
                            type="button"
                            className={`d-flex justify-content-center align-items-center btn btn-origin-form col-6 col-lg-5 me-2 ${paymentMethod === 'cash' ? 'active' : ''}`}
                            onClick={() => handlePaymentChange('cash')}>
                            <img
                                className={`payment-icon ${paymentMethod === 'cash' ? 'active-icon' : ''}`}
                                height={34}
                                width={34}
                                src={cashIn}
                                alt=""
                            />Наличными
                        </div>
                        <div
                            style={{ padding: "1.5rem 2.5rem" }}
                            type="button"
                            className={`d-flex justify-content-center align-items-center btn btn-origin-form col-6 col-lg-5 ${paymentMethod === 'card' ? 'active' : ''}`}
                            onClick={() => handlePaymentChange('card')}>
                            <img
                                className={`payment-icon ${paymentMethod === 'card' ? 'active-icon' : ''}`}
                                height={34}
                                width={34}
                                src={card}
                                alt=""
                            />Картой
                        </div>
                    </div>

                    <h4 style={{ fontWeight: 600 }} className="text-center mt-5">Общая стоимость:<br /><span>0</span> BYN</h4>

                    <div className="d-flex justify-content-center text-center my-5 col-12">
                        <button type="submit" className="btn btn-origin col-11 col-lg-10">Отправить заявку</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AppOrder;