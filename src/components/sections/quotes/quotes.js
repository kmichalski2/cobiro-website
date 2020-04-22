import React from "react"
import QuoteStyles from "./quotes.module.scss"
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
    <div className={[data.backgroundColor ? "bg-sway-inner" : null, "container-fluid"].join(' ')}>
      <div className="row section-header">
        <div className="col col-xs-12 text-center">
          { data.title ? <h2 className={textColor}>{data.title}</h2> : null }
          { data.text ? <p className={textColor}>{data.text}</p> : null }
        </div>
      </div>
      <Carousel
        itemWidth={700}
        // itemWidth={250}
        offset={32} 
        slidesPerPage={4}
        centered={false} 
        stopAutoPlayOnHover={false} 
        animationSpeed={8000} 
        autoPlay={8000} 
        infinite={true}
        breakpoints={{
          1500: {
            slidesPerPage: 3,
          }, 
          1200: {
            slidesPerPage: 2,
          },
          650: {
            slidesPerPage: 1,
            animationSpeed: 1000,
            autoPlay: 3000,
            offset: 0,
            centered: true,
          },
        }}
        className={[QuoteStyles.cards, QuoteStyles.slider].join(" ")}>
        {data.quotes ?
        data.quotes.quotes.map((q, index) => (
          <div
          key={index}
          className={[QuoteStyles.quote, QuoteStyles.quotesCard, "card card-visible text-left-xs"].join(" ")}
        >
        <p className="h2 space-xs-up">
        {q.quoteText}
      </p>
          <div className="flex start-xs middle-xs">
          {q.imageLeft && q.imageLeft.fixed ?
              <Img fixed={q.imageLeft.fixed}
                className="img-fluid"
                alt={q.imageLeft.alt ? q.imageLeft.alt : 'Quote'}
              />
              : q.imageLeft ?
              <img src={q.imageLeft.url}
              className="img-fluid"
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
                  className={QuoteStyles.flag}
                  alt={q.flag.alt ? q.flag.alt : 'Flag'}
                />
                :
                <img src={q.flag.url}
                  className={QuoteStyles.flag}
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
        <Link className={["btn btn-primary", QuoteStyles.button].join(' ')} to={data.internalLinkQuotes.slug ? data.internalLinkQuotes.slug : '/'}>{data.linkTitleQuotes}</Link>
        </div>
      </div>
      : data.linkTitleQuotes && data.externalLinkQuotes ?
      <div className="row">
        <div className="col col-xs-12 text-center">
          <a className={["btn btn-primary", QuoteStyles.button].join(' ')} href={data.externalLinkQuotes} target="_blank" rel="noopener noreferrer">{data.linkTitleQuotes}</a>
        </div>
      </div>
      : null */}
    </div>
  </Section>
)}

export default Quotes
