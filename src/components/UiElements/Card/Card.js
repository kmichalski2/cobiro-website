import React from 'react'

import Classes from './Card.module.scss'

const Card = ({ children, smallPadding, noPadding, leftAligned, invisibleBox, shadow, classes }) => {

    return (
        <div className={[Classes.card, classes, smallPadding ? Classes.smallPadding : null, noPadding ? Classes.noPadding : null, leftAligned ? Classes.leftAligned : null, shadow && !invisibleBox ? Classes.shadow : null, invisibleBox ? Classes.invisibleBox : null].join(' ')}>
            {children}
        </div>
    )
}

export default Card