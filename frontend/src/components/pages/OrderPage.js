import { useState } from "react";
import AppFooter from "../appFooter/AppFooter"
import { MainHeader } from "../appHeader/AppHeader"
import AppOrder from "../appOrder/AppOrder";
import AppServices from "../appServices/AppServices";
import AppCheckToken from "../appCheckToken/AppCheckToken";

const OrderPage = () => {

    const [services, setServices] = useState({})

    return (
        <AppCheckToken>
            <MainHeader/>
            <Promo/>
            <AppServices orderServices={services} setOrderServices={setServices}/>
            <AppOrder services={services} orderServices={services}/>
            <AppFooter/>
        </AppCheckToken>
    )
}

const Promo = () => {

    return (
        <div style={{padding: "90px 0 0 0"}} className="booking-promo col-12">
            <div style={{padding: "4.7rem 0 0 0"}} className="booking-promo-wrapper col-11 mx-auto text-center">
                <h2 style={{fontWeight: 600, padding: "0 0 3rem 0"}}>Ваша заявка</h2>
                <p>Заполните быструю онлайн-форму, чтобы получить индивидуальное предложение на уборку</p>
            </div>
        </div>
    )
}

export default OrderPage