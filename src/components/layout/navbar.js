import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import logo from "../../images/logo_white.svg"
import Img from "gatsby-image"

const Navbar = ({ menuItems, customCta, menuInverted }) => {

  const [isExpanded, setIsExpanded] = useState(false)
  const [isToggleTouched, setIsToggleTouched] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window != "undefined" ? window.innerWidth : null)
  const [mainMenuHovered, setMainMenuHovered] = useState(false)
  let [refs, setRefs] = useState({})
  const mainMenu = React.createRef();
  let mainMenuNode
  // let refs = {}

  

  useEffect(() => {
    
    let tempRefs = {}

    menuItems.forEach((item, i) => {
      if(item.submenu.length > 0) {
        // refs[`ref_${i}`] = React.createRef()

        tempRefs = {...tempRefs, [`ref_${i}`]: React.createRef()}
      }
    });

    setRefs(tempRefs)
    
  }, [menuItems])
 
  useEffect(() => {
    mainMenuNode = mainMenu.current
    window.addEventListener("resize", () => resizeHandler())
    setSubMenuOffset()

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
  }, [refs])

  const resizeHandler = () => {
    setSubMenuOffset()
    setWindowWidth(window.innerWidth)
    setIsToggleTouched(false)
    setMainMenuHovered(false) 
  }

  function getPageTopLeft(el) {
    const rect = el.getBoundingClientRect();
    const docEl = document.documentElement;
    return rect.left + (window.pageXOffset || docEl.scrollLeft || 0)
  }
  const setSubMenuOffset = () => {
    for (var prop in refs) {
      if (refs[prop].current && Object.prototype.hasOwnProperty.call(refs, prop)) {
          const sub = refs[prop].current
          
          if(window.innerWidth > "960") {
            const subOffset = getPageTopLeft(sub)
            if(subOffset < 0 ) {
              sub.style.marginLeft = -1 * subOffset + 16 + 'px'
              sub.querySelector('.submenu-triangle').style.marginLeft = subOffset + -16 + 'px'
              return true
            } else {
              sub.style.marginLeft = 0
              sub.querySelector('.submenu-triangle').style.marginLeft = 0
            }
            return false
        } else {
          sub.style.marginLeft = '-1.1rem'
        }
      }
    }
  }
  

  // Click handlers below

  const toggleClickHandler = () => {
        setIsExpanded(!isExpanded)
        setIsToggleTouched(true)
  }

  const subSubMenuClickHandler = (event) => {
    if (windowWidth < 960 && event.target.parentNode.classList.contains("has-subsubmenu")) {
      event.preventDefault()
      event.target.parentNode.classList.toggle("expanded")
      if (event.target.parentNode.classList.contains("expanded")) {
        event.target.nextElementSibling.style.maxHeight =
          event.target.nextElementSibling.children[0].offsetHeight + "px"
      } else {
        event.target.nextElementSibling.style.maxHeight = null
      }
    }
  }

  const subMenuClickHandler = (event) => {
    const el = event.target
    
    if ( windowWidth < 960 && el.parentNode.classList.contains('submenu-parent') ) {

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
      <nav ref={mainMenu} className={["main-menu", isExpanded ? 'opened' : 'closed', isToggleTouched ? 'touched' : null, isScrolled ? 'navbar-border' : null, !mainMenuHovered && windowWidth > "959" ? 'unhovered' : mainMenuHovered && windowWidth > "959" ? 'hovered' : null].join(' ')} id="navbar">
        <div className="container">
          <div className="row between-xs middle-xs">
            <div className="col col-auto-lg navbar-mobile">
              <div className={["brand", menuInverted ? 'invert' : null, isExpanded ? 'invert' : '', isScrolled ? 'invert' : null].join(' ')}>
                <Link to="/">
                  <img className="logo-mobile" src={logo} alt="Cobiro logo" />
                </Link>
              </div>
              <button
                className={["menu-toggle btn", menuInverted ? 'invert' : null].join(' ')}
                aria-controls="navbar"
                aria-expanded={isExpanded}
                aria-label="Toggle navigation"
                onClick={toggleClickHandler}
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>
            </div>
            <div className={["col col-auto-lg main-menu-inner", isScrolled || menuInverted ? 'menu-items' : null].join(' ')}>
              <ul className="list-inline">
                {menuItems.sort(function (a, b) {
                    return a.menu_item_order - b.menu_item_order;
                  }).map((item, index) => (
                  <li key={index} className={item.submenu.length > 0 ? "submenu-parent" : null}>
                  <Link className={item.submenu.length > 0 ? 'has-submenu' : null } activeClassName="active" to={item.link ? `/${item.link.slug}` : '#'} onMouseEnter={mouseEnterSubMenuHandler} onClick={subMenuClickHandler}>
                    {item.linkTitle}
                  </Link>
                  {item.submenu.length > 0 ?
                  <div className="submenu" ref={refs[`ref_${index}`]}>
                    <div className="submenu-inner">
                        {item.submenu.map((sub, index) => (
                          <div key={index} className={ sub.submenuLinks.length > 0 ? "has-subsubmenu" : null }>
                          <Link className="submenu-title text-bold text-darkgrey" to={sub.link.slug ? `/${sub.link.slug}` : '/'} target="_self" onClick={subSubMenuClickHandler}>
                            {sub.icon.fixed ===! null ?
                            <Img fixed={sub.icon.fixed} alt={sub.icon.alt ? sub.icon.alt : `${sub.title} icon`}/>
                            :
                            <img
                                src={sub.icon.url}
                                className="submenu-icon"
                                alt={sub.icon.alt ? sub.icon.alt : `${sub.title} icon`}
                              />
                            }
                            {sub.title}
                          </Link>
                          <div className="subsubmenu">
                            <ul className="list-unstyled">
                              {sub.submenuLinks.map((subsub, index) => (
                                <li key={index}>
                                <Link
                                  to={subsub.slug ? `/${subsub.slug}` : '/'}
                                  target="_self"
                                >
                                  {subsub.submenuLinkTitles > 0 ? subsub.submenuLinkTitles[index] : subsub.title}
                                </Link>
                              </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        ))}
                    </div>
                    { item.submenuFooterText || (item.submenuFooterLinkTitle && (item.submenuFooterLink || item.submenuFooterExternalLink)) ?
                    <div className="submenu-footer">
                        { item.submenuFooterText ? <p className="small">{ item.submenuFooterText }</p> : null }
                        { item.submenuFooterLinkTitle && (item.submenuFooterLink || item.submenuFooterExternalLink) ?
                        item.submenuFooterLink ?
                        <Link className="text-blue block-xs" to={`/${item.submenuFooterLink.slug}`}>{ item.submenuFooterLinkTitle } →</Link>
                        : <a className="text-blue" href={item.submenuFooterExternalLink} target="_blank" rel="noopener noreferrer">{ item.submenuFooterLinkTitle } →</a>
                        : null }
                        
                    </div>
                    : null }
                    <div className="submenu-triangle"></div>
                  </div>
                  : null}
                </li>
                ))}
              </ul>
              <div className="main-menu-cta">
                <a href="https://app.cobiro.com/user/login" className={["btn btn-secondary btn-left", !isScrolled && !menuInverted ? 'btn-secondary-white' : null].join(' ')} target="_blank" rel="noopener noreferrer">
                  Sign in
                </a>
                <a href={customCta && customCta.link ? customCta.link : "https://app.cobiro.com/user/signup"} className={["btn btn-right", !isScrolled && !menuInverted ? 'btn-white' : null].join(' ')} target="_blank" rel="noopener noreferrer">
                  {customCta && customCta.title ? customCta.title : 'Sign up' }
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
