import { Link } from "gatsby"
import React from "react"
import linkedin from "../../images/linkedin.svg"
import Img from "gatsby-image"


const ThreeUpPeople = ({ data }) => {
  const peopleClickHandler = event => {
    const el = event.target
    const text = el.previousElementSibling
    const textHeight = text.scrollHeight

    if (el.parentNode.classList.contains("expand")) {
      el.innerText = "View full profile"
      text.style.maxHeight = null
    } else {
      el.innerText = "Hide full profile"
      text.style.maxHeight = textHeight + "px"
    }
    el.parentNode.classList.toggle("expand")
  }

  return (
    <section className="section">
      <div className="container">
        <div className="row center-xs">
          <div className="col col-xs-12 text-center section-header">
            { data.title ? <h2>{data.title}</h2> : null }
            { data.text ? <p>{data.text}</p> : null }
          </div>
          {data.people.map((p, index) => (
            <div key={index} className="col col-xs-12 col-md-6 col-lg-4">
            <div className="card people">
              <div className="card-header-wrapper">
                {p.image.fluid ?
                <Img fluid={p.image.fluid} className="card-img-full" alt={p.name} />
                : 
                <img src={p.image.url} className="card-img-full" alt={p.name} />
                }
                <div className="flex middle-xs between-xs text-left">
                  <div>
                    <h4>{p.name}</h4>
                    <h5>{p.title}</h5>
                  </div>
                  {/* {p.linkedinLink ? 
                  <Link to={p.linkedinLink} target="_blank">
                    <img
                      className="social-icon"
                      src={linkedin}
                      alt="Bo Krogsgaard"
                    />
                  </Link>
                  : null} */}
                </div>
              </div>
              <p className="small text-left-xs people-description">
                {p.text}
              </p>
              <button
                className="btn hidden-md-up"
                onClick={peopleClickHandler}
                aria-label="View full profile"
              >
                View full profile
              </button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ThreeUpPeople
