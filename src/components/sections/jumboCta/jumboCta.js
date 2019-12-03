import { Link } from "gatsby"
import React from "react"

import JumboCtaStyles from "./jumboCta.module.scss"
import Waves from "../../waves/waves"


const JumboCta = ({ data }) => {
  const topColor = data.topGradiantColor ? data.topGradiantColor.hex : null
  const bottomColor = data.bottomGradiantColor ? data.bottomGradiantColor.hex : null

  return (
    <section className={[JumboCtaStyles.section, data.backgroundColor ? JumboCtaStyles.withBg : null, "section"].join(' ')} style={{backgroundImage: data.backgroundColor ? `linear-gradient(${topColor}, ${bottomColor})` : null}}>
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
      <Waves whiteSway={data.backgroundColor ? true : false} transparentSways={data.backgroundColor ? true : false} highWaveRight={true} whiteSwayTop={true}/>
    </section>
  )
}

export default JumboCta
