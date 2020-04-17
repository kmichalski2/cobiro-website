import { Link } from "gatsby"
import React from "react"
import Section from '../../UiElements/Section/Section'

import Classes from "./jumboCta.module.scss"
import Waves from "../../waves/waves"


const JumboCta = ({ data }) => {

  const bgColor = data.backgroundColor ? data.ctaBackgroundColor : null

  const bgColor = data.bgColor ? data.bgColor.hex : null
  const alignment = data.alignment
  const imageToEdges = data.imageToEdges
  const textColor = data.textColor === 'dark' ? "text-black" : "text-white"
  const btnColor = data.textColor === 'light' ? "btn-white" : null

  return (
    <Section
      bgColor={data.backgroundColor ? bgColor : null}
    >
      <div className={[data.backgroundColor ? "bg-sway-inner" : null, "section-inner"].join(' ')} style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <div className="row center-xs text-center">
            <div className="col col-xs-12">
              { data.title ? <h2 className={data.backgroundColor ? 'text-white' : null}>{data.title}</h2> : null }
              { data.text ? <p className={data.backgroundColor ? 'text-white' : null}>{data.text}</p> : null }
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
              className={["btn btn-large space-xs space-sm", data.backgroundColor ? 'btn-white' : null].join(' ')} target="_blank"
              rel="noopener noreferrer">
                {data.linkTitle}
              </a>
              : null }
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default JumboCta
