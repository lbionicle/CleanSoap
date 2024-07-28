
import "./appFooter.scss"

const AppFooter = ({stage}) => {

    const color = stage === "main" ? "#ced4d9" : "white"
    const border = stage === "main" ? "none" : "1px solid #d9d9d9"

    return (
        <footer style={{padding: "0 0 0 0", backgroundColor: color, border: border}} className="col-12">
            <div className="d-flex flex-wrap align-items-center justify-content-center col-11 mx-auto text-center">
                <div className="d-flex justify-content-center justify-content-lg-start align-items-center col-12 col-lg-3 py-2 py-lg-3"><i class="bi fa-lg bi-telephone me-1"></i><a href="tel:+375292559257">+ 375 29 255-92-57</a></div>
                <div className="d-flex justify-content-center justify-content-lg-start align-items-center col-12 col-lg-3 py-2 py-lg-3"><i class="bi fa-lg bi-envelope me-1"></i><a href="mailto:info@cleansoap.by">info@cleansoap.by</a></div>
                <div style={{fontWeight: 400}} className="col-12 col-lg-6 text-center text-lg-end fs-6 py-2 py-lg-3">Премиальные услуги клининга в Минске</div>
            </div>
            <div className="p-3 bg-origin col-12 col-lg-6 col-xxl-2 mx-auto text-center">
                © 2024 Clean Soap ECommerce
            </div>
        </footer>
    )
}

export default AppFooter;