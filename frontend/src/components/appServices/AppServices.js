import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import cleanBuilding from "../../resources/img/cleanBuilding.png";
import cleanBathroom from "../../resources/img/cleanBathroom.png";
import cleanCarpets from "../../resources/img/cleanCarperts.png";
import cleanFurniture from "../../resources/img/cleanFurniture.png";
import generalClean from "../../resources/img/generalClean.png";
import washWindows from "../../resources/img/washWindows.png";
import ModalService from "../modalService/ModalService";

import 'swiper/css/bundle';



const AppServices = ({ stage }) => {
    const [title, setTitle] = useState("Уборка помещений");

    const services = [
        { src: cleanBuilding, title: "Уборка помещений" },
        { src: cleanBathroom, title: "Уборка санузлов" },
        { src: washWindows, title: "Мойка окон" },
        { src: cleanCarpets, title: "Чистка ковров" },
        { src: cleanFurniture, title: "Чистка мебели" },
        { src: generalClean, title: "Генеральная уборка" }
    ];

    const onClickService = (title) => {
        setTitle(title);
    };

    const renderServices = (arr) => {
        return arr.map(({ src, title }, i) => (
            <SwiperSlide key={i}>
                <div className="carousel-item text-center">
                    <div className="col-12 position-relative">
                        <img height={250} width={250} src={src} alt={title} />
                        {stage !== "main" && (
                            <i
                                onClick={() => onClickService(title)}
                                style={{ top: "50%", left: "50%", cursor: "pointer" }}
                                className="bi fa-4x bi-plus-circle position-absolute translate-middle"
                                data-bs-toggle="modal"
                                data-bs-target="#serviceModal"
                            ></i>
                        )}
                    </div>
                    <div style={{ fontWeight: 400 }} className="mt-3 fs-5 text-wrap word-break">
                        {title}
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
            <ModalService title={title} />
        </div>
    );
};

export default AppServices;
