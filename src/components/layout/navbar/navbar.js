import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import logo from "../../../images/logo_white.svg"
import MenuItem from './menuItem/menuItem'
import AnyLink from '../../UiElements/AnyLink/AnyLink'

import Classes from './navbar.module.scss'

const Navbar = ({ menuItems, customCta, menuInverted }) => {

  const [isExpanded, setIsExpanded] = useState(false)
  const [isToggleTouched, setIsToggleTouched] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window != "undefined" ? window.innerWidth : null)
  const [mainMenuHovered, setMainMenuHovered] = useState(false)
  // let [refs, setRefs] = useState({})
  // const mainMenu = React.createRef();
  // let mainMenuNode  


  // useEffect(() => {
    
  //   let tempRefs = {}

  //   menuItems.forEach((item, i) => {
  //     if(item.submenu && item.submenu.length > 0) {
  //       // refs[`ref_${i}`] = React.createRef()

  //       tempRefs = {...tempRefs, [`ref_${i}`]: React.createRef()}
  //     }
  //   });

  //   setRefs(tempRefs)
    
  // }, [menuItems])
 
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

  const resizeHandler = () => {
    // setSubMenuOffset()
    setWindowWidth(window.innerWidth)
    setIsToggleTouched(false)
    setMainMenuHovered(false) 
  }

  

  // Click handlers below

  const toggleClickHandler = () => {
        setIsExpanded(!isExpanded)
        setIsToggleTouched(true)
  }

  

  const subMenuClickHandler = (event) => {
    const el = event.target
    
    if ( windowWidth < 960 && el.parentNode.classList.contains(Classes.submenuParent) ) {

      event.preventDefault()
      
      if ( el.parentNode.classList.contains("expand") ) {
        el.nextElementSibling.style.maxHeight =
        el.nextElementSibling.offsetHeight + "px"
        setTimeout(() => (el.nextElementSibling.style.maxHeight = null), 0)
      } else {
        el.nextElementSibling.style.maxHeight = el.nextElementSibling.children[0].offsetHeight + el.nextElementSibling.children[1].offsetHeight + "px"
        setTimeout(() => (el.nextElementSibling.style.maxHeight = "none"), 400)
      }
      el.parentNode.classList.toggle("expand")
    }
  }

  const mouseEnterSubMenuHandler = (event) => {
    if(event.target.classList.contains('has-submenu')) {
      setMainMenuHovered(true) 
    }
  }

  return (
    <header>
      <nav className={[Classes.nav, Classes.mainMenu, isExpanded ? Classes.opened : Classes.closed, isToggleTouched ? Classes.touched : null, isScrolled ? Classes.navbarBorder : null, !mainMenuHovered && windowWidth > "959" ? Classes.unhovered : mainMenuHovered && windowWidth > "959" ? Classes.hovered : null].join(' ')} id="navbar">
        <div className="container">
          <div className="row between-xs middle-xs">
            <div className={["col col-auto-lg", Classes.navbarMobile].join(' ')} >
              <div className={[Classes.brand, menuInverted ? Classes.invert : null, isExpanded ? Classes.invert : null, isScrolled ? Classes.invert : null].join(' ')}>
                <Link to="/">
                  <img className={Classes.logoMobile} src={logo} alt="Cobiro logo" />
                </Link>
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
                    <MenuItem key={index} inverted={isScrolled || menuInverted} item={item} subMenuClickHandler={subMenuClickHandler} mouseEnterSubMenuHandler={mouseEnterSubMenuHandler}/>
                ))}
              </ul>
              <div className={["main-menu-cta visible-lg-up"].join(' ')}>
                <a href="https://app.cobiro.com/user/login" className={["btn btn-secondary", Classes.btnLeft, !isScrolled && !menuInverted ? 'btn-secondary-white' : null].join(' ')} target="_blank" rel="noopener noreferrer">
                  Sign in
                </a>
                <a href={customCta && customCta.link ? customCta.link : "https://app.cobiro.com/user/signup"} className={["btn", Classes.btnRight, !isScrolled && !menuInverted ? 'btn-white' : null].join(' ')} target="_blank" rel="noopener noreferrer">
                  {customCta && customCta.title ? customCta.title : 'Sign up' }
                </a>                  
              </div>

              { menuItems[0].submenuFooterText || (menuItems[0].submenuFooterLinkTitle && (menuItems[0].submenuFooterLink || menuItems[0].submenuFooterExternalLink)) ?
                <div className={[Classes.subMenuFooter, Classes.menuCta, "center text-center hidden-lg-up"].join(' ')}>
                    { menuItems[0].submenuFooterText ? <p className={[Classes.submenuFooterText].join(' ')}>{ menuItems[0].submenuFooterText }</p> : null }
                    <AnyLink 
                      internal={menuItems[0].submenuFooterExternalLink && true}
                      external={menuItems[0].submenuFooterLink && menuItems[0].submenuFooterLink.slug && true}
                      link={menuItems[0].submenuFooterExternalLink || menuItems[0].submenuFooterLink && menuItems[0].submenuFooterLink.slug}
                      title={menuItems[0].submenuFooterLinkTitle}
                      button
                    />
                    
                </div>
              : null }

            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
