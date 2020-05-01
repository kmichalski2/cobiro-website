import React from 'react'
import Img from "gatsby-image"
import Classes from './imageAll.module.scss'

const ImageAll = ({ image, alt, classes, fadeIn, fullWidth, style, backgroundImage }) => {
    
    return (
        image && image.fluid ?
            <Img
                loading="eager"
                fadeIn={fadeIn || false}
                fluid={image.fluid}
                className={["img-responsive", classes, backgroundImage ? Classes.backgroundImage: null, fullWidth ? "img-full-width" : null].join(' ')}
                alt={alt}
                style={style}
                />
        : image && image.fixed ?
            <Img
                loading="eager"
                fadeIn={fadeIn || false}
                fixed={image.fixed}
                className={["img-responsive", classes, backgroundImage ? Classes.backgroundImage: null, fullWidth ? "img-full-width" : null].join(' ')}
                alt={alt}
                style={style}
                />
        : image && image.url ?
            <img src={image.url} 
            className={["img-responsive", classes, backgroundImage ? Classes.backgroundImage: null, fullWidth ? "img-full-width" : null].join(' ')}
                alt={alt}
                style={style}
                />
        : null

    )
}

export default ImageAll