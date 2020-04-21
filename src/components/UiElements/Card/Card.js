import React from 'react'

import Classes from './Card.module.scss'

const Card = ({ children, shadow }) => {

    return (
        <div className={[Classes.card, shadow ? Classes.shadow : null].join(' ')}>
            {children}
        </div>
    )
}

export default Card