import { HashLink as Link } from "react-router-hash-link";
import logo from "../../resources/icons/logo.svg";
import userLogo from "../../resources/icons/user-logo.svg";
import "./appHeader.scss";
import { NavLink } from "react-router-dom";

const handleExitClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.scrollTo(0, 0);
}

const MainHeader = () => {
    return (
        <>
            <nav style={{boxShadow: "0px 5px 30px 0px rgba(206, 211, 218, 0.40)", zIndex: 100, backgroundColor: "white", fontWeight: 600}} className="navbar navbar-expand-lg col-12 position-fixed top-0">
                <div className="wrapper-navbar col-11 mx-auto">
                    <div className="d-flex flex-wrap justify-content-between align-items-center col-12">
                        <div className="main-wrapper-logo">
                            <Link onClick={() => {window.scrollTo(0, 0)}} to="/main"><img height={90} width={90} className="img-fluid" src={logo} alt="Логотип" /></Link>
                        </div>
                        <div className="d-lg-none ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><i className="bi fa-2x bi-list"></i></div>
                        <div className="collapse navbar-collapse mt-3 mt-lg-0 justify-content-end" id="navbarNav">
                            <ul className="navbar-nav align-items-center justify-content-between col-12 col-lg-10 col-xxl-7">
                                <li className="col-12 col-lg-1 my-2"><Link to="/main#sectors" className="col-12 text-start text-lg-center">Секторы</Link></li>
                                <li className="col-12 col-lg-1 my-2"><Link to="/main#services" className="col-12 text-start text-lg-center">Услуги</Link></li>
                                <li className="col-12 col-lg-1 my-2"><Link onClick={() => {window.scrollTo(0, 0)}} to="/about-us" className="col-12 text-start text-lg-center">О нас</Link></li>
                                <li className="col-12 col-lg-1 my-2"><Link to="/main#locations" className="col-12 text-start text-lg-center">Локации</Link></li>
                                <li className="col-12 col-lg-5 col-xxl-4 my-2">
                                    <Link className="col-12" onClick={() => {window.scrollTo(0, 0)}} to="/order">
                                        <div style={{fontWeight: 600}} className="btn btn-origin col-12 px-5 py-2 rounded-4">Заказать уборку</div>
                                    </Link>
                                </li>
                                
                                <li className="d-block d-lg-none my-2 col-12" onClick={() => {window.scrollTo(0, 0)}} style={{cursor: "pointer"}}><Link style={{fontWeight: 600}} to={localStorage.getItem("role") === "User" ? "/user-info" : "/admin-info"} className="dropdown-item">Личный кабинет</Link></li>
                                <li className="d-block d-lg-none my-2 col-12" onClick={() => {window.scrollTo(0, 0)}} style={{cursor: "pointer"}}><Link onClick={handleExitClick} style={{fontWeight: 600}} to="/" className="dropdown-item text-danger">Выйти<i className="bi fa-lg bi-box-arrow-right ms-1"></i></Link></li>

                                <li className="d-none d-lg-block my-2">
                                    <div className="dropdown">
                                        <img id="dropdown-user" src={userLogo} className="dropdown-toggle" alt="userLogo" role="button" data-bs-toggle="dropdown" aria-expanded="false"/>
                                        <ul style={{boxShadow: "0px 10px 15px 0px rgba(0, 0, 0, 0.25)"}} className="dropdown-menu dropdown-menu-end mt-2 p-3" aria-labelledby="dropdown-user">
                                            <li onClick={() => {window.scrollTo(0, 0)}} style={{cursor: "pointer"}}><Link style={{fontWeight: 500}} to={localStorage.getItem("role") === "User" ? "/user-info" : "/admin-info"} className="dropdown-item my-1">Личный кабинет</Link></li>
                                            <li style={{cursor: "pointer"}}><Link onClick={handleExitClick} style={{fontWeight: 500}} to="/" className="dropdown-item text-danger my-1">Выйти<i className="bi fa-lg bi-box-arrow-right ms-1"></i></Link></li>
                                        </ul>
                                    </div>
                                </li>                    
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

const UserHeader = () => {
    return (
        <nav style={{boxShadow: "0px 5px 30px 0px rgba(206, 211, 218, 0.40)", zIndex: 100, backgroundColor: "white", fontWeight: 600}} className="navbar navbar-expand-lg col-12 position-fixed top-0">
            <div className="wrapper-navbar col-11 mx-auto">
                <div className="d-flex flex-wrap justify-content-between align-items-center col-12">
                    <div className="main-wrapper-logo">
                        <Link onClick={() => {window.scrollTo(0, 0)}} to="/main"><img height={90} width={90} className="img-fluid" src={logo} alt="Логотип" /></Link>
                    </div>
                    <div className="d-lg-none ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><i className="bi fa-2x bi-list"></i></div>
                    <div className="collapse navbar-collapse mt-3 mt-lg-0 justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-center justify-content-between col-12 col-lg-11 col-xxl-6">
                            <li className="col-12 col-lg-6 col-xxl-6">
                                <NavLink style={({isActive}) => ({textDecorationLine: isActive ? "underline" : "none"})} onClick={() => {window.scrollTo(0, 0)}} to="/user-info" className="col-12 col-lg-8 text-start text-lg-center my-2">Настройка акканута</NavLink>
                                <NavLink style={({isActive}) => ({textDecorationLine: isActive ? "underline" : "none"})} onClick={() => {window.scrollTo(0, 0)}} to="/user-applications" className="col-12 col-lg-4 text-start text-lg-center my-2">Мои заявки</NavLink>
                            </li>
                            <li className="col-12 col-lg-4 col-xxl-4 my-2">
                                <Link className="col-12" onClick={() => {window.scrollTo(0, 0)}} to="/order">
                                    <div style={{fontWeight: 600}} className="btn btn-origin col-12 px-5 py-2 rounded-4">Заказать уборку</div>
                                </Link>
                            </li>
                            <li className="d-block d-lg-none my-2 col-12" onClick={() => {window.scrollTo(0, 0)}} style={{cursor: "pointer"}}><Link style={{fontWeight: 600}} to="/main" className="dropdown-item">Главная страница</Link></li>
                            <li className="d-block d-lg-none my-2 col-12" onClick={() => {window.scrollTo(0, 0)}} style={{cursor: "pointer"}}><Link onClick={handleExitClick} style={{fontWeight: 600}} to="/" className="dropdown-item text-danger">Выйти<i className="bi fa-lg bi-box-arrow-right ms-1"></i></Link></li>

                            <li className="d-none d-lg-block my-2">
                                <div className="dropdown">
                                    <img id="dropdown-user" src={userLogo} className="dropdown-toggle" alt="userLogo" role="button" data-bs-toggle="dropdown" aria-expanded="false"/>
                                    <ul style={{boxShadow: "0px 10px 15px 0px rgba(0, 0, 0, 0.25)"}} className="dropdown-menu dropdown-menu-end mt-2 p-3" aria-labelledby="dropdown-user">
                                        <li style={{cursor: "pointer"}}><Link onClick={() => {window.scrollTo(0, 0)}} style={{fontWeight: 500}} to="/main" className="dropdown-item">Главная страница</Link></li>
                                        <li style={{cursor: "pointer"}}><Link onClick={handleExitClick} style={{fontWeight: 500}} to="/" className="dropdown-item text-danger my-1">Выйти<i className="bi fa-lg bi-box-arrow-right ms-1"></i></Link></li>
                                    </ul>
                                </div>
                            </li>                    
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const AdminHeader = () => {
    return (
        <nav style={{boxShadow: "0px 5px 30px 0px rgba(206, 211, 218, 0.40)", zIndex: 100, backgroundColor: "white", fontWeight: 600}} className="navbar navbar-expand-lg col-12 position-fixed top-0">
            <div className="wrapper-navbar col-11 mx-auto">
                <div className="d-flex flex-wrap justify-content-between align-items-center col-12">
                    <div className="main-wrapper-logo">
                        <Link onClick={() => {window.scrollTo(0, 0)}} to="/main"><img height={90} width={90} className="img-fluid" src={logo} alt="Логотип" /></Link>
                    </div>
                    <div className="d-lg-none ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><i className="bi fa-2x bi-list"></i></div>
                    <div className="collapse navbar-collapse mt-3 mt-lg-0 justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-center justify-content-between col-12 col-lg-8 col-xxl-5">
                            <li className="d-flex flex-wrap align-items-center col-12 col-lg-11 col-xxl-11">
                                <NavLink style={({isActive}) => ({textDecorationLine: isActive ? "underline" : "none"})} onClick={() => {window.scrollTo(0, 0)}} to="/admin-info" className="col-12 col-lg-4 text-start text-lg-center my-2">Настройка акканута</NavLink>
                                <NavLink style={({isActive}) => ({textDecorationLine: isActive ? "underline" : "none"})} onClick={() => {window.scrollTo(0, 0)}} to="/admin-clients" className="col-12 col-lg-3 text-start text-lg-center my-2">Клиенты</NavLink>
                                <NavLink style={({isActive}) => ({textDecorationLine: isActive ? "underline" : "none"})} onClick={() => {window.scrollTo(0, 0)}} to="/admin-services" className="col-12 col-lg-2 text-start text-lg-center my-2">Услуги</NavLink>
                                <NavLink style={({isActive}) => ({textDecorationLine: isActive ? "underline" : "none"})} onClick={() => {window.scrollTo(0, 0)}} to="/admin-applications" className="col-12 col-lg-3 text-start text-lg-center my-2">Заявки</NavLink>
                            </li>

                            <li className="d-block d-lg-none my-2 col-12" onClick={() => {window.scrollTo(0, 0)}} style={{cursor: "pointer"}}><Link style={{fontWeight: 600}} to="/main" className="dropdown-item">Главная страница</Link></li>
                            <li className="d-block d-lg-none my-2 col-12" onClick={() => {window.scrollTo(0, 0)}} style={{cursor: "pointer"}}><Link onClick={handleExitClick} style={{fontWeight: 600}} to="/" className="dropdown-item text-danger">Выйти<i className="bi fa-lg bi-box-arrow-right ms-1"></i></Link></li>

                            <li className="d-none d-lg-block my-2">
                                <div className="dropdown">
                                    <img id="dropdown-user" src={userLogo} className="dropdown-toggle" alt="userLogo" role="button" data-bs-toggle="dropdown" aria-expanded="false"/>
                                    <ul style={{boxShadow: "0px 10px 15px 0px rgba(0, 0, 0, 0.25)"}} className="dropdown-menu dropdown-menu-end mt-2 p-3" aria-labelledby="dropdown-user">
                                        <li style={{cursor: "pointer"}}><Link onClick={() => {window.scrollTo(0, 0)}} style={{fontWeight: 500}} to="/main" className="dropdown-item">Главная страница</Link></li>
                                        <li style={{cursor: "pointer"}}><Link onClick={handleExitClick} style={{fontWeight: 500}} to="/" className="dropdown-item text-danger my-1">Выйти<i className="bi fa-lg bi-box-arrow-right ms-1"></i></Link></li>
                                    </ul>
                                </div>
                            </li>                    
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export { MainHeader, UserHeader, AdminHeader }
