import React from "react"
import Img from "gatsby-image"
import linkedin from "../../../images/linkedin.svg"
import ThreeUpPeopleStyles from "./threeUpPeople.module.scss"


const ThreeUpPeople = ({ data }) => {

  console.log(data)

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
              <div className={["card", ThreeUpPeopleStyles.people].join(' ')}>
                <div className={ThreeUpPeopleStyles.cardHeaderWrapper}>
                  {p.image.fluid ?
                  <Img fluid={p.image.fluid} className={[ThreeUpPeopleStyles.image, "card-img-full"].join(' ')} alt={p.name} />
                  : 
                  <img src={p.image.url} className={[ThreeUpPeopleStyles.image, "card-img-full"].join(' ')} alt={p.name} />
                  }
                  <div className={[ThreeUpPeopleStyles.textWrapper, "flex between-xs text-left"].join(' ')}>
                    <div className="space-md-up">
                      <h4>{p.name}</h4>
                      <h5>{p.title}</h5>
                    </div>
                    {p.linkedinLink ? 
                    <a className={ThreeUpPeopleStyles.linkedinLink} href={p.linkedinLink} target="_blank" rel="noopener noreferrer">
                      <img
                        className={ThreeUpPeopleStyles.socialIcon}
                        src={linkedin}
                        alt={p.name}
                      />
                    </a>
                    : null}
                    <img src={p.image.url}/>
                    { /* p.customLogo.fluid ?
                      <Img className={ThreeUpPeopleStyles.socialIcon} fluid={p.customLogo.fluid} alt={p.name}/>
                    : null }
                    { p.customLogo.url ?
                      <a className={ThreeUpPeopleStyles.customIcon} alt="test" src={p.customLogo.url} href={p.customLogoLink} target="_blank" rel="noopener noreferrer" />
                    : null */}
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
