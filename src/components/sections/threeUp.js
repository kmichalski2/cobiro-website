import { Link } from "gatsby"
import React from "react"
import icon from "../../images/placeholder_icon.svg"
import icon2 from "../../images/placeholder_icon2.png"
import icon3 from "../../images/placeholder_icon3.png"
import splash from "../../images/video-splash-left.png"


const ThreeUpPeople = props => {
  const data = props.data
  console.log(data)
  return (
    <section className="section">
      <div className="container">
        <div className="row center-xs">
          {data.title || data.text ? (
            <div className="col col-xs-12 text-center section-header">
              {data.title ? <h2>{data.title}</h2> : null}
              {data.text ? <p>{data.text}</p> : null}
            </div>
          ) : null}

          {data.box1Title || data.box1Text ? (
            <div className="col col-xs-12 col-md-4">
              <div className="card">
                <img
                  src={data.box1Icon.url}
                  className="three-up-icon"
                  alt={data.box1Icon.alt ? data.box1Icon.alt : data.box1Title}
                />
                <div className="text-left text-center-md">
                  <h4>{data.box1Title}</h4>
                  <p className="small">{data.box1Text}</p>
                  <Link to={data.box1Link.slug} className="small">
                    {data.box1LinkText}
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
          {data.box2Title || data.box2Text ? (
            <div className="col col-xs-12 col-md-4">
              <div className="card">
                <img
                  src={data.box2Icon.url}
                  className="three-up-icon"
                  alt={data.box2Icon.alt ? data.box2Icon.alt : data.box2Title}
                />
                <div className="text-left text-center-md">
                  <h4>{data.box2Title}</h4>
                  <p className="small">{data.box1Text}</p>
                  <Link to={data.box2Link.slug} className="small">
                    {data.box2LinkText}
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
          {data.box3Title || data.box3Text ? (
            <div className="col col-xs-12 col-md-4">
              <div className="card">
                <img
                  src={data.box3Icon.url}
                  className="three-up-icon"
                  alt={data.box3Icon.alt ? data.box3Icon.alt : data.box3Title}
                />
                <div className="text-left text-center-md">
                  <h4>{data.box3Title}</h4>
                  <p className="small">{data.box1Text}</p>
                  <Link to={data.box3Link.slug} className="small">
                    {data.box3LinkText}
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default ThreeUpPeople
