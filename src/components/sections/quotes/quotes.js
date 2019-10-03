import React from "react"
import QuoteStyles from "./quotes.module.scss"
import placeholderImage from "../../../images/placeholder_round.svg"
import placeholderFlag from "../../../images/placeholder_flag.png"
import Img from "gatsby-image"


const Quotes = ({ data }) => {
  console.log('quotes data: ', data);
  return (
  <section className="section">
    <div className="container-fluid">
      <div className="row section-header">
        <div className="col col-xs-12 text-center">
          <h2>{data.title}</h2>
          <p>{data.text}</p>
        </div>
      </div>
      <div className={[QuoteStyles.cards, "flex"].join(" ")}>
        {data.quotes.quotes.map((q, index) => (
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
        ))}    
      </div>
    </div>
  </section>
)}

export default Quotes
