import { Link } from "gatsby"
import React, { useEffect } from "react"
import logo from "../../images/logo.svg"
import Img from "gatsby-image"

const Navbar = ({ menuItems }) => {
  useEffect(() => {
    // Initial variables
    const body = document.querySelector("BODY")
    const mainMenu = document.querySelector("nav.main-menu")
    const menuToggle = document.querySelector(".menu-toggle")
    let mainMenuHeight = mainMenu.offsetHeight
    body.style.paddingTop = `${mainMenuHeight}px`

    // Setting initial padding-top on body equal to height of navbar

    // Event listeners for clicks and browser resize
    mainMenu.addEventListener("click", menuClickHandler, false)
    mainMenu.addEventListener("resize", resizeHandler, false)

    const resizeHandler = () => {
      mainMenuHeight = mainMenu.offsetHeight
      body.style.paddingTop = `${mainMenuHeight}px`
    }

    let debounce_timer
    window.onscroll = () => {
      if (debounce_timer) {
        window.clearTimeout(debounce_timer)
      }

      debounce_timer = window.setTimeout(function() {
        if (window.pageYOffset > 0) {
          mainMenu.classList.add("navbar-border")
        } else {
          mainMenu.classList.remove("navbar-border")
        }
      }, 50)
    }

    // Handling all clicks on navbar
    function menuClickHandler(event) {
      if (window.innerWidth < "960") {
        // If the clicked element is the burger-menu
        if (event.target === menuToggle) {
          event.preventDefault()

          if (mainMenu.classList.contains("closed")) {
            menuToggle.setAttribute("aria-expanded", "true")
          } else {
            menuToggle.setAttribute("aria-expanded", "false")
          }

          mainMenu.classList.toggle("closed")
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
        el.nextElementSibling.style.maxHeight =
          el.nextElementSibling.children[0].offsetHeight + "px"
        setTimeout(() => (el.nextElementSibling.style.maxHeight = "none"), 400)
      }
      el.parentNode.classList.toggle("expand")
      body.classList.toggle("submenu-expanded")
    }
  })

  return (
    <header>
      <nav className="main-menu closed" id="navbar">
        <div className="container">
          <div className="row between-xs middle-xs">
            <div className="col col-auto-lg navbar-mobile">
              <div className="brand">
                <Link to="/">
                  <img src={logo} alt="Cobiro logo" />
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
                  <Link className={item.submenu.length > 0 ? 'has-submenu' : null } activeClassName="active" to={item.link ? `/${item.link.slug}` : '#'} target="_self">
                    {item.linkTitle}
                  </Link>
                  {item.submenu.length > 0 ?
                  <div className="submenu">
                    <div className="container">
                      <div className="row">
                        {item.submenu.map((sub, index) => (
                          <div key={index} className="col col-xs-12 col-lg-3 has-subsubmenu">
                          <Link className="submenu-title" to={sub.link.slug ? sub.link.slug : '/'} target="_self">
                            {sub.icon.fixed ==! null ?
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
                                  to={subsub.slug ? subsub.slug : '/'}
                                  target="_self"
                                >
                                  {subsub.title}
                                </Link>
                              </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  : null}
                </li>
                ))}
              </ul>
              <div className="main-menu-cta">
                <Link to="/" className="btn btn-secondary" target="_blank">
                  Sign in
                </Link>
                <Link to="/" className="btn" target="_blank">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
