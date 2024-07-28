
import { useEffect, useRef, useState } from "react";
import useServices from "../../services/Service";
import "./accServices.scss"
import Spinner from "../spinner/Spinner";

const AccServices = ({ onError }) => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [serviceId, setServiceId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const { getServices, deleteServiceById } = useServices();

    useEffect(() => {
        if (services.length === 0) {
            onRequest();
        }
    }, []);

    useEffect(() => {
        if (searchTerm) {
            setFilteredServices(
                services.filter(service =>
                    service.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredServices(services);
        }
    }, [searchTerm, services]);

    const onRequest = () => {
        getServices()
            .then(data => {
                setServices(data);
                setFilteredServices(data);
                setLoading(false);
            })
            .catch(error => onError({ errorHeader: "Ошибка", errorMessage: error.message }));
    };

    const handleDeleteClick = (id) => {
        deleteServiceById(id)
            .then((response) => {
                if (!response.detail) {
                    setLoading(true);
                    onRequest();
                } else {
                    onError(response.detail);
                }
            }).catch(e => {
                onError({ errorHeader: `Ошибка`, errorMessage: "Что-то пошло не так" });
            })
    };

    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} style={{ backgroundColor: 'orange' }}>{part}</span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return (
        <div style={{ padding: "10rem 0 5rem 0", flex: "1 0 auto" }} className="d-flex flex-column align-items-center col-11 mx-auto">
            <input
                type="text"
                className="form-control col-12"
                placeholder="Введите название для поиска услуги..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={services.length > 0 ? false : true}
            />
            <div style={{ fontWeight: 500 }} className="btn btn-outline-dark col-12 my-4" data-bs-toggle="modal" data-bs-target="#modalAdd">Добавить услугу</div>
            <div style={{ margin: "0 auto 5rem auto" }} className="d-flex flex-column align-items-center admin-services col-12">
                {loading ?
                    <Spinner />
                    :
                    (filteredServices.length <= 0 ?
                        <div style={{ fontWeight: 500 }} className="col-12 text-center fs-4">Список услуг пуст</div>
                        :
                        <>
                            {filteredServices.map(({ id_service, runtime, name, price }) => (
                                <div key={id_service} className="d-flex flex-wrap justify-content-start align-items-center admin-services-service text-start col-12 p-3">
                                    <div className="services-service-id col-6 col-lg-4 col-xxl-1 pe-2 pb-2">
                                        <div className="fs-6 col-12 client-label">№</div>
                                        <div className="fs-6 col-12">{id_service}</div>
                                    </div>
                                    <div className="services-service-serviceName col-6 col-lg-4 col-xxl-4 pe-2 pb-2">
                                        <div className="fs-6 col-12 client-label">Название услуги</div>
                                        <div className="fs-6 col-12">
                                            {getHighlightedText(name, searchTerm)}
                                        </div>
                                    </div>
                                    <div className="services-service-cost col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                                        <div className="fs-6 col-12 client-label">Стоимость</div>
                                        <div className="fs-6 col-12">{price} BYN</div>
                                    </div>
                                    <div className="services-service-executionTime col-6 col-lg-4 col-xxl-2 pe-2 pb-2">
                                        <div className="fs-6 col-12 client-label">Время выполнения</div>
                                        <div className="fs-6 col-12">{runtime} мин.</div>
                                    </div>
                                    <div className="d-flex align-items-stretch justify-content-between services-service-controls col-12 col-lg-8 col-xxl-3 py-2 text-center">
                                        <div
                                            style={{ borderRight: "none" }}
                                            className="btn btn-outline-dark d-flex align-items-center justify-content-start services-service-edit col-6 rounded-0"
                                            onClick={() => setServiceId(id_service)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalService"
                                        >
                                            <i className="bi fa-lg bi-pencil col-12"></i>
                                        </div>
                                        <div onClick={() => handleDeleteClick(id_service)} className="btn btn-outline-dark d-flex align-items-center justify-content-start services-service-delete col-6 rounded-0">
                                            <i className="bi fa-lg bi-trash3 col-12"></i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
            </div>
            <AddServiceModal onRequest={onRequest} onError={onError} />
            <ServiceModal onRequest={onRequest} onError={onError} serviceId={serviceId} />
        </div>
    );
}

const AddServiceModal = ({ onRequest, onError }) => {
    const [photos, setPhotos] = useState([]);
    const fileInputRef = useRef(null);

    const { addService } = useServices();

    const onSubmitOffice = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target).entries());
        data.price = +data.price;
        data.runtime = +data.runtime;
        data.photo = photos.map(photo => photo.base64);

        console.log(data)

        addService(data)
            .then((response) => {
            if (!response.detail) {
                onRequest();
                e.target.reset();
                setPhotos([]);
            } else {
                onError(response.detail)
            }
        }).catch(e => {
            onError({ errorHeader: `Ошибка`, errorMessage: "Что-то пошло не так" });
        })
        ;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/') && (file.type.endsWith('jpeg') || file.type.endsWith('jpg') || file.type.endsWith('png'))) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotos([{ base64: reader.result, name: file.name }]);
            };
            reader.readAsDataURL(file);
        } else {
            fileInputRef.current.value = "";
        }
    };

    const handleRemovePhoto = () => {
        setPhotos([]);
        fileInputRef.current.value = "";
    };

    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

    return (
        <div className="modal" id="modalAdd" tabIndex="-1" aria-labelledby="modalAddLabel" aria-hidden="true">
            <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <div style={{ cursor: "pointer", top: "15px", right: "20px", borderRadius: "0.5rem" }} className="position-absolute" data-bs-dismiss="modal" aria-label="close">
                            <i className="bi fa bi-x-lg"></i>
                        </div>
                        <div className="modal-body-add col-12">
                            <div className="images d-flex justify-content-center align-items-start">
                                {photos.map((photo, index) => (
                                    <div key={index} className="image-wrapper position-relative">
                                        <img src={photo.base64} className="photo-circle d-block" alt={photo.name} />
                                        <div className="overlay position-absolute top-50 start-50 translate-middle" onClick={handleRemovePhoto}>
                                            <i className="bi bi-trash3 delete-icon"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={onSubmitOffice} id="addOffice" className="mt-2">
                                <div className="modal-body-images mb-3">
                                    <label htmlFor="formFile" className="form-label">Добавить фото <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        name="photo"
                                        type="file"
                                        id="formFile"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        required
                                    />
                                </div>
                                <div className="modal-body-name my-2">
                                    <label htmlFor="input-name" className="form-label">Название <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" name="name" id="input-name" required></input>
                                </div>
                                <div className="modal-body-runtime">
                                    <label htmlFor="input-runtime" className="form-label">Время выполнения<span className="text-danger">*</span></label>
                                    <input onKeyDown={blockInvalidChar} className="form-control" type="number" step="any" name="runtime" id="input-runtime" required></input>
                                </div>
                                <div className="modal-body-price my-2">
                                    <label htmlFor="input-price" className="form-label">Цена<span className="text-danger">*</span></label>
                                    <input onKeyDown={blockInvalidChar} className="form-control" type="number" name="price" id="input-price" required></input>
                                </div>
                                <div className="modal-body-controls col-12 mt-3">
                                    <button type="submit" className="btn btn-dark col-12">Добавить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ServiceModal = ({ serviceId, onRequest, onError }) => {
    const [serviceData, setServiceData] = useState({
        name: "",
        runtime: "",
        price: "",
        photo: ""
    });
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const { _apiBase, getServiceById, putServiceById } = useServices();

    const getInfo = async () => {
        setLoading(true);
        try {
            const data = await getServiceById(serviceId);
            const photoBase64 = await fetchPhotoAsBase64(`${_apiBase}/${data.photo}`);
            setServiceData({
                name: data.name,
                runtime: data.runtime,
                price: data.price,
                photo: photoBase64,
            });
        } catch (error) {
            onError({ errorHeader: "Ошибка", errorMessage: error.message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (serviceId) {
            getInfo();
        }
      }, [serviceId]);

    const fetchPhotoAsBase64 = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const onSubmitService = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = { ...serviceData, photo: [photos.length > 0 ? photos[0].base64 : serviceData.photo] };
        data.price = +data.price;
        data.runtime = +data.runtime;

        putServiceById(serviceId, data)
        .then((response) => {
          if (!response.detail) {
            onRequest();
            setPhotos([]);
            getInfo();
          } else {
            onError(response.detail);
          }
        })
        .catch((e) => {
          onError({ errorHeader: "Ошибка", errorMessage: "Что-то пошло не так" });
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/') && (file.type.endsWith('jpeg') || file.type.endsWith('jpg') || file.type.endsWith('png'))) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotos([{ base64: reader.result, name: file.name }]);
            };
            reader.readAsDataURL(file);
        } else {
            fileInputRef.current.value = "";
        }
    };

    const handleRemovePhoto = () => {
        setPhotos([]);
        fileInputRef.current.value = "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

    return (
        <div className="modal" id="modalService" tabIndex="-1" aria-labelledby="modalServiceLabel" aria-hidden="true">
            <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <div style={{ cursor: "pointer", top: "15px", right: "20px", borderRadius: "0.5rem" }} className="position-absolute" data-bs-dismiss="modal" aria-label="close">
                            <i className="bi fa bi-x-lg"></i>
                        </div>
                        <div className="modal-body-edit col-12">
                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="images d-flex justify-content-center align-items-start">
                                        {photos.length > 0 ? (
                                            <div className="image-wrapper position-relative">
                                                <img src={photos[0].base64} className="photo-circle d-block" alt={photos[0].name} />
                                                <div className="overlay position-absolute top-50 start-50 translate-middle" onClick={handleRemovePhoto}>
                                                    <i className="bi bi-trash3 delete-icon"></i>
                                                </div>
                                            </div>
                                        ) : (
                                            serviceData.photo ? <img src={serviceData.photo} className="photo-circle d-block" alt="Service" /> : null
                                        )}
                                    </div>
                                    <form onSubmit={onSubmitService} id="editService" className="mt-2">
                                        <div className="modal-body-images mb-3">
                                            <label htmlFor="formFile" className="form-label">Добавить новое фото</label>
                                            <input
                                                className="form-control"
                                                name="photo"
                                                type="file"
                                                id="formFile"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={handleFileChange}
                                                ref={fileInputRef}
                                            />
                                        </div>
                                        <div className="modal-body-name my-2">
                                            <label htmlFor="input-name" className="form-label">Название <span className="text-danger">*</span></label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="name"
                                                id="input-name"
                                                value={serviceData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="modal-body-runtime">
                                            <label htmlFor="input-runtime" className="form-label">Время выполнения <span className="text-danger">*</span></label>
                                            <input
                                                onKeyDown={blockInvalidChar}
                                                className="form-control"
                                                type="number"
                                                step="any"
                                                name="runtime"
                                                id="input-runtime"
                                                value={serviceData.runtime}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="modal-body-price my-2">
                                            <label htmlFor="input-price" className="form-label">Цена <span className="text-danger">*</span></label>
                                            <input
                                                onKeyDown={blockInvalidChar}
                                                className="form-control"
                                                type="number"
                                                name="price"
                                                id="price"
                                                value={serviceData.price}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="modal-body-controls col-12 mt-3">
                                            <button type="submit" className="btn btn-dark col-12">Сохранить</button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AccServices