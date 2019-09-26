import { Link } from "gatsby"
import React from "react"
import splash from "../../images/jumbocta-splash.png"

const JumboCta = ({ data }) => (
  <section className="section" style={{ position: "relative" }}>
    <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
      <div className="container">
        <div className="row center-xs text-center">
          <div className="col col-xs-12">
            <h2>{data.title}</h2>
            <p>{data.text}</p>
            {data.link ? 
            <Link
            to={data.link.slug ? data.link.slug : '/'}
            className="btn btn-large space-xs space-sm"
            >
              {data.linkTitle}
            </Link>
            : null}
          </div>
        </div>
      </div>
    </div>
    <img
      src={splash}
      alt="splash background"
      style={{
        width: "400px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-40%, -55%)",
        zIndex: 0,
      }}
    />
  </section>
)

export default JumboCta
