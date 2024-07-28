import { Link } from "react-router-dom"

const AppNotAdmin = () => {
    return (
        <div style={{minHeight : "100dvh"}} className="d-flex flex-column align-items-center justify-content-center text-center col-12">
            <div style={{fontSize: 300}}>404</div>
            <div className="d-flex flex-wrap align-items-center text-center justify-content-center col-12">
                <div className="fs-3">Страница не найдена. Перейти <Link to={"/main"}><span className="text-primary">на главную</span></Link></div>
            </div>
        </div>
    )
}

export default AppNotAdmin