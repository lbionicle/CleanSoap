
import { useState } from "react"
import "./modalService.scss"

const ModalService = ({title}) => {

    const [value, setValue] = useState(0)

    const onChangeValue = (number) => {
        setValue(number)
    }

    return (
        <>
            <div class="modal fade" id="serviceModal" tabindex="-1" aria-labelledby="serviceModal" aria-hidden="true">
                <div class="modal-dialog modal-sm modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div style={{ cursor: "pointer", top: "15px", right: "20px", borderRadius: "0.5rem" }} className="position-absolute" data-bs-dismiss="modal" aria-label="close">
                                <i className="bi fa bi-x-lg"></i>
                            </div>
                            <h6 className="text-center" style={{fontWeight: 600}}>{title}</h6>
                            <div className="col-12 my-3">
                                <label htmlFor="form-service">Площадь, м²<span className="text-danger">*</span></label>
                                <input onChange={(e) => onChangeValue(e.target.value)} id="form-service" name="form-service" className="form-control" type="number" value={value} required />
                            </div>
                            <h6 className="cost">Cтоимость: <span>0</span> BYN</h6>
                            <h6 className="time my-2">Время выполнения: <span>0</span> мин.</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalService;