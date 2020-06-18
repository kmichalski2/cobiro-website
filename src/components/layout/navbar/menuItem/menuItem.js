import React, { useState } from 'react'
import { Link } from "gatsby"
import SubMenu from '../subMenu/subMenu'

import Classes from './menuItem.module.scss'

const MenuItem = ({ item, inverted, mainMenuHoveredHandler, contentContainer, expandHandler, index, subMenuExpanded }) => {
    
    const [hovered, setHovered] = useState(false)

    const hasSubMenuItems = item.submenuColumn1Links.length > 0 || item.submenuColumn2Links.length > 0 || item.submenuColumn2Links.length > 0 || item.rightColumnLinks.length > 0
    // const [subMenuExpanded, setSubMenuExpanded] = useState(false)

    // const subMenuClickHandler = (event) => {
    //     const el = event.target
    //      if ( window.innerWidth < 960 && el.parentNode.classList.contains(Classes.subMenuParent) ) {
    //         event.preventDefault()
    //         setSubMenuExpanded(!subMenuExpanded)
    //     }

    //     // const el = event.target
        
    //     // if ( window.innerWidth < 960 && el.parentNode.classList.contains(Classes.subMenuParent) ) {
    
    //     //   event.preventDefault()
          
    //     //   if ( el.parentNode.classList.contains(Classes.expand) ) {
    //     //     el.nextElementSibling.style.maxHeight =
    //     //     el.nextElementSibling.offsetHeight + "px"
    //     //     setTimeout(() => (el.nextElementSibling.style.maxHeight = null), 0)
    //     //   } else {
    //     //     el.nextElementSibling.style.maxHeight = el.nextElementSibling.children[0].offsetHeight + el.nextElementSibling.children[1].offsetHeight + "px"
    //     //     setTimeout(() => (el.nextElementSibling.style.maxHeight = "none"), 400)
    //     //   }
    //     //   el.parentNode.classList.toggle(Classes.expand)
    //     // }
    //   }
    
      const mouseEnterSubMenuHandler = (event) => {
        if(window.innerWidth > 959 && event.target.classList.contains(Classes.hasSubMenu)) {
            mainMenuHoveredHandler()
        }
      }

    return (
        <li 
            className={[Classes.menuItem, !inverted ? Classes.menuItemLight : null, item.submenuColumn1Links && (item.submenuColumn1Links.length > 0) ? Classes.subMenuParent : null, subMenuExpanded === index ? Classes.expanded : subMenuExpanded !== null ? Classes.otherSubMenuExpanded : null].join(' ')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link 
                className={[item.submenuColumn1Links && (item.submenuColumn1Links.length > 0) ? Classes.hasSubMenu : null, subMenuExpanded === index ? Classes.subMenuExpanded : null].join(' ') } 
                activeClassName="active"
                to={item.link ? `/${item.link.slug}` : '#'}
                onMouseEnter={mouseEnterSubMenuHandler} 
                onClick={hasSubMenuItems ? (e) => expandHandler(e, index) : null}
            >
                {item.linkTitle}
            </Link>
            {hasSubMenuItems ?
                <SubMenu 
                    show={hovered}
                    expand={subMenuExpanded === index}
                    footer={{
                        submenuFooterLink: item.submenuFooterLink,
                        submenuFooterExternalLink: item.submenuFooterExternalLink,
                        submenuFooterLinkTitle: item.submenuFooterLinkTitle,
                        submenuFooterText: item.submenuFooterText,

                    }}
                    submenuTitle={item.submenuTitle}
                    submenuDescription={item.submenuDescription}
                    columns={[
                        ...(item.submenuColumn1Title || item.submenuColumn1Links.length > 0 ?
                        [{
                            title: item.submenuColumn1Title,
                            link: item.submenuColumn1Link,
                            icon: item.submenuColumn1Icon,
                            submenuLinks: item.submenuColumn1Links
                        }] : []),
                        ...(item.submenuColumn2Title || item.submenuColumn2Links.length > 0 ?
                        [{
                            title: item.submenuColumn2Title,
                            link: item.submenuColumn2Link,
                            icon: item.submenuColumn2Icon,
                            submenuLinks: item.submenuColumn2Links
                        }] : []),
                        ...(item.submenuColumn3Title || item.submenuColumn3Links.length > 0 ?
                        [{
                            title: item.submenuColumn3Title,
                            link: item.submenuColumn3Link,
                            icon: item.submenuColumn3Icon,
                            submenuLinks: item.submenuColumn3Links
                        }] : [])
                    ]}
                    columnRight={item.rightColumnLinks || item.rightColumnLinks.length > 0 ? {
                        title: item.rightColumnTitle,
                        description: item.rightColumnDescription,
                        subMenuTitle: item.submenuColumnRightTitle,
                        link: item.submenuColumnRightLink,
                        subMenuIcon: item.submenuColumnRightIcon,
                        links: item.rightColumnLinks
                    } : null}
                    contentContainer={contentContainer}
                    />
            : null}
            
      </li>
    )
}

export default MenuItem