import React from 'react'
import { Link } from 'gatsby'

import Classes from './AnyLink.module.scss'
import Checkmark from '../checkmark/checkmark'
import Loader from '../loader/loader'
import Cross from '../cross/cross'

const AnyLink = ({link, title, external, internal, callBack, button, large, secondary, light, classes, noArrow, disabled, submitting, submitted, submitError}) => {

    const classNames = [classes, button ? [Classes.btn, "btn"].join(' ') : [Classes.textLink, !noArrow ? Classes.arrow : null].join(' '), large ? Classes.large : null, secondary ? Classes.secondary : null, light ? Classes.white : null, submitError && Classes.btnDanger].join(' ')

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
            <button className={ classNames } onClick={callBack} disabled={disabled || false}>
                <span className={submitting || submitted ? Classes.buttonTitleHidden : null} >{title}</span>
                {submitting ?
                    <Loader classes={Classes.submitting} /> :
                submitted ?
                    <Checkmark classes={Classes.submitted} white={true} /> :
                submitError ?
                    <Cross classes={Classes.submitError}/>
            : null}
            </button>
        : null
        }
        </>
    )   
}

export default AnyLink