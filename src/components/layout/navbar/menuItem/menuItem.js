import React, { useState, useContext, useEffect } from 'react'
import { Link } from "gatsby"
import SubMenu from '../subMenu/subMenu'
import {CurrentLocaleContext} from '../../layout'
import Classes from './menuItem.module.scss'

const MenuItem = ({ item, inverted, mainMenuHoveredHandler, contentContainer, expandHandler, index, subMenuExpanded, currentLocale, customLangCode }) => {
    
    const [hovered, setHovered] = useState(false)

    const hasSubMenuItems = item.submenuColumn1Links.length > 0 || item.submenuColumn2Links.length > 0 || item.submenuColumn2Links.length > 0 || item.rightColumnLinks.length > 0

    const location = useContext(CurrentLocaleContext).location
    const [search, setSearch] = useState()
    
    useEffect(() => {
        setSearch(location.search)
    }, [location.search])


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
                to={(item.link ? `${currentLocale !== 'en' ? '/' + (customLangCode || currentLocale) : ''}/${item.link.slug}` : '/#') + search || ''}
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
                        submenuFooterTitle: item.submenuFooterTitle,
                        submenuFooterImage: item.submenuFooterImage,

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
                        logo: item.rightColumnLogo,
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