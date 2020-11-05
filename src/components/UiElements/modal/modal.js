import React from 'react'
import Classes from './modal.module.scss'
import Backdrop from '../backdrop/backdrop'
import PaymentDummy from '../../../images/payment_dummy.png'

const Modal = ({showModal, setShowModal}) => (
    <>
    { showModal ?
        <Backdrop setShowModal={setShowModal}>
            <div className={["row card card-visible", Classes.modal].join(' ')}>
                <div className={["col col-xs-12 col-lg-4", Classes.modalRight].join(' ')}>
                    <div className={Classes.close}>
                        <button className="btn btn-unstyled" onClick={() => setShowModal(false)}>&#10005;</button>
                    </div>
                    <h3>Payment info</h3>
                    <p className="small">Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, sed do </p>
                </div>
                <div className={["col col-xs-12 col-lg-8 first-lg", Classes.modalLeft].join(' ')}>
                    <img src={PaymentDummy} alt="" className={Classes.paymentDummy}/>
                </div>
            </div>
        </Backdrop>
        : null }
        </>
    )

export default Modal