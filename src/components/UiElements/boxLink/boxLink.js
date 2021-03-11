import React from 'react'
import AnyLink from '../AnyLink/AnyLink'
import GradiantBar from '../gradiantBar/gradiantBar'
import HtmlText from '../HtmlText/HtmlText'

import * as Classes from './boxLink.module.scss'

const BoxLink = ({title, subtitle, text, link, internal}) => {

    return (
        <AnyLink link={link} external={!internal} internal={internal && link.slug} classes={Classes.linkBox}>
            <div className="card card-visible text-left">
                { title ? <h3 className="h1">{title}</h3> : null }
                <GradiantBar />
                { subtitle ? <h3 className="h4">{subtitle}</h3> : null }
                { text ? <HtmlText RawHtml={text} /> : null }
            </div>
        </AnyLink>
    )
}

export default BoxLink