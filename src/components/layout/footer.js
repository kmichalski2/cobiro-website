import { Link } from "gatsby"
import logo from "../../images/logo.svg"
import React from "react"
import Img from "gatsby-image"
// import langStyles from '../hoc/langSwithcer/langSwitcher.module.scss'

const Footer = ({ columns, locales, currentLocale }) => {

  let currentLocaleFull = '';

  { 
    currentLocale === 'en' ? currentLocaleFull = 'English' 
  : currentLocale === 'es' ? currentLocaleFull = 'Spanish'
  : currentLocale === 'fr' ? currentLocaleFull = 'French'
  : currentLocale === 'ge' ? currentLocaleFull = 'German'
  : currentLocale === 'it' ? currentLocaleFull = 'Italian'
  : currentLocaleFull = 'Select Language'
  }

  return (
  <footer>
    <div className="container">
      <div className="row section end-sm">
        {columns.sort(function (a, b) {
          return a.footerItemOrder - b.footerItemOrder;
        }).map((col, index) => (
          <div key={index} className="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md">
           <h4 className="space-xs-up">{col.columnHeading}</h4>
           <ul className="list-unstyled menu">
             {col.column.map((el, index) => (
               <li key={index} className={el.text ? 'text-darkgrey' : null}>
                { el.text ?
                  el.text
                 : el.image ?
                 <a href={el.externalLink}  target="_blank" rel="noopener noreferrer">
                   {el.image.fixed ?
                    <Img fixed={el.image.fixed} className="footer-image" alt={el.image.alt ? el.image.alt : 'Footer image'} />
                    :
                    <img src={el.image.url} className="footer-image" alt={el.image.alt ? el.image.alt : 'Footer image'} />
                  }
                 </a>
                 : (el.externalLink) ? 
                 <a className="small text-darkgrey" href={el.externalLink} target="_blank" rel="noopener noreferrer">{el.linkTitle}</a> 
                 : el.internalLink ?
                 <Link className="small text-darkgrey" to={`/${el.internalLink.slug}`}>{el.linkTitle}</Link>
                : el.googlePartnerLogo ?
                  <div className="g-partnersbadge" data-agency-id="1850113825"></div>
                : null }
               </li>
             ))}
           </ul>
         </div>
        ))}
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row space-between">
        <div className="col col-sm-12 col-md-6 col-lg-8 text-center-sm space-xs space-sm">
            <ul className="list-inline block-xs flex-md menu">
              <li>
                <p className="small text-darkgrey">
                  Copyright &#169; 2020 Cobiro
                </p>
              </li>
            </ul>
          </div>
          <div className="col col-sm-12 col-md-6 col-lg-4 text-center-sm space-xs space-sm justify-between-lg justify-between-xl justify-between-md">
              <ul><Link className="small text-darkgrey" to="/terms-of-service">Terms of Service</Link></ul>
              <ul><Link className="small text-darkgrey" to="/privacy-policy">Privacy Policy</Link></ul>
              <ul><Link className="small text-darkgrey" to="/sitemap">Sitemap</Link></ul>
          { locales && locales.length > 1 ?
            <div className="col col-xs-12 col-md-6 text-center-xs text-right-md">
            <div className={[langStyles.wrapper, langStyles.up].join(' ')}>
              <p className={[langStyles.currLang, "no-mb text-small"].join(' ')}>{currentLocaleFull}</p>
                <ul className={["list-unstyled", langStyles.otherLangs].join(' ')}>
                  {locales.map((l, i) => 
                    <li key={i}>
                      {currentLocale !== l.locale ?
                        <Link to={`${l.locale === 'en' ? '/' : `/${l.locale}`}/${l.value}`} style={{color: 'white'}}>
                          {
                            l.locale === 'en' ? 'English' 
                          : l.locale === 'es' ? 'Spanish' 
                          : l.locale === 'fr' ? 'French'
                          : l.locale === 'ge' ? 'German'
                          : l.locale === 'it' ? 'Italian'
                          : null 
                          }
                        </Link>
                      : null }
                    </li>
                  )}
                </ul>
            </div>
            </div>
          : null}
          </div>
        </div>
      </div>
    </div>
  </footer>
)}

export default Footer
