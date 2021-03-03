import React from 'react'
import Classes from './modal.module.scss'
import Backdrop from '../backdrop/backdrop'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const Modal = ({showModal, setShowModal, loading, children, small, dark, closeButton}) => (
    <>
    { showModal ?
        <Backdrop setShowModal={setShowModal}>
            {!loading ?
            <div className={[Classes.modal, small ? Classes.modalSmall : null, dark ? Classes.dark : null].join(' ')}>
                {closeButton ?
                    <button onClick={() => setShowModal(false)} className={Classes.close}><span className="sr-only btn-unstyled">Close</span></button>
                : null}
                {children}
            </div>
            : 
                <LoadingSpinner loading={loading} large>
                    Loading
                </LoadingSpinner>
            }
            
        </Backdrop>
    : null }
        </>
    )

export default Modal