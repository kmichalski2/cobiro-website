import React from "react"

import FeaturedCarouselSlideStyles from "./featuredCarouselSlide.module.scss"

import arrow from "../../../../images/arrow_blue_up.svg"
import icon from "../../../../images/placeholder_icon_nobg.svg"
import Img from "gatsby-image"


const FeaturedCarouselSlide = props => {
  console.log('slide image: ', props.image)
  return (
    <li
      onClick={props.click}
      className={[
        props.active ? [FeaturedCarouselSlideStyles.active, 'active'].join(' ') : "",
        FeaturedCarouselSlideStyles.slide,
      ].join(" ")}
    >
      <div className={FeaturedCarouselSlideStyles.slideWrapper}>
      <h4>
        <img
          src={props.icon}
          className={FeaturedCarouselSlideStyles.icon}
          alt={[props.title, "icon"].join(" ")}
        />
        {props.title}
        <img
          src={arrow}
          className={FeaturedCarouselSlideStyles.arrow}
          alt={[props.title, "arrow"].join(" ")}
        />
      </h4>
      <div
        className={
          props.active
            ? ["open slide-text space-xs space-sm space-md", FeaturedCarouselSlideStyles.text].join(" ")
            : [FeaturedCarouselSlideStyles.text, "slide-text"].join(" ")
        }
      >
        
          <p className="small">{props.text}</p>
          </div>
          </div>
          {props.active ? 
          <div className={[FeaturedCarouselSlideStyles.imageWrapper, "hidden-lg hidden-xl"].join(' ')}>
          {props.image.fluid ?
            <Img
              fluid={props.image.fluid}
              className={FeaturedCarouselSlideStyles.animate}
              alt={props.image.alt ? props.image.alt : 'Carousel image'}
            />
            :
            <img
              src={props.image.url}
              className={FeaturedCarouselSlideStyles.animate}
              alt={props.image.alt ? props.image.alt : 'Carousel image'}
            />}
            </div>
            : null }
        {/* </div> */}
    </li>
  )
}

export default FeaturedCarouselSlide
