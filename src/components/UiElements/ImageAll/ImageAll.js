import React from 'react'
import Img from "gatsby-image"

const ImageAll = ({ image, alt, classes, fadeIn, fullWidth }) => {
    
    return (
        image && image.fluid ?
            <Img
                loading="eager"
                fadeIn={fadeIn || false}
                fluid={image.fluid}
                className={["img-responsive", classes, fullWidth ? "img-full-width" : null].join(' ')}
                alt={alt}
                />
        : image && image.fixed ?
            <Img
                loading="eager"
                fadeIn={fadeIn || false}
                fixed={image.fixed}
                className={["img-responsive", classes, fullWidth ? "img-full-width" : null].join(' ')}
                alt={alt}
                />
        : image && image.url ?
            <img src={image.url} 
            className={["img-responsive", classes, fullWidth ? "img-full-width" : null].join(' ')}
                alt={alt} 
                />
        : null

    )
}

export default ImageAll