import React from 'react'
import HtmlText from '../HtmlText/HtmlText'

import Classes from './HeaderWText.module.scss'
import AnyLink from '../AnyLink/AnyLink'
import ImageAll from '../ImageAll/ImageAll'

const HeaderWText = ({ title, h1, h2, h3, text, links, light, classes, icon, iconTitle, centered }) => {
    console.log(icon)
    return (
        <div className={classes}>
        { icon || iconTitle ?
        <div className={[Classes.iconRow, centered ? Classes.center : null].join(' ')}>
            {icon ?
            <ImageAll image ={icon} />     
            : null}
            {iconTitle ?
            <h3 className={light ? Classes.white : null}>{iconTitle}</h3>
            : null }
        </div>
        : null }
        {h1 && title ? 
            <h1 className={light ? Classes.white : null}>{ title }</h1>
        : h2 && title ? 
            <h2 className={light ? Classes.white : null}>{ title }</h2>
        : h3 && title ? 
            <h3 className={light ? Classes.white : null}> { title } </h3>
        : null }
        <HtmlText RawHtml={text} classes={[Classes.text, light ? Classes.white : null].join(' ')}/>
        { links.map((l, i) => (
            <AnyLink 
                key={i}
                link={l.link} 
                internal={l.internal || false} 
                external={l.external || false} 
                title={l.title} 
                callBack={l.callBack || null} 
                large={l.large || false} 
                secondary={l.secondary || false} 
                light={ light || false }
                classes={i > 0 ? Classes.spaceLeft : null}
            />
        ))}
        </div>
    )
}

export default HeaderWText