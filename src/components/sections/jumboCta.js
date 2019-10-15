import { Link } from "gatsby"
import React from "react"

const JumboCta = ({ data }) => (
  <section className={[data.backgroundColor ? "bg-sway" : null, "section"].join(' ')} style={{ position: "relative" }}>
    <div className={[data.backgroundColor ? "bg-sway-inner" : null, "section-inner"].join(' ')} style={{ position: "relative", zIndex: 1 }}>
      <div className="container">
        <div className="row center-xs text-center">
          <div className="col col-xs-12">
            { data.title ? <h2>{data.title}</h2> : null }
            { data.text ? <p>{data.text}</p> : null }
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
            className="btn btn-large space-xs space-sm" target="_blank"
            >
              {data.linkTitle}
            </a>
            : null }
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default JumboCta
