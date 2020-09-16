import React from 'react'
import Classes from './subMenuFooter.module.scss'
import AnyLink from '../../../../UiElements/AnyLink/AnyLink'

const SubMenuFooter = ({ text, externalLink, internalLink, linkTitle }) => {

    return (
        <div className={[Classes.subMenuFooter, "center text-center"].join(' ')}>
            { text ? <p className={["small", Classes.subMenuFooterText].join(' ')}>{ text }</p> : null }
            <AnyLink 
                external={externalLink && true}
                internal={internalLink && true}
                link={externalLink || internalLink && internalLink.slug}
                title={linkTitle}
                button
            />
        
    </div>
    )
}

export default SubMenuFooter