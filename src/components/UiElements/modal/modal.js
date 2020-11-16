import React from 'react'
import Classes from './modal.module.scss'
import Backdrop from '../backdrop/backdrop'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const Modal = ({showModal, setShowModal, loading, children, small}) => (
    <>
    { showModal ?
        <Backdrop setShowModal={setShowModal}>
            {!loading ?
            <div className={[Classes.modal, small ? Classes.modalSmall : null].join(' ')}>
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