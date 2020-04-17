import React from 'react'
import { Link } from 'gatsby'

import Classes from './AnyLink.module.scss'

const AnyLink = ({link, title, external, internal, callBack, button, large, secondary, light, classes}) => {

    console.log(link, title)

    const classNames = ["btn", classes, button ? Classes.btn : null, large ? Classes.large : null, secondary ? Classes.secondary : null, light ? Classes.white : null].join(' ')

    return (
        <>
        {
        link && title && internal ?
            <Link className={ classNames } to={link}>
                {title}
            </Link>
        : link && title && external ?
            <a className={ classNames } href={link} target="_blank" rel="noopener noreferrer">
                { title }
            </a>
        : title && callBack ?
            <button className={ classNames } onClick={callBack}>
                { title }
            </button>
        : null
        }
        </>
    )   
}

export default AnyLink