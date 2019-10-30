import React from "react"
import QuoteStyles from "./quotes.module.scss"
import placeholderImage from "../../../images/placeholder_round.svg"
import Img from "gatsby-image"
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const Quotes = ({ data }) => {

  return (
  <section className={[data.backgroundColor ? "bg-sway" : null, "section"].join(' ')}>
    <div className={[data.backgroundColor ? "bg-sway-inner" : null, "container-fluid"].join(' ')}>
      <div className="row section-header">
        <div className="col col-xs-12 text-center">
          { data.title ? <h2>{data.title}</h2> : null }
          { data.text ? <p>{data.text}</p> : null }
        </div>
      </div>
      <Carousel 
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
          className={[
            QuoteStyles.quote,
            "card card-visible text-left-xs",
          ].join(" ")}
        >
          <div className="flex start-xs middle-xs space-xs-up">
            <img src={placeholderImage} className="img-fluid" alt="quote" />
            <div>
              <p className="small text-bold">{q.person}</p>
              <div className="flex middle-xs">
                {q.flag.fixed ?
                <Img fixed={q.flag.fixed}
                  className={QuoteStyles.flag}
                  alt={q.flag.alt ? q.flag.alt : 'Flag'}
                />
                :
                <img src={q.flag.url}
                  className={QuoteStyles.flag}
                  alt={q.flag.alt ? q.flag.alt : 'Flag'}
                />
                }
                <p className="small">{q.country}</p>
              </div>
            </div>
          </div>
          <p className="small">
            {q.quoteText}
          </p>
        </div>
        )) 
        : null }   
      </Carousel>
    </div>
  </section>
)}

export default Quotes
