import React, { useState } from 'react'
import { Link } from "gatsby"
import SubMenu from '../submenu/submenu'

import Classes from './menuItem.module.scss'

const MenuItem = ({ item, mouseEnterSubMenuHandler, subMenuClickHandler, inverted }) => {
    console.log(item)

    const [hovered, setHovedered] = useState(false)

    return (
        <li 
            className={[Classes.menuItem, inverted ? Classes.inverted : null, item.submenuColumn1Links && (item.submenuColumn1Links.length > 0) ? Classes.subMenuParent : null].join(' ')}
            onMouseEnter={() => setHovedered(true)}
            onMouseLeave={() => setHovedered(false)}

        >
            <Link 
                className={item.submenuColumn1Links && (item.submenuColumn1Links.length > 0) ? Classes.hasSubMenu : null } 
                activeClassName="active" 
                to={item.link ? `/${item.link.slug}` : '#'} 
                onMouseEnter={mouseEnterSubMenuHandler} 
                onClick={subMenuClickHandler}
            >
                {item.linkTitle}
            </Link>
            {item.submenuColumn1Title ?
                <SubMenu 
                    show={hovered}
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
                    />
            : null}
            
      </li>
    )
}

export default MenuItem