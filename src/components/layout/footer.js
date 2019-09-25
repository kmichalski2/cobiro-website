import { Link } from "gatsby"
import logo from "../../images/logo.svg"
import fb from "../../images/fb.svg"
import insta from "../../images/insta.svg"
import twitter from "../../images/twitter.svg"
import React from "react"
import background from "../../images/footer.png"
import Img from "gatsby-image"


const Footer = ({ columns }) => {
  console.log('Footer data: ', columns);
  return (
  <footer style={{ backgroundImage: `url(${background})` }}>
    <div className="container">
      <div className="row section end-sm">
        <div className="col col-xs-12 col-sm-12 col-md-4 col-lg-4 text-left-lg center-xs start-lg space-xs space-sm space-md">
          <Link to="/">
            <img
              className="footer-logo space-xs space-sm space-md"
              src={logo}
              alt="Cobiro logo"
            />
          </Link>
        </div>
        {columns.sort(function (a, b) {
          return a.footerItemOrder - b.footerItemOrder;
        }).map((col, index) => (
          <div key={index} className="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md">
           <h4 className="space-xs-up">{col.columnHeading}</h4>
           <ul className="list-unstyled menu">
             {col.column.map((el, index) => (
               <li key={index}>
                 {el.__typename === 'DatoCmsTextElement' ?
                 el.text
                 : el.__typename === 'DatoCmsImageElement' ?
                 <a href={el.externalLink}>
                   {el.image.fixed ?
                    <Img fixed={el.image.fixed} className="footer-image" alt={el.image.alt ? el.image.alt : 'unknown footer image'} />
                    :
                    <img src={el.image.url} className="footer-image" alt={el.image.alt ? el.image.alt : 'unknown footer image'} />
                  }
                  
                 </a>
                 : (el.__typename === 'DatoCmsLinkElement' && el.externalLink) ? 
                 <a className="small text-darkgrey" href={el.externalLink}>{el.linkTitle}</a> 
                 : (el.__typename === 'DatoCmsLinkElement' && el.internalLink.slug ==! null) ?
                 <Link className="small text-darkgrey" to={el.internalLink.slug}>{el.linkTitle}</Link>
                 : null
                }
               </li>
             ))}
           </ul>
         </div>
        ))}
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row space-between center-xs middle-xs">
          <div className="col col-xs-12 col-md-6 text-center-xs text-left-md space-xs space-sm">
            <ul className="list-inline block-xs flex-md menu">
              <li>
                <Link className="small text-darkgrey" to="/terms-of-service">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="small text-darkgrey" to="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="col col-xs-12 col-md-6 text-right text-center-xs text-center-sm text-right-md">
            <a
              href="https://www.facebook.com/CobiroAI/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fb} alt="Facebook" />
            </a>
            <a
              href="https://twitter.com/cobiroai"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="Twitter" />
            </a>
            <a
              href="https://www.instagram.com/cobiroai/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={insta} alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
)}

export default Footer
