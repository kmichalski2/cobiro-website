import { Link } from "gatsby"
import React, { useEffect } from "react"
import logo from "../../images/logo_white.svg"
import Img from "gatsby-image"

const Navbar = ({ menuItems }) => {

  // Initial variables
  let body
  let mainMenu
  let menuListItems
  let logoInvert
  let menuToggle
  let btnRight
  let btnLeft
  let subMenu
  let subArray
  let windowWidth

  useEffect(() => {
    // Initial variables
    body = document.querySelector("BODY")
    mainMenu = document.querySelector("nav.main-menu")
    menuListItems = document.querySelector(".main-menu-inner")
    logoInvert = document.querySelector(".brand")
    menuToggle = document.querySelector(".menu-toggle")
    btnRight = document.querySelector(".btn-right")
    btnLeft = document.querySelector(".btn-left")
    subMenu = document.querySelectorAll('.submenu')
    subArray = Array.prototype.slice.call(subMenu)
    windowWidth = window.innerWidth

    // Fix for unintentional animating of menu when resizing browser window
    if(!mainMenu.classList.contains("unhovered") && window.innerWidth > "960") {
      mainMenu.classList.add("unhovered")
    }

    // Fix for unintentional animating of menu when resizing browser window
    const resizeHandler = () => {
      setSubMenuOffset()
      if(mainMenu.classList.contains("touched") && window.innerWidth > "960") {
        mainMenu.classList.remove("touched")
      } 
      if(mainMenu.classList.contains("unhovered") && window.innerWidth < "960") {
        mainMenu.classList.remove("unhovered")
      } 
      if(mainMenu.classList.contains("hovered")) {
        mainMenu.classList.remove("hovered")
      } 
      if(!mainMenu.classList.contains("unhovered") && window.innerWidth > "960") {
        mainMenu.classList.add("unhovered")
      }
    }

    // Event listeners for clicks and browser resize
    mainMenu.addEventListener("click", menuClickHandler, false)
    window.addEventListener("resize", resizeHandler, false)

    function getPageTopLeft(el) {
      const rect = el.getBoundingClientRect();
      const docEl = document.documentElement;
      return rect.left + (window.pageXOffset || docEl.scrollLeft || 0)
    }

    const setSubMenuOffset = () => {
        subArray.map((sub) => {
          if(window.innerWidth > "960") {
            let subOffset = getPageTopLeft(sub)
            if(subOffset < 0 ) {
              sub.style.marginLeft = -1 * subOffset + 16 + 'px'
              sub.querySelector('.submenu-triangle').style.marginLeft = subOffset + -16 + 'px'
              return true
            } else {
              sub.style.marginLeft = 0
            }
            return false
        } else {
          sub.style.marginLeft = '-1.1rem'
        }
        })
    }
    setSubMenuOffset()

    let debounce_timer
    window.onscroll = () => {
      if (debounce_timer) {
        window.clearTimeout(debounce_timer)
      }

      debounce_timer = window.setTimeout(function() {
        if (window.pageYOffset > 0) {
          mainMenu.classList.add("navbar-border")
          menuListItems.classList.add("menu-items")
          logoInvert.classList.add("invert")
          btnRight.classList.remove("btn-white")
          btnLeft.classList.remove("btn-secondary-white")
        } else {
          mainMenu.classList.remove("navbar-border")
          menuListItems.classList.remove("menu-items")
          logoInvert.classList.remove("invert")
          btnRight.classList.add("btn-white")
          btnLeft.classList.add("btn-secondary-white")
          
        }
      }, 0)
    }


    // Handling all clicks on navbar
    function menuClickHandler(event) {
      if (window.innerWidth < "960") {
        // If the clicked element is the burger-menu
        if (event.target === menuToggle) {
          event.preventDefault()

          if (mainMenu.classList.contains("closed")) {
            menuToggle.setAttribute("aria-expanded", "true")
            logoInvert.classList.add("invert")
          } else {
            menuToggle.setAttribute("aria-expanded", "false")
            if(!mainMenu.classList.contains("navbar-border")) {
            logoInvert.classList.remove("invert")
            }
          }
          mainMenu.classList.toggle("closed")
          
          if(!mainMenu.classList.contains("touched")) {
            mainMenu.classList.add("touched")
          }
        } else if (event.target.classList.contains("has-submenu")) {
          // Else Check if the clicked element is equal to it
          event.preventDefault()
          // Add a class to the parent element of the clicked subMenu[i] item in the subMenu array
          expandSubMenu(event.target)
        } else if (
          event.target.parentNode.classList.contains("has-subsubmenu")
        ) {
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
    }

    function expandSubMenu(el) {
      if (el.parentNode.classList.contains("expand")) {
        el.nextElementSibling.style.maxHeight =
          el.nextElementSibling.offsetHeight + "px"
        setTimeout(() => (el.nextElementSibling.style.maxHeight = null), 0)
      } else {
        el.nextElementSibling.style.maxHeight = el.nextElementSibling.children[0].offsetHeight + el.nextElementSibling.children[1].offsetHeight + "px"
        setTimeout(() => (el.nextElementSibling.style.maxHeight = "none"), 400)
      }
      el.parentNode.classList.toggle("expand")
      body.classList.toggle("submenu-expanded")
    }
  })

  const mouseEnterSubMenuHandler = (event) => {
    if(event.target.classList.contains('has-submenu')) {
      mainMenu.classList.add("hovered")
      mainMenu.classList.remove("unhovered")
    }
  }

  return (
    <header>
      <nav className="main-menu closed" id="navbar">
        <div className="container">
          <div className="row between-xs middle-xs">
            <div className="col col-auto-lg navbar-mobile">
              <div className="brand">
                <Link to="/">
                  <img className="logo-mobile" src={logo} alt="Cobiro logo" />
                </Link>
              </div>
              <button
                className="menu-toggle btn"
                aria-controls="navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>
            </div>
            <div className="col col-auto-lg main-menu-inner">
              <ul className="list-inline">
                {menuItems.sort(function (a, b) {
                    return a.menu_item_order - b.menu_item_order;
                  }).map((item, index) => (
                  <li key={index} className={item.submenu.length > 0 ? "submenu-parent" : null}>
                  <Link className={item.submenu.length > 0 ? 'has-submenu' : null } activeClassName="active" to={item.link ? `/${item.link.slug}` : '#'} onMouseEnter={mouseEnterSubMenuHandler}>
                    {item.linkTitle}
                  </Link>
                  {item.submenu.length > 0 ?
                  <div className="submenu" >
                    <div className="submenu-inner">
                        {item.submenu.map((sub, index) => (
                          <div key={index} className={ sub.submenuLinks.length > 0 ? "has-subsubmenu" : null }>
                          <Link className="submenu-title text-bold text-darkgrey" to={sub.link.slug ? `/${sub.link.slug}` : '/'} target="_self">
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
                <a href="https://app.cobiro.com/user/login" className="btn btn-secondary btn-secondary-white btn-left" target="_blank" rel="noopener noreferrer">
                  Sign in
                </a>
                <a href="https://app.cobiro.com/user/signup" className="btn btn-white btn-right" target="_blank" rel="noopener noreferrer">
                  Sign up
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
