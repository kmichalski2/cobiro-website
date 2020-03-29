import { Link } from "gatsby"
import React from "react"

const ThreeUpPeople = props => {
  const data = props.data

  const createMarkup = (html) => {
    return {__html: html}
  }

  return (
    <section className={[data.backgroundColor ? "bg-sway" : null, "section"].join(' ')}>
      <div className={data.backgroundColor ? "bg-sway-inner" : null}>
      <div className="container">
        <div className="row center-xs">
          {data.title || data.text ? (
            <div className="col col-xs-12 text-center section-header">
              {data.title ? <h2>{data.title}</h2> : null}
              {data.text ? <div dangerouslySetInnerHTML={createMarkup(data.text)}></div> : null}
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
                  <div className="small space-xs-up" dangerouslySetInnerHTML={createMarkup(data.box1Text)}></div>
                  {data.box1Footnote ? <p className="text-xs-small text-italic">{data.box1Footnote}</p> : null}
                  {data.box1Link ? 
                  <Link to={data.box1Link.slug ? `/${data.box1Link.slug}` : '/'} className="small">
                  {data.box1LinkText}
                  </Link>
                  : data.box1ExternalLink ?
                  <a className="small" href={data.box1ExternalLink} target="_blank">{data.box1LinkText}</a>
                  : null }
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
                  <div className="small space-xs-up" dangerouslySetInnerHTML={createMarkup(data.box2Text)}></div>
                  {data.box2Footnote ? <p className="text-xs-small text-italic">{data.box2Footnote}</p> : null}
                  {data.box2Link ?
                  <Link to={data.box2Link.slug ? `/${data.box2Link.slug}` : '/'} className="small">
                    {data.box2LinkText}
                  </Link>
                  : data.box2ExternalLink ?
                  <a className="small" href={data.box2ExternalLink} target="_blank">{data.box2LinkText}</a>
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
                  <div className="small space-xs-up" dangerouslySetInnerHTML={createMarkup(data.box3Text)}></div>
                  {data.box3Footnote ? <p className="text-xs-small text-italic">{data.box3Footnote}</p> : null}
                  {data.box3Link ?
                  <Link to={data.box3Link.slug ? `/${data.box3Link.slug}` : '/'} className="small">
                    {data.box3LinkText}
                  </Link>
                  : data.box3ExternalLink ?
                  <a className="small" href={data.box3ExternalLink} target="_blank">{data.box3LinkText}</a>
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
                  <div className="small space-xs-up" dangerouslySetInnerHTML={createMarkup(data.box4Text)}></div>
                  {data.box4Footnote ? <p className="text-xs-small text-italic">{data.box4Footnote}</p> : null}
                  {data.box4Link ?
                  <Link to={data.box4Link.slug ? `/${data.box4Link.slug}` : '/'} className="small">
                    {data.box4LinkText}
                  </Link>
                  : data.box4ExternalLink ?
                  <a className="small" href={data.box4ExternalLink} target="_blank">{data.box4LinkText}</a>
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
                  <div className="small space-xs-up" dangerouslySetInnerHTML={createMarkup(data.box5Text)}></div>
                  {data.box5Footnote ? <p className="text-xs-small text-italic">{data.box5Footnote}</p> : null}
                  {data.box5Link ?
                  <Link to={data.box5Link.slug ? `/${data.box5Link.slug}` : '/'} className="small">
                    {data.box5LinkText}
                  </Link>
                  : data.box5ExternalLink ?
                  <a className="small" href={data.box5ExternalLink} target="_blank">{data.box5LinkText}</a>
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
                  <div className="small space-xs-up" dangerouslySetInnerHTML={createMarkup(data.box6Text)}></div>
                  {data.box6Footnote ? <p className="text-xs-small text-italic">{data.box6Footnote}</p> : null}

                  {data.box6Link ?
                  <Link to={data.box6Link.slug ? `/${data.box6Link.slug}` : '/'} className="small">
                    {data.box6LinkText}
                  </Link>
                  : data.box6ExternalLink ?
                  <a className="small" href={data.box6ExternalLink} target="_blank">{data.box6LinkText}</a>
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
