import React from "react"

import * as Classes from "./featuredCarouselSlide.module.scss"

import arrow from "../../../../images/arrow_blue_up.svg"
import Img from "gatsby-image"


const FeaturedCarouselSlide = props => {
  return (
    <li
      onClick={props.click}
      className={[
        props.active ? [Classes.active, 'active'].join(' ') : "",
        Classes.slide,
      ].join(" ")}
    >
      <div className={Classes.slideWrapper}>
      <h4>
        <img
          src={props.icon}
          className={Classes.icon}
          alt={[props.title, "icon"].join(" ")}
        />
        {props.title}
        <img
          src={arrow}
          className={Classes.arrow}
          alt={[props.title, "arrow"].join(" ")}
        />
      </h4>
      <div
        className={
          props.active
            ? ["open slide-text space-xs space-sm space-md", Classes.text].join(" ")
            : [Classes.text, "slide-text"].join(" ")
        }
      >
        
          <p className="small">{props.text}</p>
          </div>
          </div>
          {props.active ? 
          <div className={[Classes.imageWrapper, "hidden-lg hidden-xl"].join(' ')}>
          {props.image.fluid ?
            <Img
              fluid={props.image.fluid}
              className={Classes.animate}
              alt={props.image.alt ? props.image.alt : 'Carousel image'}
            />
            :
            <img
              src={props.image.url}
              className={Classes.animate}
              alt={props.image.alt ? props.image.alt : 'Carousel image'}
            />}
            </div>
            : null }
        {/* </div> */}
    </li>
  )
}

export default FeaturedCarouselSlide
