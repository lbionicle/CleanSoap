import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import ModalService from "../modalService/ModalService";

import 'swiper/css/bundle';
import useServices from '../../services/Service';



const AppServices = ({ stage, orderServices, setOrderServices }) => {
    const [title, setTitle] = useState("Уборка помещений");
    const [price, setPrice] = useState(0);
    const [runtime, setRunTime] = useState(0);


    const [services, setServices] = useState([]);

    const {_apiBase, getServices} = useServices();

    useEffect(() => {
        getServices()
        .then(data => setServices(data))
    },[])

    const onClickService = (title, price, runtime) => {
        setTitle(title);
        setPrice(price);
        setRunTime(runtime);
    };

    const renderServices = (arr) => {
        return arr.map(({ photo, name, price, runtime }, i) => (
            <SwiperSlide key={i}>
                <div className="carousel-item text-center" >
                    <div className="col-12 position-relative">
                        <img height={250} width={250} src={`${_apiBase}/${photo}`} alt={name} />
                        {stage !== "main" && (
                            <i
                                onClick={() => onClickService(name, price, runtime)}
                                style={{ top: "50%", left: "50%", cursor: "pointer" }}
                                className="bi fa-4x bi-plus-circle position-absolute translate-middle"
                                data-bs-toggle="modal"
                                data-bs-target="#serviceModal"
                            ></i>
                        )}
                    </div>
                    <div style={{ fontWeight: 400 }} className="mt-3 fs-5 text-wrap word-break">
                        {name}
                    </div>
                </div>
            </SwiperSlide>
        ));
    };

    return (
        <div id="services" className="services col-12">
            <div style={{ margin: "5rem auto" }} className="wrapper-services col-11 text-center">
                {stage === "main" ? (
                    <div className='mb-4 mb-xxl-5 fs-3 col-12 text-center' style={{ fontWeight: 600 }}>Наши клининговые услуги</div>
                ) : (
                    <div className='mb-4 mb-xxl-5 fs-3 col-12 text-center' style={{ fontWeight: 600 }}>Выберите услугу</div>
                )}
                <Swiper
                    style={{"--swiper-navigation-color": "#000"}}
                    modules={[Navigation]}
                    centeredSlides={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                        1400: {
                            slidesPerView: 4,
                        },
                    }}
                    autoplay={false}
                >
                    {renderServices(services)}
                </Swiper>
            </div>
            <ModalService services={orderServices} setServices={setOrderServices} title={title} price={price} runtime={runtime} />
        </div>
    );
};

export default AppServices;
