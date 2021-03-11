import React from 'react'
import HtmlText from '../HtmlText/HtmlText'

import * as Classes from './HeaderWText.module.scss'
import AnyLink from '../AnyLink/AnyLink'
import ImageAll from '../ImageAll/ImageAll'

const HeaderWText = ({ title, h1, h2, h3, h4, text, links, light, darkButton, classes, icon, iconLarge, iconTitle, centered, children, jumboCtaImage, proFeature }) => {

    const headerSpacing = !text && !children ? Classes.headerSpacing : null
    return (
        <div className={[classes, centered ? Classes.center : null].join(' ')}>
        { icon || iconTitle ?
        <div className={[Classes.iconRow, centered ? Classes.center : null, iconLarge ? Classes.iconLarge : null].join(' ')}>
            {icon ?
            <ImageAll image={icon} />
            : null}
            {iconTitle ?
            <h3 className={light ? Classes.white : null}>{iconTitle}</h3>
            : null }
        </div>
        : null }
        {h1 && title ? 
            <h1 className={[headerSpacing, light ? Classes.white : null, proFeature ? Classes.proFeature : null].join(' ')}>{ title }</h1>
        : h2 && title ? 
            <h2 className={[headerSpacing, light ? Classes.white : null, proFeature ? Classes.proFeature : null].join(' ')}>{ title }</h2>
        : h3 && title ? 
            <h3 className={[headerSpacing, light ? Classes.white : null, proFeature ? Classes.proFeature : null].join(' ')}> { title } </h3>
        : h4 && title ? 
            <h4 className={[headerSpacing, light ? Classes.white : null, proFeature ? Classes.proFeature : null].join(' ')}> { title } </h4>
        : null }
        <HtmlText RawHtml={text} classes={[Classes.text, light ? Classes.white : null].join(' ')}/>
        { children ? 
            <div className={Classes.children}>
                {children}
            </div>
        : null }
        { links ? links.map((l, i) => (
            <AnyLink 
                key={i}
                link={l.link} 
                internal={l.internal || false} 
                external={l.external || false} 
                title={l.title} 
                callBack={l.callBack || null} 
                large={l.large || false} 
                button={l.button}
                secondary={l.secondary || false} 
                light={ !darkButton && light || false }
                classes={i > 0 ? Classes.spaceLeft : null}
            />
        )) : null}
        </div>
    )
}

export default HeaderWText