
import flats from "../../resources/img/flats.jpg"
import gym from "../../resources/img/gym.jpg"
import houses from "../../resources/img/houses.jpg"
import medical from "../../resources/img/medical.jpg"
import office from "../../resources/img/office.jpg"
import shoppingCentre from "../../resources/img/shoppingСentre.jpg"

import "./appSectors.scss"

const AppSectors = ({choiceSectors}) => {

    const sectors = {
        bussines: [
            {src: office, title: "Офисы", descr: "Регулярная уборка, обслуживание санузлов и поставка расходных материалов для офисов и других рабочих помещений."},
            {src: shoppingCentre, title: "Торговые центры", descr: "Качество обслуживания клиентов является приоритетом в мире розничной торговли, и презентация является центральной частью этого процесса."},
            {src: gym, title: "Спортивные залы", descr: "Мы можем обеспечить регулярную, гарантированную и надежную уборку спортивных залов."},
            {src: medical, title: "Здравоохранение", descr: "Мы понимаем важность поддержания высоких стандартов гигиены в больницах, стоматологических кабинетах и ​​кабинетах общей практики."}
        ],
        dwelling: [
            {src: flats, title: "Квартиры", descr: "Регулярная уборка, обслуживание санузлов и поставка расходных материалов для офисов и других рабочих помещений."},
            {src: houses, title: "Частные дома", descr: "Систематическая уборка домов необходима для поддержания чистоты, гигиены и общего благополучия."}
        ]
    }

    const renderSectors = (arr) => {
        const items = arr.map(({src, title, descr}) => {

            return (
                <div className="d-flex flex-column col-12 col-lg-6 col-xxl-3 p-2">
                    <div className="position-relative overflow-hidden rounded-4" style={{ height: '260px' }}>
                        <div className="d-flex justify-content-center align-items-center position-absolute flex-column h-100 col-12">
                            <div style={{padding: "0.75rem 1.5rem"}} className="position-absolute bg-white col-12">
                                <div style={{fontWeight: 600}} className="mb-0 fs-5">{title}</div>
                            </div>
                        </div>
                        <img src={src} alt={title} className="w-100 h-100 object-fit-cover" />
                    </div>
                    <p style={{fontSize: 16, margin: "25px 0 0 0"}} className="card-text text-start">
                        {descr}
                    </p>
                </div>
            )
        })

        return (
            <div className="col-12 d-flex flex-wrap justify-content-center">
                {items}
            </div>
        )
    }

    return (
        <div id={choiceSectors === "bussines" ? "sectors" : null} style={{padding: "5rem 0 0 0"}} className="main-bussines-sectors col-12">
            <div className="wrapper-bussines-sectors col-11 mx-auto text-center">
                <div className="fs-3" style={{fontWeight: 600}}>{choiceSectors === "bussines" ? "Секторы бизнеса" : "Секторы жилых помещений"}</div>
                <div className="fs-5 my-5" style={{fontWeight: 500}}>{choiceSectors === "bussines" ? "Мы предоставляем профессиональные клининговые услуги в Минске для различных секторов бизнеса" : null}</div>
                {choiceSectors === "bussines" ? renderSectors(sectors.bussines) : renderSectors(sectors.dwelling)}
            </div>
        </div>
    )
}

export default AppSectors