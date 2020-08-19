import React, {useState} from "react"
import Img from "gatsby-image"
import Classes from "./expandablePersonsCard.module.scss"
import ExpandedPerson from "./expandedPerson/expandedPerson"

const ExpandablePersonsCard = ({ data }) => {

  const [expanded, setExpanded] = useState(null)

  const expand = (index) => {
    {expanded !== index ?
    setExpanded(index)
    : setExpanded(false)}
  }
  const persons = [...data.people]

  
  const screenWidth = typeof window !== `undefined` ? window.innerWidth < 680 ? 1 : window.innerWidth < 960 ? 2 : 3 : 3
  const [personExpanded, setPersonExpanded] = useState(false)
  
  return (
    <section className="section">
        <div className="container">

          <div className="row center-xs">
            <div className="col col-xs-12 text-center section-header">
              { data.title ? <h2>{data.title}</h2> : null }
              { data.text ? <p>{data.text}</p> : null }
            </div>
            {persons.map((p, index) => (
              //person collapsed
              <>
              <div key={index} onClick={() => expand(index)} className="col col-xs-12 col-md-6 col-lg-4">
                  <div className={[Classes.people, "text-center"].join(' ')}>
                    <div className={Classes.cardHeaderWrapper}>
                      {p.image.fluid ?
                      <Img fluid={p.image.fluid} className={[Classes.image, "card-img-full"].join(' ')} alt={p.name} />
                      : 
                      <img src={p.image.url} className={[Classes.image, "card-img-full"].join(' ')} alt={p.name} />
                      }
                      <div className={[Classes.textWrapper, "between-xs"].join(' ')}>
                        <div className="space-md-up">
                          <h4 className={Classes.name}>{p.name}</h4>
                          <h5 className={Classes.title}>{p.title}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {((index + 1) % screenWidth === 0) && index < expanded + screenWidth || index === (persons.length - 1)?
                  (expanded === index || expanded === index - 1|| expanded === index - 2) ?
                    <ExpandedPerson persons={persons[expanded]} expanded={expanded}/>
                  : null
                : null
                }
              </>
              
            ))}
          </div>
        </div>
    </section>
  )
}

export default ExpandablePersonsCard