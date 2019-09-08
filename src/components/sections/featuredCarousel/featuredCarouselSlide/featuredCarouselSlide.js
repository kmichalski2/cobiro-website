import React from "react"

import "./featuredCarouselSlide.scss"


const FeaturedCarouselSlide = ( props ) => {
    
    return (
        <li onClick={props.click} className={props.active ? 'active' : ''}>
            <h4>{props.title}</h4>
            <div className={props.active ? 'open slide-text' : 'slide-text'}>
                <p>{props.text}</p>
            </div>
        </li>

)}

export default FeaturedCarouselSlide
