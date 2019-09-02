import { Link } from "gatsby"
import logo from '../../images/logo_circle.svg'
import fb from '../../images/fb.svg'
import insta from '../../images/insta.svg'
import twitter from '../../images/twitter.svg'
import React from "react"



const Footer = ({ menuItems }) => (
    <footer>
        <div className="container">
            <div className="row section end-sm">
                <div className="col col-xs-12 col-sm-12 col-md-4 col-lg-4 text-left-lg center-xs start-lg space-xs space-sm space-md">
                    <Link to="/"><img className="footer-logo space-xs space-sm space-md" src={ logo } alt="Cobiro logo" /></Link>
                </div>
                <div className="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md">
                    <h4 className="space-xs-up">Menu item</h4>
                    <ul className="list-unstyled menu">
                        <li>
                            <Link className="small text-darkgrey" to="/">Menu item</Link>
                        </li>
                        <li>Tekst element</li>         
                        <li><Link to="/"><img src="/" className="footer-image" alt="Link element 1"/></Link></li>
                    </ul>
                </div>
                <div className="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md">
                    <h4 className="space-xs-up">Menu item</h4>
                    <ul className="list-unstyled menu">
                        <li>
                            <Link className="small text-darkgrey" to="/">Menu item</Link>
                        </li>
                        <li>Tekst element</li>         
                        <li><Link to="/"><img src="/" className="footer-image" alt="Link element"/></Link></li>
                    </ul>
                </div>
                <div className="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md">
                    <h4 className="space-xs-up">Menu item</h4>
                    <ul className="list-unstyled menu">
                        <li>
                            <Link className="small text-darkgrey" to="/">Menu item</Link>
                        </li>
                        <li>Tekst element</li>         
                        <li><Link to="/"><img src="/" className="footer-image" alt="Link element 2"/></Link></li>
                    </ul>
                </div>
                <div className="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md">
                    <h4 className="space-xs-up">Menu item</h4>
                    <ul className="list-unstyled menu">
                        <li>
                            <Link className="small text-darkgrey" to="/">Menu item</Link>
                        </li>
                        <li>Tekst element</li>         
                        <li><Link to="/"><img src="/" className="footer-image" alt="Link element 3"/></Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="container">
                <div className="row space-between center-xs middle-xs">
                    <div className="col col-xs-12 col-md-6 text-center-xs text-left-md space-xs space-sm">
                        <ul className="list-inline block-xs flex-md menu">
                        <li>
                            <Link className="small text-darkgrey" to="/">footer element</Link>
                        </li>
                        </ul>
                    </div>
                    <div className="col col-xs-12 col-md-6 text-right text-center-xs text-center-sm text-right-md">
                        <a href="https://www.facebook.com/CobiroAI/" className="social-link" target="_blank" rel="noopener noreferrer">
                            <img src={ fb } alt="Facebook" />
                        </a>
                        <a href="https://twitter.com/cobiroai" className="social-link" target="_blank" rel="noopener noreferrer">
                            <img src={ twitter } alt="Twitter" />
                        </a>
                        <a href="https://www.instagram.com/cobiroai/" className="social-link" target="_blank" rel="noopener noreferrer">
                            <img src={ insta } alt="Instagram" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
)


export default Footer
