import React from 'react'
import Img from "gatsby-image"
import linkedin from "../../../../images/linkedin.svg"
import * as Classes from "../expandablePersonsCard.module.scss"

const ExpandedPerson = ( {persons, expanded} ) => {
    
  const p = persons
    
    return (
        <>
            <div className={["col col-xs-12", Classes.expPersonCard, Classes.fadeIn].join(' ')}>
                <div className="row">
                  <div className="col col-xs-12 col-md-4 hidden-sm">
                    { p.image.fluid ?
                      <Img fluid={p.image.fluid} className={[Classes.image, "space-xs space-sm space-md"].join(' ')} alt={p.name} />
                      :
                      <img src={p.image.url} className={[Classes.image].join(' ')} alt={p.name} />
                    }
                   </div>
                   <div className="col col-xs-12 col-md-8">
                      <h4>{p.name}</h4>
                      <h5 className={Classes.jobTitle}> {p.title}</h5>
                      {p.linkedinLink ? 
                        <a className={Classes.linkedinLink} href={p.linkedinLink} target="_blank" rel="noopener noreferrer">
                          <img
                            className={Classes.socialIcon}
                            src={linkedin}
                            alt={p.name}
                          />
                        </a>
                        : null}
                      <p className="small text-left-xs">
                        {p.text}
                      </p>
                  </div>
                </div>
            </div>
          </>
    )
}

export default ExpandedPerson
