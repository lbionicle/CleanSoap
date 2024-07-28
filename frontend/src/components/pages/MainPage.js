
import { Link } from "react-router-dom";

import AppSectors from "../appSectors/AppSectors";
import AppServices from "../appServices/AppServices";
import {MainHeader} from "../appHeader/AppHeader";
import AppFooter from "../appFooter/AppFooter";

import verification from "../../resources/icons/verification.svg";
import banner from "../../resources/img/banner.png";
import officeImage from "../../resources/img/main-aims.jpg";

const MainPage = () => {

    return (
        <>
            <MainHeader/>
            <Promo/>
            <Banner/>
            <AppSectors choiceSectors="bussines"/>
            <AppSectors choiceSectors="dwelling"/>
            <AppServices stage="main"/>
            <AboutUs/>
            <Location/>
            <AppFooter stage={"main"}/>
        </>
    )
}

const Promo = () => {
    return (
        <div style={{ padding: "90px 0 0 0" }} className="main-promo col-12">
            <div style={{ padding: "20dvh 0" }} className="main-promo-wrapper col-11 mx-auto">
                <div style={{ fontWeight: 600 }} className="promo-wrapper-banner bg-origin col-12 col-lg-6 col-xxl-4 mx-auto rounded-4 text-center fs-4 lh-2 position-relative p-5">
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <img style={{ position: 'absolute', top: '-75px' }} height={60} width={58} src={verification} alt="verification" />
                    </div>
                    <div>
                        Премиальные услуги клининга в Минске
                    </div>
                </div>
            </div>
        </div>
    )
}

const Banner = () => {
    return (
        <div style={{background: `url(${banner}) center center/cover no-repeat`, maxHeight: 500, height: 500}} className="d-flex align-items-center justify-content-center position-relative main-banner-wrapper col-12 vh-30">
            <div className="row col-11 mx-auto">
                <div style={{zIndex: 3}} className="banner-wrapper-content d-flex flex-column align-items-center justify-content-center text-center col-12">
                    <div style={{fontWeight: 600}} className="col-12 col-lg-8 col-xxl-5 fs-1">Лучшая клининговая служба Минска</div>
                    <div style={{fontWeight: 500}} className="col-12 col-lg-8 col-xxl-5 fs-4 my-5">Мы стремимся обеспечить уборку помещений наших клиентов на самом высоком уровне</div>
                    <Link className="mt-5" onClick={() => {window.scrollTo(0, 0)}} to="/order">
                        <div style={{fontWeight: 600}} className="btn btn-origin mx-5 px-5 py-2 rounded-4">Заказать уборку</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const AboutUs = () => {
    return (
        <div className="container col-12 col-lg-9 col-xl-6 col-xxl-5 my-5">
            <div className="row align-items-stretch">
                <div style={{background: `url(${officeImage}) center center/cover no-repeat`}} className="col-lg-4 d-none d-lg-block p-0 rounded">
                </div>
                <div className="wrapper-cleaners-content bg-origin col-lg-8 p-5 rounded-end">
                    <h4 style={{fontWeight: 600}} className="col-12 mb-4">Миссия наших уборщиков</h4>
                    <h6 className="col-12 py-3">Мы стремимся к совершенству уборки. Более чем за 5 лет мы создали надежную команду опытных уборщиков Минска и заслужили надежную репутацию за достижение отличных результатов.</h6>
                    <ul style={{fontWeight: 600}} className="col-12">
                        <li className="check-mission col-12">Обеспечиваем высочайший уровень обслуживания для каждого клиента</li>
                        <li className="check-mission col-12">Сохраняем честность, инициативность, профессионализм и гордимся своим положением на рынке</li>
                        <li className="check-mission col-12">Выстраиваем долгосрочные отношения с нашими клиентами, предоставляя качественные услуги по конкурентоспособным ценам</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const Location = () => {
    
    return (
        <div id="locations" style={{padding: "4.5rem 0"}} className="main-region col-12">
            <div className="main-region-wrapper text-center col-11 mx-auto">
                <div className="fs-4" style={{fontWeight: 600}}>Районы Минска</div>
                <div className="region-wrapper-regions d-flex flex-wrap col-12 col-lg-6 mx-auto text-center py-4">
                    {["Заводской", "Октябрьский", "Советский", "Ленинский", "Партизанский", "Фрунзенский", "Московский", "Первомайский", "Центральный"].map((item) => {
                        return <div className="col-6 col-lg-4 mt-2 dot-marker fs-6">{item}</div>
                    })}
                </div>
            </div>
        </div> 
    )
}

export default MainPage;