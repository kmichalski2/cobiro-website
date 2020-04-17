import { Link } from "gatsby"
import React from "react"
import Section from '../../UiElements/Section/Section'

import Classes from "./jumboCta.module.scss"
import Waves from "../../waves/waves"


const JumboCta = ({ data }) => {

  // const bgColor = data.bgColor ? data.ctaBackgroundColor.hex : null
  // const textColor = data.textColor === 'dark' ? "text-black" : "text-white"
  // const btnColor = data.textColor === 'light' ? "btn-white" : null

  const bgColor = "lightgrey"
  const textColor = "text-black"
  const btnColor = null

  return (
    <Section
      bgColor={bgColor}
      textColor={textColor}
      btnColor={btnColor}
    >
        <div className="container">
          <div className="row center-xs text-center">
            <div className="col col-xs-12">
              { data.title ? <h2 className={textColor}>{data.title}</h2> : null }
              { data.text ? <p className={textColor}>{data.text}</p> : null }
              {data.link ? 
              <Link
              to={data.link.slug ? data.link.slug : '/'}
              className={["btn btn-large space-xs space-sm", data.backgroundColor ? 'btn-white' : null].join(' ')}
              >
                {data.linkTitle}
              </Link>
              : data.externalLinkCta ?
              <a
              href={data.externalLinkCta}
              className={["btn btn-large space-xs space-sm", btnColor].join(' ')} target="_blank"
              rel="noopener noreferrer">
                {data.linkTitle}
              </a>
              : null }
            </div>
          </div>
        </div>

    </Section>
  )
}

export default JumboCta
