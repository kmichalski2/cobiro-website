import React from "react"
import * as Classes from "./quotes.module.scss"
import Img from "gatsby-image"
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Link } from "gatsby";
import Section from '../../UiElements/Section/Section'

const Quotes = ({ data }) => {

  const bgColor = data.quotesBgColor && data.quotesColor ? data.quotesColor.hex : null
  const textColor = data.quotesBgColor && data.textColor === 'light' ? "text-white" : "text-black"
  
  return (
    <Section
      bgColor={bgColor}
    >
      <div className="row section-header">
        <div className="col col-xs-12 text-center">
          { data.title ? <h2 className={textColor}>{data.title}</h2> : null }
          { data.text ? <p className={textColor}>{data.text}</p> : null }
        </div>
      </div>
      <Carousel
        // itemWidth={700}
        // itemWidth={250}
        offset={0} 
        slidesPerPage={4}
        centered={true} 
        stopAutoPlayOnHover={false}
        animationSpeed={1000}
        autoPlay={5000}
        infinite={true}
        breakpoints={{
          2800: {
            slidesPerPage: 4,
          }, 
          2200: {
            slidesPerPage: 3,
          }, 
          2000: {
            slidesPerPage: 2,
          },
          950: {
            slidesPerPage: 1,
          },
          650: {
            slidesPerPage: 1,
            animationSpeed: 1000,
            offset: 0,
            centered: true,
          },
        }}
        className={[Classes.cards, Classes.slider].join(" ")}>
        {data.quotes ?
        data.quotes.quotes.map((q, index) => (
          <div
          key={index}
          className={[Classes.quote, Classes.quotesCard, "card card-visible text-left-xs"].join(" ")}
        >
        <p className={["text-black space-xs-up", Classes.quotesText].join(' ')}>
        {q.quoteText}
      </p>
          <div className="flex start-xs middle-xs">
          {q.imageLeft && q.imageLeft.fixed ?
              <Img fixed={q.imageLeft.fixed}
                className={["img-fluid", Classes.icon].join(' ')}
                alt={q.imageLeft.alt ? q.imageLeft.alt : 'Quote'}
              />
              : q.imageLeft ?
              <img src={q.imageLeft.url}
                className={["img-fluid", Classes.icon].join(' ')}
                alt={q.imageLeft.alt ? q.imageLeft.alt : 'Quote'}
              />
              : null
            }
            {/* <img src={placeholderImage} className="img-fluid" alt="quote" /> */}
            <div>
              <p className="small text-bold">{q.person}</p>
              <div className="flex middle-xs">
                {q.flag ? 
                q.flag.fixed ?
                <Img fixed={q.flag.fixed}
                  className={Classes.flag}
                  alt={q.flag.alt ? q.flag.alt : 'Flag'}
                />
                :
                <img src={q.flag.url}
                  className={Classes.flag}
                  alt={q.flag.alt ? q.flag.alt : 'Flag'}
                />
                : null
                }
                <p className="small">{q.country}</p>
              </div>
            </div>
          </div>
         
        </div>
        )) 
        : null }
      </Carousel>
      { /* data.linkTitleQuotes && data.internalLinkQuotes ?
      <div className="row">
        <div className="col col-xs-12 text-center">
        <Link className={["btn btn-primary", Classes.button].join(' ')} to={data.internalLinkQuotes.slug ? data.internalLinkQuotes.slug : '/'}>{data.linkTitleQuotes}</Link>
        </div>
      </div>
      : data.linkTitleQuotes && data.externalLinkQuotes ?
      <div className="row">
        <div className="col col-xs-12 text-center">
          <a className={["btn btn-primary", Classes.button].join(' ')} href={data.externalLinkQuotes} target="_blank" rel="noopener noreferrer">{data.linkTitleQuotes}</a>
        </div>
      </div>
      : null */}
  </Section>
)}

export default Quotes
