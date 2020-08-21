import React, { useContext } from 'react'
import { Link } from 'gatsby'
import {CurrentLocaleContext} from '../../layout/layout'
// import { Link, useIntl } from "gatsby-plugin-intl"
import Classes from './AnyLink.module.scss'
import Checkmark from '../checkmark/checkmark'
import Loader from '../loader/loader'
import Cross from '../cross/cross'

const AnyLink = ({link, title, external, internal, callBack, button, large, secondary, light, classes, noArrow, noPadding, disabled, submitting, submitted, submitError, children, regular}) => {

    const currentLang = useContext(CurrentLocaleContext).locale
    const customLangCode = useContext(CurrentLocaleContext).customLangCode

    const classNames = [classes, button ? [Classes.btn, "btn"].join(' ') : [Classes.textLink, !noArrow ? Classes.arrow : null, noPadding && Classes.noPadding, regular && Classes.regular].join(' '), large ? Classes.large : null, secondary ? Classes.secondary : null, light ? Classes.white : null, submitError && Classes.btnDanger].join(' ')
    
    return (
        <>
        {
        link && title && internal || link && children ?
            <Link className={ classNames } to={typeof currentLang === 'string' || currentLang instanceof String ? (currentLang === 'en' ? (link.charAt(0) === '/' ? link : `/${link}`) : `/${customLangCode || currentLang}/${link}`) : '/'}>
                {title}
                {children}
            </Link>
        : link && title && external || link && children ?
            <a className={ classNames } href={link} target="_blank" rel="noopener noreferrer">
                { title }
                {children}
            </a>
        : title && callBack ?
            <button className={ classNames } onClick={callBack} disabled={disabled || false}>
                <span className={submitting || submitted || submitError ? Classes.buttonTitleHidden : null} >{title}</span>
                {submitting ?
                    <Loader classes={Classes.submitting} /> :
                submitted ?
                    <Checkmark classes={Classes.submitted} white={true} /> :
                submitError ?
                    <Cross classes={Classes.submitError} white/>
            : null}
            {children}
            </button>
        : null
        }
        </>
    )   
}

export default AnyLink