import React, { useContext, useState, useEffect } from 'react'
import { Link } from "gatsby"
import ImageAll from '../../../../UiElements/ImageAll/ImageAll'
import AnyLink from '../../../../UiElements/AnyLink/AnyLink'
import HtmlText from '../../../../UiElements/HtmlText/HtmlText'
import {CurrentLocaleContext} from '../../../layout'
import Classes from './subMenuColumn.module.scss'

const SubMenuColumn = ({ title, icon, link, submenuLinks, expandedDefault, borderLeft, isSingleColumn, logo }) => {
    
    
    const currentLocale = useContext(CurrentLocaleContext).locale
    const customLangCode = useContext(CurrentLocaleContext).customLangCode
    const location = useContext(CurrentLocaleContext).location
    
    const [search, setSearch] = useState()
    
    useEffect(() => {
        setSearch(location.search)
    }, [location.search])

    console.log('logo', logo, title)
    
    const subSubMenuClickHandler = (event) => {
        
        if (window.innerWidth < 960 && event.target.parentNode.classList.contains(Classes.hasSubSubMenu)) {
            event.preventDefault()
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
        <div className={ [Classes.subMenuColumn, isSingleColumn && !title ? Classes.narrow : null, borderLeft ? Classes.borderLeft : null, "submenuColumn", submenuLinks.length > 0 ? Classes.hasSubSubMenu : null ].join(' ')}>
            
            {title || icon || logo ? 
                link && link.slug ?
                <Link 
                    className={[Classes.subMenuTitle, logo ? Classes.subMenuLogo : null, "text-bold text-black"].join(' ')} 
                    to={(link && link.slug ? `${currentLocale !== 'en' ? '/' + (customLangCode || currentLocale) : ''}/${link.slug}` : "#") + search || ''} 
                    target="_self" 
                    onClick={(e) => subSubMenuClickHandler(e)}>

                    {logo ?
                    <ImageAll image={logo} alt={logo && logo.alt ? logo.alt : `Cobiro logo`}/>
                    : 
                    <>
                    <ImageAll classes={Classes.subMenuIcon} image={icon} alt={icon && icon.alt ? icon.alt : `${title} icon`}/>
                    {title}
                    </>
                    }
                
                    
                </Link>
                :
                <div
                    className={[Classes.subMenuTitle, logo ? Classes.subMenuLogo : null, "text-bold text-black"].join(' ')} 
                                       onClick={(e) => subSubMenuClickHandler(e)}>
                
                {logo ?
                    <ImageAll image={logo} alt={logo && logo.alt ? logo.alt : `Cobiro logo`}/>
                    : 
                    <>
                    <ImageAll classes={Classes.subMenuIcon} image={icon} alt={icon && icon.alt ? icon.alt : `${title} icon`}/>
                    {title}
                    </>
                    }
                </div>
            : null}
            <div className={[Classes.subSubMenu, expandedDefault ? Classes.expandedDefault : null].join(' ')}>
                <ul className="list-unstyled">
                    {submenuLinks.map((subsub, index) => (
                    <li key={index} className={[Classes.subMenuItem, icon ? Classes.indented : null, subsub.hiddenOnDesktop ? Classes.hiddenDesktop : null].join(' ')}>
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