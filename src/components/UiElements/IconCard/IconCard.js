import React from 'react'
import Card from '../Card/Card'
import ImageAll from '../ImageAll/ImageAll'
import HtmlText from '../HtmlText/HtmlText'
import AnyLink from '../AnyLink/AnyLink'

import Classes from './IconCard.module.scss'

const IconCard = ({ image, alt, iconBig, title, text, footnote, link, internal, external, linkTitle, light, shadow, iconImg, textLeft, invisibleBoxes, classes, checkmark, showLinkAsButton }) => {

    console.log('link', link)

    return (
        <Card shadow={shadow} leftAligned={textLeft} invisibleBox={invisibleBoxes} classes={classes}>
            <ImageAll 
                image={image} 
                classes={[Classes.icon, iconImg ? Classes.iconImg : iconBig ? Classes.iconBig : null].join(' ')}
                alt={alt}/>
           
                <div className={[Classes.textWrapper, textLeft ? Classes.textLeft : null].join(' ')}>
                    {title ? <h4 className={light ? Classes.white : null}>{title}</h4> : null }
                    
                    {text ? 
                        <HtmlText RawHtml={text} classes={[Classes.text, light ? Classes.white : null].join(' ')}/>
                    : null} 

                    {footnote ? <p className={[Classes.footnote, light ? Classes.white : null].join(' ')}>{footnote}</p> : null}

                    {link ? 
                    <AnyLink 
                        link={link} 
                        internal={internal || false} 
                        external={external || false} 
                        title={linkTitle} 
                        light={ light || false }
                        classes={Classes.link, showLinkAsButton ? "margin-top" : null}
                        showLinkAsButton={showLinkAsButton}
                    />
                    : null}
                </div>
                {checkmark ?
                    <div className={Classes.checkmark}/>
                : null}
        </Card>
    )
}

export default IconCard