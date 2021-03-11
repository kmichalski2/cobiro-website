import React, { useEffect, useState } from "react"

import * as Classes from "./featuredCarousel.module.scss"

import FeaturedCarouselSlide from "./featuredCarouselSlide/featuredCarouselSlide"

import Img from "gatsby-image"

const FeaturedCarousel = ({ data }) => {

  const [activeSlide, setActiveSlide] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    const slideTexts = document.querySelectorAll(".slide-text")
    slideTexts.forEach(el => {
      if (el.classList.contains("open")) {
        el.style.maxHeight = el.children[0].offsetHeight + "px"
      } else if (!el.classList.contains("open")) {
        el.style.maxHeight = 0
      }
    })
    setAnimate(false)
  }, [activeSlide])

  const images = []

  data.slides.slides.map(img => images.push(img.image ? img.image : null));
  const clickHandler = index => {
    if (index !== activeSlide) {
      setActiveSlide(index)
      setAnimate(true)
    }
  }

  return (
    <section className={[data.backgroundColor ? "bg-sway" : null, "section"].join(' ')}>
      <div className={data.backgroundColor ? "bg-sway-inner" : null}>
        <div className="container">
          <div className="row center-xs text-center space-xs-up">
            <div className="col col-xs-12 space-xs-up">
              { data.title ? <h2>{data.title}</h2> : null }
              { data.text ? <p>{data.text}</p> : null }
            </div>
          </div>
          <div className="row center-xs">
            <div
              className={[
                Classes.carousel,
                "col col-xs-12 col-lg-4 space-xs-up",
              ].join(" ")}
            >
              <ul className="list-unstyled">
                {data.slides.slides.map((el, index) => (
                  <FeaturedCarouselSlide
                    click={() => clickHandler(index)}
                    active={activeSlide === index ? true : false}
                    title={el.title}
                    text={el.text}
                    icon={el.icon.fixed ? el.icon.fixed : el.icon.url}
                    iconAlt={el.icon.alt ? el.icon.alt : 'Carousel icon'}
                    image={el.image}
                    key={index}
                  />
                ))}
              </ul>
            </div>
            <div className="col col-xs-12 col-lg-8 hidden-xs hidden-sm hidden-md">
              {!animate ? (
                images[activeSlide].fluid ?
                <Img
                  fluid={images[activeSlide].fluid}
                  className={Classes.image}
                  alt={images[activeSlide].alt ? images[activeSlide].alt : 'Carousel image'}
                />
                :
                <img
                  src={images[activeSlide].url}
                  className={Classes.image}
                  alt={images[activeSlide].alt ? images[activeSlide].alt : 'Carousel image'}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCarousel
