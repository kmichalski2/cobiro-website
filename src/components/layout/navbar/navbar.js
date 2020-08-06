import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import logo from "../../../images/logo_white.svg"
import Notification from '../../UiElements/notification/notification'
import MenuItem from './menuItem/menuItem'
import AnyLink from '../../UiElements/AnyLink/AnyLink'

import Classes from './navbar.module.scss'

const Navbar = ({ menuItems, customCta, menuInverted, notification, notifyerHeightHandler, hideSignUp, locales, currentLocale }) => {

  const [isExpanded, setIsExpanded] = useState(false)
  const [isToggleTouched, setIsToggleTouched] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window != "undefined" ? window.innerWidth : null)
  const [mainMenuHovered, setMainMenuHovered] = useState(false)
  const [subMenuExpanded, setSubMenuExpanded] = useState(null)
  const [navbarHeight, setNavbarHeight] = useState()
  const [notifyersHeight, setNotifyersHeight] = useState(0)
  // let [refs, setRefs] = useState({})
  // const mainMenu = React.createRef();
  // let mainMenuNode  
  const contentContainer = React.createRef()
  const navbarRef = React.createRef()

  useEffect(() => {
    // mainMenuNode = mainMenu.current
    window.addEventListener("resize", () => resizeHandler())

    // Add white bg and shadow to menu on scroll
    window.onscroll = () => {
      if (window.pageYOffset >= 1) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    // return () => {
    //   window.removeEventListener("resize", resizeHandler)
    // }

    
  })

  useEffect(() => {
    setNavbarHeight(navbarRef.current.offsetHeight)
  }, [navbarRef])

  const resizeHandler = () => {
    // setSubMenuOffset()
    setWindowWidth(window.innerWidth)
    setIsToggleTouched(false)
    setMainMenuHovered(false) 
  }

  
  const notifyerNavbarHeightHandler = (height) => {
    setNotifyersHeight(height)
  }
  // Click handlers below

  const toggleClickHandler = () => {
        setIsExpanded(!isExpanded)
        setIsToggleTouched(true)
  }

  const mainMenuHoveredHandler = () => {
    setMainMenuHovered(true) 
  }
  
  const expandHandler = (e, i) => {
    e.preventDefault()
    setSubMenuExpanded(subMenuExpanded !== i ? i : null)
  }

  const homeSlug = locales.find(l => l.locale === currentLocale).value


  return (
    <header>
      <nav ref={navbarRef} className={[Classes.nav, Classes.mainMenu, isExpanded ? Classes.opened : Classes.closed, isToggleTouched ? Classes.touched : null, isScrolled ? Classes.navbarBorder : null, !mainMenuHovered && windowWidth > "959" ? Classes.unhovered : mainMenuHovered && windowWidth > "959" ? Classes.hovered : null].join(' ')} id="navbar">
        <div  className="container">
          <div ref={contentContainer} className="row between-xs middle-xs">
            <div className={["col col-auto-lg", Classes.navbarMobile].join(' ')} >
              <div className={[Classes.brand, menuInverted ? Classes.invert : null, isExpanded ? Classes.invert : null, isScrolled ? Classes.invert : null].join(' ')}>
                <AnyLink link={`/${homeSlug !== null ? homeSlug : ''}`} noArrow noPadding regular>
                  <img className={Classes.logoMobile} src={logo} alt="Cobiro logo" />
                </AnyLink>
              </div>

              <button
                className={[Classes.menuToggle, menuInverted ? Classes.invert : null].join(' ')}
                aria-controls="navbar"
                aria-expanded={isExpanded}
                aria-label="Toggle navigation"
                onClick={toggleClickHandler}
              >
                <span className={[Classes.iconBar, Classes.topBar].join(' ')}></span>
                <span className={[Classes.iconBar, Classes.middleBar].join(' ')}></span>
                <span className={[Classes.iconBar, Classes.bottomBar].join(' ')}></span>
              </button>

            </div>
            <div className={["col col-auto-lg", Classes.mainMenuInner, isScrolled || menuInverted ? Classes.menuItems : null].join(' ')}>
              <ul className={["list-inline", Classes.menuItemsList].join(' ')}>
                {menuItems.sort((a, b) => a.menu_item_order - b.menu_item_order).map((item, index) => (
                    <MenuItem key={index} inverted={isScrolled || menuInverted ? true : false} item={item} mainMenuHoveredHandler={mainMenuHoveredHandler} contentContainer={contentContainer} expandHandler={expandHandler} subMenuExpanded={subMenuExpanded} index={index}/>
                ))}
              </ul>
              {!hideSignUp ?
              <div className={["visible-xs-up", Classes.mainMenuCta, subMenuExpanded !== null ? Classes.hiddenCta : null].join(' ')}>
                <a href="https://app.cobiro.com/user/login" className={["btn btn-secondary", Classes.btnLeft, !isScrolled && !menuInverted ? 'btn-secondary-white' : null].join(' ')} target="_blank" rel="noopener noreferrer">
                  Sign in
                </a>
                <a href={customCta && customCta.link ? customCta.link : "https://app.cobiro.com/user/signup"} className={["btn", Classes.btnRight, !isScrolled && !menuInverted ? 'btn-white' : null].join(' ')} target="_blank" rel="noopener noreferrer">
                  {customCta && customCta.title ? customCta.title : 'Sign up' }
                </a>                  
              </div>
              : null}
            </div>
          </div>
        </div>
        
      </nav>
      <div className={[Classes.notifyer, isScrolled ? Classes.notifyerScrolled : null, navbarHeight ? Classes.notifyerVisible : null].join(' ')} style={navbarHeight ? {top: navbarHeight + 'px'} : null}>
      {notification && 
       <Notification text={notification.text} textColor={notification.textColor} bgColor={notification.bgColor} notifyerHeightHandler={notifyerHeightHandler}/>
      }
      </div>
    </header>
  )
}

export default Navbar
