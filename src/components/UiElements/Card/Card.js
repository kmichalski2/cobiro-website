import React from 'react'

import Classes from './Card.module.scss'

const Card = ({ children, smallPadding, noPadding, leftAligned, shadow, classes }) => {

    return (
        <div className={[Classes.card, classes, smallPadding ? Classes.smallPadding : null, noPadding ? Classes.noPadding : null, leftAligned ? Classes.leftAligned : null, shadow ? Classes.shadow : null].join(' ')}>
            {children}
        </div>
    )
}

export default Card