import React from 'react'
import { Link } from "gatsby"
import ImageAll from '../../../../UiElements/ImageAll/ImageAll'
import AnyLink from '../../../../UiElements/AnyLink/AnyLink'
import HtmlText from '../../../../UiElements/HtmlText/HtmlText'

import Classes from './submenuColumn.module.scss'

const SubMenuColumn = ({ title, icon, link, submenuLinks, subSubMenuClickHandler }) => {
    
    return (
        <div className={ [Classes.subMenuColumn, "submenuColumn", submenuLinks.length > 0 ? Classes.hasSubSubMenu : null ].join(' ')}>
            {title || icon ? 
            <Link className={[Classes.subMenuTitle, "text-bold text-black"].join(' ')} to={link && link.slug ? link.slug : "#"} target="_self" onClick={(e) => subSubMenuClickHandler(e)}>
            <ImageAll classes={Classes.subMenuIcon} image={icon} alt={icon && icon.alt ? icon.alt : `${title} icon`}/>
            {title}
            </Link>
            : null}
            <div className={Classes.subSubMenu}>
                <ul className="list-unstyled">
                    {submenuLinks.map((subsub, index) => (
                    <li key={index} className={[Classes.subMenuItem, icon ? Classes.indented : null].join(' ')}>
                        <AnyLink 
                            title={subsub.linkTitle}
                            external={subsub.externalLink && true}
                            internal={!subsub.externalLink && true}
                            link={subsub.externalLink || subsub.internalLink && subsub.internalLink.slug}
                            noArrow
                        />
                        <HtmlText RawHtml={subsub.linkDescription} classes={Classes.subMenuDescription}/>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SubMenuColumn