import React, { useState } from 'react'
import { Link } from "gatsby"
import ImageAll from '../../../../UiElements/ImageAll/ImageAll'
import AnyLink from '../../../../UiElements/AnyLink/AnyLink'
import HtmlText from '../../../../UiElements/HtmlText/HtmlText'

import Classes from './subMenuColumn.module.scss'

const SubMenuColumn = ({ title, icon, link, submenuLinks, expandedDefault, borderLeft }) => {


    const subSubMenuClickHandler = (event, clickable) => {

        event.preventDefault()
        
        if (window.innerWidth < 960 && event.target.parentNode.classList.contains(Classes.hasSubSubMenu)) {
          if (!clickable) {
            event.preventDefault()
          }
          event.target.parentNode.classList.toggle(Classes.expanded)
          if (event.target.parentNode.classList.contains(Classes.expanded)) {
            event.target.nextElementSibling.style.maxHeight =
              event.target.nextElementSibling.children[0].offsetHeight + "px"
          } else {
            event.target.nextElementSibling.style.maxHeight = null
          }
        }
      }

    
    return (
        <div className={ [Classes.subMenuColumn, borderLeft ? Classes.borderLeft : null, "submenuColumn", submenuLinks.length > 0 ? Classes.hasSubSubMenu : null ].join(' ')}>
            {title || icon ? 
            <Link 
                className={[Classes.subMenuTitle, "text-bold text-black"].join(' ')} 
                to={link && link.slug ? link.slug : "#"} 
                target="_self" 
                onClick={!expandedDefault ? (e) => subSubMenuClickHandler(e) : null}>
            <ImageAll classes={Classes.subMenuIcon} image={icon} alt={icon && icon.alt ? icon.alt : `${title} icon`}/>
            {title}
            </Link>
            : null}
            <div className={[Classes.subSubMenu, expandedDefault ? Classes.expandedDefault : null].join(' ')}>
                <ul className="list-unstyled">
                    {submenuLinks.map((subsub, index) => (
                    <li key={index} className={[Classes.subMenuItem, icon ? Classes.indented : null].join(' ')}>
                        <AnyLink 
                            title={subsub.linkTitle}
                            external={subsub.externalLink && true}
                            internal={!subsub.externalLink && true}
                            link={subsub.externalLink || subsub.internalLink && subsub.internalLink.slug}
                            noArrow
                            classes={Classes.subSubMenuItem}
                        />
                        <AnyLink 
                            title={subsub.linkDescription}
                            external={subsub.externalLink && true}
                            internal={!subsub.externalLink && true}
                            link={subsub.externalLink || subsub.internalLink && subsub.internalLink.slug}
                            noArrow
                            classes={["hidden-xs hiden-sm hidden-md", Classes.subMenuDescription].join(' ')}
                        />

                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SubMenuColumn