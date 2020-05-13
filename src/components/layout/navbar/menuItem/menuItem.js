import React, { useState } from 'react'
import { Link } from "gatsby"
import SubMenu from '../subMenu/subMenu'

import Classes from './menuItem.module.scss'

const MenuItem = ({ item, inverted, mainMenuHoveredHandler, contentContainer }) => {

    const [hovered, setHovered] = useState(false)
    const [subMenuExpanded, setSubMenuExpanded] = useState(false)

    const subMenuClickHandler = (event) => {

        // const el = event.target
        
        // if ( window.innerWidth < 960 && el.parentNode.classList.contains(Classes.subMenuParent) ) {
    
        //   event.preventDefault()
          
        //   if ( el.parentNode.classList.contains(Classes.expand) ) {
        //     el.nextElementSibling.style.maxHeight =
        //     el.nextElementSibling.offsetHeight + "px"
        //     setTimeout(() => (el.nextElementSibling.style.maxHeight = null), 0)
        //   } else {
        //     el.nextElementSibling.style.maxHeight = el.nextElementSibling.children[0].offsetHeight + el.nextElementSibling.children[1].offsetHeight + "px"
        //     setTimeout(() => (el.nextElementSibling.style.maxHeight = "none"), 400)
        //   }
        //   el.parentNode.classList.toggle(Classes.expand)
        // }
      }
    
      const mouseEnterSubMenuHandler = (event) => {
        if(window.innerWidth > 959 && event.target.classList.contains(Classes.hasSubMenu)) {
            mainMenuHoveredHandler()
        }
      }

    return (
        <li 
            className={[Classes.menuItem, inverted ? Classes.inverted : null, item.submenuColumn1Links && (item.submenuColumn1Links.length > 0) ? Classes.subMenuParent : null, subMenuExpanded ? Classes.expanded : null].join(' ')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link 
                className={[item.submenuColumn1Links && (item.submenuColumn1Links.length > 0) ? Classes.hasSubMenu : null, subMenuExpanded ? Classes.subMenuExpanded : null].join(' ') } 
                activeClassName="active"
                to={item.link ? `/${item.link.slug}` : '#'}
                onMouseEnter={mouseEnterSubMenuHandler} 
                onClick={() => setSubMenuExpanded(!subMenuExpanded)}
            >
                {item.linkTitle}
            </Link>
            {item.submenuColumn1Title ?
                <SubMenu 
                    show={hovered}
                    expand={subMenuExpanded}
                    footer={{
                        submenuFooterLink: item.submenuFooterLink,
                        submenuFooterExternalLink: item.submenuFooterExternalLink,
                        submenuFooterLinkTitle: item.submenuFooterLinkTitle,
                        submenuFooterText: item.submenuFooterText,

                    }}
                    submenuTitle={item.submenuTitle}
                    submenuDescription={item.submenuDescription}
                    columns={[
                        ...(item.submenuColumn1Title ?
                        [{
                            title: item.submenuColumn1Title,
                            icon: item.submenuColumn1Icon,
                            submenuLinks: item.submenuColumn1Links
                        }] : []),
                        ...(item.submenuColumn2Title ?
                        [{
                            title: item.submenuColumn2Title,
                            icon: item.submenuColumn2Icon,
                            submenuLinks: item.submenuColumn2Links
                        }] : []),
                        ...(item.submenuColumn3Title ?
                        [{
                            title: item.submenuColumn3Title,
                            icon: item.submenuColumn3Icon,
                            submenuLinks: item.submenuColumn3Links
                        }] : [])
                    ]}
                    columnRight={{
                        title: item.rightColumnTitle,
                        description: item.rightColumnDescription,
                        links: item.rightColumnLinks
                    }}
                    contentContainer={contentContainer}
                    />
            : null}
            
      </li>
    )
}

export default MenuItem