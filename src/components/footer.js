import { Link } from "gatsby"
import PropTypes from "prop-types"
import logo from '../images/logo_circle.svg'
import fb from '../images/fb.svg'
import insta from '../images/insta.svg'
import twitter from '../images/twitter.svg'
import React from "react"



const Footer = ({ menuItems }) => (
    <footer>
    <div class="container">
        <div class="row section end-sm">
            <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 text-left-lg center-xs start-lg space-xs space-sm space-md">
                <a href="/"><img class="footer-logo space-xs space-sm space-md" src={ logo } alt="Cobiro logo" /></a>
            </div>
            <div class="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md">
                <h4 class="space-xs-up">Menu item</h4>
                <ul class="list-unstyled menu">
                    <li>
                        <a class="small text-darkgrey" href="#">Menu item</a>
                    </li>
                    <li>Tekst element</li>         
                    <li><a href="#"><img src="#" class="footer-image" /></a></li>
                </ul>
            </div>
            <div class="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md">
                <h4 class="space-xs-up">Menu item</h4>
                <ul class="list-unstyled menu">
                    <li>
                        <a class="small text-darkgrey" href="#">Menu item</a>
                    </li>
                    <li>Tekst element</li>         
                    <li><a href="#"><img src="#" class="footer-image" /></a></li>
                </ul>
            </div>
            <div class="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md">
                <h4 class="space-xs-up">Menu item</h4>
                <ul class="list-unstyled menu">
                    <li>
                        <a class="small text-darkgrey" href="#">Menu item</a>
                    </li>
                    <li>Tekst element</li>         
                    <li><a href="#"><img src="#" class="footer-image" /></a></li>
                </ul>
            </div>
            <div class="col col-xs-12 col-sm-6 col-md-4 col-lg-2 text-left-lg center-xs start-lg space-xs space-sm space-md">
                <h4 class="space-xs-up">Menu item</h4>
                <ul class="list-unstyled menu">
                    <li>
                        <a class="small text-darkgrey" href="#">Menu item</a>
                    </li>
                    <li>Tekst element</li>         
                    <li><a href="#"><img src="#" class="footer-image" /></a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="container">
            <div class="row space-between center-xs middle-xs">
                <div class="col col-xs-12 col-md-6 text-center-xs text-left-md space-xs space-sm">
                    <ul class="list-inline block-xs flex-md menu">
                    <li>
                        <a class="small text-darkgrey" href="#">footer element</a>
                    </li>
                    </ul>
                </div>
                <div class="col col-xs-12 col-md-6 text-right text-center-xs text-center-sm text-right-md">
                    <a href="https://www.facebook.com/CobiroAI/" class="social-link" target="_blank">
                        <img src={ fb } alt="Facebook" />
                    </a>
                    <a href="https://twitter.com/cobiroai" class="social-link" target="_blank">
                        <img src={ twitter } alt="Twitter" />
                    </a>
                    <a href="https://www.instagram.com/cobiroai/" class="social-link" target="_blank">
                        <img src={ insta } alt="Instagram" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>
)


export default Footer
