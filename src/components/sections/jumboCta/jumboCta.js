import { Link } from "gatsby"
import React from "react"

import JumboCtaStyles from "./jumboCta.module.scss"


const JumboCta = ({ data }) => {
  const topColor = data.topGradiantColor ? data.topGradiantColor.hex : null
  const bottomColor = data.bottomGradiantColor ? data.bottomGradiantColor.hex : null

  const transparentSways = (
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" x="0" y="0" viewBox="0 0 1920.28 259.65" className={JumboCtaStyles.whiteSways}>
      <g>
        <path data-name="Path 4909" className="cls-1" d="M0,181.54c230.83,28.07,530,27.7,759.25-1,130.46-16.31,237.69-40.75,371.12-55.86C1383.67,96,1718.66,107.54,1920,151.86l.28,107.42L0,259.19Z" fill="#fff" opacity="0.1"/>
        <path data-name="Path 4978" className="cls-1" d="M0,139.81c230.83,54.1,530,53.4,759.25-1.87C889.71,106.5,996.94,59.41,1130.37,30.28,1383.67-25,1718.66-2.82,1920,82.61l.28,177H0Z" fill="#fff" opacity="0.1"/>
      </g></svg>
  )

  const whiteSway = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 150" preserveAspectRatio="xMidYMid slice" x="0" y="0" className={[JumboCtaStyles.whiteSways, JumboCtaStyles.whiteSway].join(' ')}><g data-name="Lag 2"><g data-name="Lag 1"><path data-name="Path 4929" d="M0,72.55c230.83,28.07,530,27.7,759.25-1C889.71,55.23,996.94,30.8,1130.37,15.69,1383.67-13,1718.66-1.45,1920,42.87V150H0Z" fill="#fff"/></g></g></svg>
  )

  return (
    <section className={[JumboCtaStyles.section, data.backgroundColor ? JumboCtaStyles.withBg : null, "section"].join(' ')} style={{backgroundImage: data.backgroundColor ? `linear-gradient(${topColor}, ${bottomColor})` : null}}>
      { data.backgroundColor ? whiteSway : null }
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
      { data.backgroundColor ? transparentSways : null }
    </section>
  )
}

export default JumboCta
