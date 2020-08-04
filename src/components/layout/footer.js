import { Link } from "gatsby"
import logo from "../../images/logo.svg"
import React from "react"
import Img from "gatsby-image"
import LangSwitcher from "../hoc/langSwithcer/langSwitcher"


const Footer = ({ columns, locales, currentLocale, redirect  }) => {


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
          <div className="col col-sm-12 col-lg-4 text-center-sm space-xs space-sm space-md flex-lg middle-lg">
            <ul className="list-inline block-xs flex-lg menu">
              <li>
                <p className="small text-darkgrey">
                  Copyright &#169; 2020 Cobiro
                </p>
              </li>
            </ul>
          </div>
          <div className="col col-sm-12 col-lg-8 text-center-sm space-xs space-sm space-md center-xs end-lg middle-lg flex">
              <ul className="list-inline block-xs flex-lg middle-xs menu">
                <li><Link className="small text-darkgrey" to="/terms-of-service">Terms of Service</Link></li>
                <li><Link className="small text-darkgrey" to="/privacy-policy">Privacy Policy</Link></li>
              <li className="space-xs space-sm space-md"><Link className="small text-darkgrey" to="/sitemap">Sitemap</Link></li>
              <li><LangSwitcher locales={locales} currentLocale={currentLocale} redirect={redirect}/>            </li>
              </ul>
              
          
          </div>
          {/* { locales && locales.length > 1 ?
            <div className="col col-xs-12 col-md-6 text-center-xs text-right-md flex end-md center-xs">
            
          </div>
          : null} */}
        </div>
      </div>
    </div>
  </footer>
)}

export default Footer
