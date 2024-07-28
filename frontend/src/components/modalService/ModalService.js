import { useRef, useState, useEffect } from "react";
import "./modalService.scss";
import { Modal } from 'bootstrap';

const ModalService = ({ title, services, setServices, price, runtime }) => {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    const [value, setValue] = useState("");

    useEffect(() => {
        if (modalRef.current) {
            modalInstance.current = new Modal(modalRef.current);
        }
    }, []);

    const onChangeValue = (number) => {
        setValue(number);
    };

    const handleSubmit = () => {
        setServices({ ...services, [title]: {value: +value, price: price, runtime: runtime} });
        setValue("");
        closeModal();
    };

    const closeModal = () => {
        if (modalInstance.current) {
            modalInstance.current.hide();
        }
    };

    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

    return (
        <>
            <div className="modal fade" id="serviceModal" tabIndex="-1" aria-labelledby="serviceModal" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div style={{ cursor: "pointer", top: "15px", right: "20px", borderRadius: "0.5rem" }} className="position-absolute" data-bs-dismiss="modal" aria-label="close">
                                <i className="bi fa bi-x-lg"></i>
                            </div>
                            <div className="text-center fs-5" style={{ fontWeight: 600 }}>{title}</div>
                            <div className="col-12 my-3">
                                <label htmlFor="form-service">Площадь, м²<span className="text-danger">*</span></label>
                                <input onKeyDown={blockInvalidChar} onChange={(e) => onChangeValue(e.target.value)} id="form-service" name="form-service" placeholder="1" className="form-control" type="number" value={value} required />
                            </div>
                            <div className="fs-6 cost">Cтоимость: <span>{value ? value * price : 0}</span> BYN</div>
                            <div className="fs-6 time my-2">Время выполнения: <span>{value ? value * runtime : 0}</span> мин.</div>
                            <div onClick={handleSubmit} className={`btn btn-dark col-12 mt-3 ${value === 0 || value === "" ? "disabled" : ""}`}>Добавить</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalService;
