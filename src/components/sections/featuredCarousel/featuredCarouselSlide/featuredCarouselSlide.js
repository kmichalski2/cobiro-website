import React from "react"

import FeaturedCarouselStyles from "./featuredCarouselSlide.module.scss"

import arrow from '../../../../images/arrow_blue_up.svg'
import icon from '../../../../images/placeholder_icon_nobg.svg'


const FeaturedCarouselSlide = ( props ) => {
    
    return (
        <li onClick={props.click} className={[(props.active ? FeaturedCarouselStyles.active : ''), FeaturedCarouselStyles.slide].join(' ')}>
            <h4> 
                <img src={icon} className={FeaturedCarouselStyles.icon} alt={[props.title, 'icon'].join(' ')}/>
                {props.title}
                <img src={arrow} className={FeaturedCarouselStyles.arrow} alt={[props.title, 'arrow'].join(' ')}/>
            </h4>
            <div className={props.active ? (['open slide-text', FeaturedCarouselStyles.text].join(' ')) : [FeaturedCarouselStyles.text, 'slide-text'].join(' ')}>
                <p className="small">{props.text}</p>
            </div>
        </li>

)}

export default FeaturedCarouselSlide
