import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';
import './modalError.scss';

const ModalError = ({ error }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current && error) {
            const modalElement = modalRef.current;
            const bsModal = new Modal(modalElement);
            bsModal.show();
        }
    }, [error]);

    if (!error) return null;

    return (
        <>
            <div className="modal fade" id="errorModal" tabIndex="-1" aria-labelledby="exampleErrorModal" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <div style={{ cursor: "pointer", top: "10px", right: "20px", borderRadius: "0.5rem" }} className="position-absolute" data-bs-dismiss="modal" aria-label="close">
                                <i className="bi fa bi-x-lg"></i>
                            </div>
                            <h5 style={{fontSize: 18, fontWeight: 600}} className="errorHeader mb-3">
                                {error.errorHeader}
                            </h5>
                            <h6 style={{fontSize: 16}} className="errorMessage">
                                {error.errorMessage}
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalError;
