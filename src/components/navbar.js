import { Link } from "gatsby"
import PropTypes from "prop-types"
import React,  { useEffect } from "react"
import logo from '../images/logo.svg'


const Navbar = ({ menuItems }) => {
  useEffect(() => {
    
    // Initial variables
	const body = document.querySelector('BODY')
	const mainMenu = document.querySelector('nav.main-menu');
	const menuToggle = document.querySelector('.menu-toggle');
	let mainMenuHeight = mainMenu.offsetHeight;

	// Setting initial padding-top on body equal to height of navbar
	body.style.paddingTop = mainMenuHeight + 'px';

	// Event listeners for clicks and browser resize
	mainMenu.addEventListener( 'click', menuClickHandler, false );
	window.addEventListener( "resize", windowResizeHandler, false );

	// Handling resizing of the browser
	function windowResizeHandler () {

		mainMenuHeight = mainMenu.offsetHeight;
		body.style.paddingTop = mainMenuHeight + 'px';

	}

	// Handling all clicks on navbar
	function menuClickHandler (event) {
		if (window.innerWidth < '960') {
		// If the clicked element is the burger-menu
			if ( event.target ===  menuToggle ) {
				event.preventDefault();

				if( mainMenu.classList.contains('closed') ) {
					menuToggle.setAttribute("aria-expanded", 'true');
				} else {
					menuToggle.setAttribute("aria-expanded", 'false');
				}

				mainMenu.classList.toggle('closed');

			} else if ( event.target.classList.contains('has-submenu') ) {
			// Else Check if the clicked element is equal to it
				event.preventDefault();
				// Add a class to the parent element of the clicked subMenu[i] item in the subMenu array
				expandSubMenu(event.target);

			} else if ( event.target.parentNode.classList.contains('has-subsubmenu') ) {
				event.preventDefault();
				event.target.parentNode.classList.toggle('expanded');
				if( event.target.parentNode.classList.contains('expanded') ) {
					event.target.nextElementSibling.style.maxHeight = event.target.nextElementSibling.children[0].offsetHeight + 'px';
				} else {
					event.target.nextElementSibling.style.maxHeight = null;
				}
			}
		}
	}

	function expandSubMenu(el) {

		if ( el.parentNode.classList.contains('expand') ) {
			el.nextElementSibling.style.maxHeight = el.nextElementSibling.offsetHeight + 'px';
			setTimeout(() => el.nextElementSibling.style.maxHeight = null, 0);
		} else {
			el.nextElementSibling.style.maxHeight = el.nextElementSibling.children[0].offsetHeight + 'px';
			setTimeout(() => el.nextElementSibling.style.maxHeight = 'none', 400);
		}
		el.parentNode.classList.toggle('expand');
		body.classList.toggle('submenu-expanded');
  }
  });

  
  

  return (
  <header>
    <nav className="main-menu closed" id="navbar">
      <div className="container">
        <div className="row between-xs middle-xs">
          <div className="col col-auto-lg navbar-mobile">
            <div className="brand">
              <Link to="/" ><img src={ logo } alt="Cobiro logo"/></Link>
            </div>
            <button className="menu-toggle btn" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </button>
          </div>
          <div className="col col-auto-lg main-menu-inner">
            <ul className="list-inline">
                  <li className="submenu-parent">
                    <Link className="active has-submenu" to="#" target="_self">Menupunkt</Link>
                    <div className="submenu">
                      <div className="container">
                        <div className="row">
                            <div className="col col-xs-12 col-lg-3 has-subsubmenu">

                              <Link className="submenu-title" to="#" target="_self">
                                <img src="/" className="submenu-icon" alt="submenu icon"/>
                                  Undermenu
                                </Link>
                                <div className="subsubmenu">
                                  <ul className="list-unstyled">
                                    <li><Link className="hidden-lg hidden-xl" to="#" target="_self">Submenu item</Link></li>
                                    <li><Link to="#" target="_self">Subsubmenu</Link></li>
                                  </ul>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </li>
            </ul>
            <div className="main-menu-cta">
              <Link to="#" className="btn btn-secondary" target="_blank">Sign in</Link>
              <Link to="#" className="btn" target="_blank">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
  </header>
  )
}


export default Navbar
