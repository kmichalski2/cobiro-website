import React from 'react'
import Card from '../Card/Card'
import ImageAll from '../ImageAll/ImageAll'
import HtmlText from '../HtmlText/HtmlText'
import AnyLink from '../AnyLink/AnyLink'

import Classes from './IconCard.module.scss'

const IconCard = ({ image, alt, iconBig, title, text, footnote, link, internal, external, linkTitle, light, shadow, iconImg, classes }) => {

    return (
        <Card shadow={shadow} classes={classes}>
            <ImageAll 
                image={image} 
                classes={[Classes.icon, iconImg ? Classes.iconImg : iconBig ? Classes.iconBig : null].join(' ')}
                alt={alt}/>
           
                <div className={Classes.textWrapper}>
                    <h3 className={light ? Classes.white : null}>{title}</h3>
                    
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
                        classes={Classes.link}
                    />
                    : null}
                </div>
        </Card>
    )
}

export default IconCard