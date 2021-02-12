import { Link } from "gatsby"
import logo from "../../images/logo.svg"
import React from "react"
import Img from "gatsby-image"
import LangSwitcher from "../hoc/langSwithcer/langSwitcher"
import AnyLink from "../UiElements/AnyLink/AnyLink"


const Footer = ({ columns, locales, currentLocale, redirect, bottomLinks }) => {
  return (
  <footer>
    <div className="container">
      <div className="row section end-sm text-center-xs text-left-sm">
      <div className="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md flex-xs block-sm">
          <LangSwitcher locales={locales} currentLocale={currentLocale} redirect={redirect}/>  
        </div>
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
                 <AnyLink link={el.externalLink} title={el.linkTitle} external={true} noArrow noPadding regular classes="small text-darkgrey"/>
                 : el.internalLink ?
                 <AnyLink link={`/${el.internalLink.slug}`} title={el.linkTitle} internal={true} noArrow noPadding regular classes="small text-darkgrey"/>
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
        <div className="row space-between text-center-xs text-left-sm">
          <div className="col col-sm-12 col-lg-6 text-center-sm space-xs space-sm space-md flex-lg middle-lg">
            <ul className="list-inline block-xs flex-lg middle-xs menu">
              <li className="space-xs space-sm space-md">
              <AnyLink link="/" noArrow noPadding regular internal>
                  <img style={{width: '150px'}} src={logo} alt="Cobiro logo" />
                </AnyLink>
              </li>
              <li>
                <p className="small text-darkgrey">
                  Copyright &#169; {new Date().getFullYear()} Cobiro
                </p>
              </li>
            </ul>
          </div>
          <div className="col col-sm-12 col-lg-6 text-center-sm space-xs space-sm space-md center-xs end-lg middle-lg flex">
              <ul className="list-inline block-xs flex-lg middle-xs menu">
                {bottomLinks && bottomLinks.linkItems && bottomLinks.linkItems.length > 0 ?
                bottomLinks.linkItems.map((l, i ) => (
                  <li key={i}>
                    <AnyLink link={l.externalLink || l.link && l.link.slug} title={l.linkTitle} internal={l.__typename === 'DatoCmsLink' } external={l.__typename === 'DatoCmsExtLink'} noArrow noPadding regular classes="small text-darkgrey"/>
                  </li>)
                )
              : null}
              {/* <li className="space-top-xs-up no-space-lg-up ">
                <LangSwitcher locales={locales} currentLocale={currentLocale} redirect={redirect}/>            
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
)}

export default Footer
