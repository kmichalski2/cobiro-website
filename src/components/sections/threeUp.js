import { Link } from "gatsby"
import React from "react"

const ThreeUpPeople = props => {
  const data = props.data
  return (
    <section className={[data.backgroundColor ? "bg-sway" : null, "section"].join(' ')}>
      <div className={data.backgroundColor ? "bg-sway-inner" : null}>
      <div className="container">
        <div className="row center-xs">
          {data.title || data.text ? (
            <div className="col col-xs-12 text-center section-header">
              {data.title ? <h2>{data.title}</h2> : null}
              {data.text ? <p>{data.text}</p> : null}
            </div>
          ) : null}

          {data.box1Title && data.box1Text && data.box1Icon ? (
            <div className="col col-xs-12 col-md-4">
              <div className="card">
                <img
                  src={data.box1Icon.url}
                  className="three-up-icon space-xs-up"
                  alt={data.box1Icon.alt ? data.box1Icon.alt : data.box1Title}
                />
                <div className="text-left text-center-md">
                  <h4>{data.box1Title}</h4>
                  <p className="small">{data.box1Text}</p>
                  {data.box1Link ? 
                  <Link to={data.box1Link.slug ? `/${data.box1Link.slug}` : '/'} className="small">
                  {data.box1LinkText}
                  </Link>
                  : null}
                </div>
              </div>
            </div>
          ) : null}

          {data.box2Title && data.box2Text && data.box2Icon ? (
            <div className="col col-xs-12 col-md-4">
              <div className="card">
                <img
                  src={data.box2Icon.url}
                  className="three-up-icon space-xs-up"
                  alt={data.box2Icon.alt ? data.box2Icon.alt : data.box2Title}
                />
                <div className="text-left text-center-md">
                  <h4>{data.box2Title}</h4>
                  <p className="small">{data.box2Text}</p>
                  {data.box2Link ?
                  <Link to={data.box2Link.slug ? `/${data.box2Link.slug}` : '/'} className="small">
                    {data.box2LinkText}
                  </Link>
                  : null }
                </div>
              </div>
            </div>
          ) : null}

          {data.box3Title && data.box3Text && data.box3Icon ? (
            <div className="col col-xs-12 col-md-4">
              <div className="card">
                <img
                  src={data.box3Icon.url}
                  className="three-up-icon space-xs-up"
                  alt={data.box3Icon.alt ? data.box3Icon.alt : data.box3Title}
                />
                <div className="text-left text-center-md">
                  <h4>{data.box3Title}</h4>
                  <p className="small">{data.box3Text}</p>
                  {data.box3Link ?
                  <Link to={data.box3Link.slug ? `/${data.box3Link.slug}` : '/'} className="small">
                    {data.box3LinkText}
                  </Link>
                  : null}
                </div>
              </div>
            </div>
          ) : null}
          
          {data.box4Title && data.box4Text && data.box4Icon ? (
            <div className="col col-xs-12 col-md-4">
              <div className="card">
                <img
                  src={data.box4Icon.url}
                  className="three-up-icon space-xs-up"
                  alt={data.box4Icon.alt ? data.box4Icon.alt : data.box4Title}
                />
                <div className="text-left text-center-md">
                  <h4>{data.box4Title}</h4>
                  <p className="small">{data.box4Text}</p>
                  {data.box4Link ?
                  <Link to={data.box4Link.slug ? `/${data.box4Link.slug}` : '/'} className="small">
                    {data.box4LinkText}
                  </Link>
                  : null}
                </div>
              </div>
            </div>
          ) : null}

          {data.box5Title && data.box5Text && data.box5Icon ? (
            <div className="col col-xs-12 col-md-4">
              <div className="card">
                <img
                  src={data.box5Icon.url}
                  className="three-up-icon space-xs-up"
                  alt={data.box5Icon.alt ? data.box5Icon.alt : data.box5Title}
                />
                <div className="text-left text-center-md">
                  <h4>{data.box5Title}</h4>
                  <p className="small">{data.box5Text}</p>
                  {data.box5Link ?
                  <Link to={data.box5Link.slug ? `/${data.box5Link.slug}` : '/'} className="small">
                    {data.box5LinkText}
                  </Link>
                  : null}
                </div>
              </div>
            </div>
          ) : null}

          {data.box6Title && data.box6Text && data.box6Icon ? (
            <div className="col col-xs-12 col-md-4">
              <div className="card">
                <img
                  src={data.box6Icon.url}
                  className="three-up-icon space-xs-up"
                  alt={data.box6Icon.alt ? data.box6Icon.alt : data.box6Title}
                />
                <div className="text-left text-center-md">
                  <h4>{data.box6Title}</h4>
                  <p className="small">{data.box6Text}</p>
                  {data.box6Link ?
                  <Link to={data.box6Link.slug ? `/${data.box6Link.slug}` : '/'} className="small">
                    {data.box6LinkText}
                  </Link>
                  : null}
                </div>
              </div>
            </div>
          ) : null}

        </div>
      </div>
      </div>
    </section>
  )
}

export default ThreeUpPeople
