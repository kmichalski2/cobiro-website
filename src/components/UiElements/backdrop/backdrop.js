import React from 'react'
import Classes from './backdrop.module.scss'

const Backdrop = ({children, setShowModal}) => (
    <div className={Classes.wrapper}>
        {children}
        <div className={Classes.backdrop} onClick={() => setShowModal(false)}/>
    </div> 
)

export default Backdrop

