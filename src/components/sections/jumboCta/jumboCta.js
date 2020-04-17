import { Link } from "gatsby"
import React from "react"
import Section from '../../UiElements/Section/Section'

import Classes from "./jumboCta.module.scss"
import Waves from "../../waves/waves"


const JumboCta = ({ data }) => {

  const bgColor = data.ctaBgColor && data.ctaBackgroundColor.hex ? data.ctaBackgroundColor.hex : null
  const textColor = data.ctaBgColor && data.textColor === 'light' ? "text-white" : "text-black"
  const btnColor = data.ctaBgColor && data.textColor === 'light' ? "btn-white" : null

  return (
    <Section
      bgColor={bgColor}
    >
        <div className="container">
          <div className="row center-xs text-center">
            <div className="col col-xs-12">
              { data.title ? <h2 className={textColor}>{data.title}</h2> : null }
              { data.text ? <p className={textColor}>{data.text}</p> : null }
              {data.link ? 
              <Link
              to={data.link.slug ? data.link.slug : '/'}
              className="btn btn-large space-xs space-sm"
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
