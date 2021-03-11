import React from 'react'
import * as Classes from './subMenuFooter.module.scss'
import AnyLink from '../../../../UiElements/AnyLink/AnyLink'
import ImageAll from '../../../../UiElements/ImageAll/ImageAll'

const SubMenuFooter = ({ text, externalLink, internalLink, linkTitle, title, image }) => {

    return (
        <div className={[Classes.subMenuFooter].join(' ')}>
            <div className={Classes.textWrapper}>
                {title ? <h3>{title}</h3> : null}
                { text ? <p className={["small space-xs-up", Classes.subMenuFooterText].join(' ')}>{ text }</p> : null }
                <AnyLink 
                    external={externalLink && true}
                    internal={internalLink && true}
                    link={externalLink || internalLink && internalLink.slug}
                    title={linkTitle}
                    button
                />
            </div>
            {image ? 
            <ImageAll classes={[Classes.image, "hidden-sm hidden-md hidden-xs"].join(' ')} image={image} alt={image.alt}/>
            : null}
            
    </div>
    )
}

export default SubMenuFooter