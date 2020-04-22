import React from 'react'

import Classes from './Card.module.scss'

const Card = ({ children, smallPadding, leftAligned, shadow }) => {

    return (
        <div className={[Classes.card, smallPadding ? Classes.smallPadding : null, leftAligned ? Classes.leftAligned : null, shadow ? Classes.shadow : null].join(' ')}>
            {children}
        </div>
    )
}

export default Card