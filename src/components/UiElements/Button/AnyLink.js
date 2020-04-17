import React from 'react'
import { Link } from 'gatsby'

import Classes from './AnyLink.module.scss'

const AnyLink = ({link, title, external, callBack, large, secondary}) => {

    return (
        <>
        {
        link && title && !external ?
            <Link className={ [Classes.button, large ? Classes.large : null, secondary ? Classes.secondary : null].join(' ') } to={link}>
                {title}
            </Link>
        : link && title && external ?
            <a className={ [Classes.button, large ? Classes.large : null, secondary ? Classes.secondary : null].join(' ') } href={link} target="_blank">{ title }</a>
        : title && callBack ?
            <button className={ [Classes.button, large ? Classes.large : null, secondary ? Classes.secondary : null].join(' ') } onClick={callBack}></button>
        : null
        }
        </>
    )   
}

export default AnyLink