import React from "react"
import Img from "gatsby-image"
import linkedin from "../../../images/linkedin.svg"
import * as Classes from "./threeUpPeople.module.scss"


const ThreeUpPeople = ({ data }) => {

  return (
    <section className={[data.backgroundColor ? "bg-sway" : null, "section"].join(' ')}>
      <div className={data.backgroundColor ? "bg-sway-inner" : null}>
        <div className="container">
          <div className="row center-xs">
            <div className="col col-xs-12 text-center section-header">
              { data.title ? <h2>{data.title}</h2> : null }
              { data.text ? <p>{data.text}</p> : null }
            </div>
            {data.people.map((p, index) => (
              <div key={index} className="col col-xs-12 col-md-6 col-lg-4">
              <div className={["card", Classes.people].join(' ')}>
                <div className={Classes.cardHeaderWrapper}>
                  {p.image.fluid ?
                  <Img fluid={p.image.fluid} className={[Classes.image, "card-img-full"].join(' ')} alt={p.name} />
                  : 
                  <img src={p.image.url} className={[Classes.image, "card-img-full"].join(' ')} alt={p.name} />
                  }
                  <div className={[Classes.textWrapper, "flex between-xs text-left"].join(' ')}>
                    <div className="space-md-up">
                      <h4>{p.name}</h4>
                      <h5>{p.title}</h5>
                    </div>
                    <div className={Classes.icons}>
                    { p.customLogo ? 
                      <a className={[Classes.customIcon].join('')} href={p.customLogoLink ? p.customLogoLink : null} target="_blank" rel="noopener noreferrer">
                        <img src={p.customLogo.url} className={Classes.socialIcon}/>
                      </a>
                      : null }
                    {p.linkedinLink ? 
                    <a className={Classes.linkedinLink} href={p.linkedinLink} target="_blank" rel="noopener noreferrer">
                      <img
                        className={Classes.socialIcon}
                        src={linkedin}
                        alt={p.name}
                      />
                    </a>
                    : null}
                    </div>
                  </div>
                </div>
                <p className="small text-left-xs">
                  {p.text}
                </p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ThreeUpPeople
