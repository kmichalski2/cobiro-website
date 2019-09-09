import React from "react"

import "./featuredCarouselSlide.scss"

import arrow from '../../../../images/arrow_blue_up.svg'
import icon from '../../../../images/placeholder_icon_nobg.svg'


const FeaturedCarouselSlide = ( props ) => {
    
    return (
        <li onClick={props.click} className={props.active ? 'active' : ''}>
            <h4> 
                <img src={icon} className="icon" alt={[props.title, 'icon'].join(' ')}/>
                {props.title}
                <img src={arrow} className="arrow" alt={[props.title, 'arrow'].join(' ')}/>
            </h4>
            <div className={props.active ? 'open slide-text' : 'slide-text'}>
                <p className="small">{props.text}</p>
            </div>
        </li>

)}

export default FeaturedCarouselSlide
