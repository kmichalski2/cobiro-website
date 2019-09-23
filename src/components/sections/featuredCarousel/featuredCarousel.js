import React, { useEffect, useState } from "react"

import FeaturedCarouselStyles from "./featuredCarousel.module.scss"
import FeaturedCarouselSlide from "./featuredCarouselSlide/featuredCarouselSlide"

import Img from "gatsby-image"

const FeaturedCarousel = ({ data }) => {

  console.log(data);
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

  data.slides.slides.map(img => images.push(img.image.fluid));
  console.log(images);

  const clickHandler = index => {
    if (index !== activeSlide) {
      setActiveSlide(index)
      setAnimate(true)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="row center-xs text-center space-xs-up">
          <div className="col col-xs-12 space-xs-up">
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        </div>
        <div className="row center-xs">
          <div
            className={[
              FeaturedCarouselStyles.carousel,
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
                  key={index}
                />
              ))}
            </ul>
          </div>
          <div className="col col-xs-12 col-lg-8">
            {!animate ? (
              <Img
                fluid={images[activeSlide]}
                className={FeaturedCarouselStyles.image}
                alt=""
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCarousel
