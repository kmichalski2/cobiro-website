import React from 'react'
import HeaderWText from '../HeaderWText/HeaderWText'
import Classes from './ctaCard.module.scss'

const CtaCard = ({title, text, internalLink, externalLink, linkTitle, bgColor, lightText}) => {

    return (
        <div className={Classes.ctaCard} style={bgColor ? {backgroundColor: bgColor} : null}>
            <HeaderWText 
                title={title}
                h3
                text={text}
                light={lightText}
                links={[
                {
                    link: internalLink || externalLink,
                    title: linkTitle,
                    external: externalLink,
                    internal: internalLink
                }
                ]}
                />
        </div>
    )
}

export default CtaCard