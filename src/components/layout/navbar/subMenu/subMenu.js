import React, { useEffect } from 'react'
import { Link } from "gatsby"
import SubMenuColumn from './subMenuColumn/subMenuColumn'
import HtmlText from '../../../UiElements/HtmlText/HtmlText'
import AnyLink from '../../../UiElements/AnyLink/AnyLink'

import Classes from './subMenu.module.scss'


const SubMenu = ({ footer, columns, columnRight, submenuTitle, submenuDescription, show }) => {
    console.log('columns: ', columns)

    useEffect(() => {
        setSubMenuOffset()
        console.log('SHOW: ', show)
    })
    
    const submenu = React.createRef()

    function getPageTopLeft(el) {
        const rect = el.getBoundingClientRect();
        const docEl = document.documentElement;
        return rect.left + (window.pageXOffset || docEl.scrollLeft || 0)
      }
      const setSubMenuOffset = () => {
          // if (submenu.current) {
          //     const sub = submenu.current
              
          //     if(window.innerWidth > "960") {
          //       const subOffset = getPageTopLeft(sub)
          //       if(subOffset < 0 ) {
          //         sub.style.marginLeft = -1 * subOffset + 16 + 'px'
          //         sub.querySelector(Classes.subMenuTriangle).style.marginLeft = subOffset + -16 + 'px'
          //         return true
          //       } else {
          //         sub.style.marginLeft = 0
          //         sub.querySelector(Classes.subMenuTriangle).style.marginLeft = 0
          //       }
          //       return false
          //   } else {
          //     sub.style.marginLeft = '-1.1rem'
          //   }
          // }
      }

      const subSubMenuClickHandler = (event, clickable) => {
        if (window.innerWidth < 960 && event.target.parentNode.classList.contains(Classes.hasSubMenu)) {
          if (!clickable) {
            event.preventDefault()
          }
          event.target.parentNode.classList.toggle("expanded")
          if (event.target.parentNode.classList.contains("expanded")) {
            event.target.nextElementSibling.style.maxHeight =
              event.target.nextElementSibling.children[0].offsetHeight + "px"
          } else {
            event.target.nextElementSibling.style.maxHeight = null
          }
        }
      }
      

    return (
        <div className={[Classes.subMenu, show ? Classes.show : null].join(' ')} ref={submenu}>
            <div className={Classes.subMenuInner}>
              <div>
                <div className="space-xs-up">
                  <h3>{ submenuTitle }</h3>
                  <HtmlText RawHtml={submenuDescription} classes="small" />
                </div>
                <div className="flex-lg">
                  {columns && columns.length > 0 ? columns.map((sub, index) => (
                    
                      <SubMenuColumn 
                        key={index}
                        title={sub.title}
                        icon={sub.icon} 
                        link={sub.link} 
                        submenuLinks={sub.submenuLinks}
                        subSubMenuClickHandler={subSubMenuClickHandler}
                      />
                      
                  )) : null}
                </div>
              </div>
              <div className={Classes.borderLeft}>
                <div className="space-xs-up">
                  <h3>{ columnRight.title }</h3>
                  <HtmlText RawHtml={columnRight.description} classes={["small", Classes.columnRightSpacing].join(' ')} />
                </div>
                  <SubMenuColumn 
                    subSubMenuClickHandler={subSubMenuClickHandler}
                    submenuLinks={columnRight.links}
                  />
              </div>
                </div>
                
                { footer.submenuFooterText || (footer.submenuFooterLinkTitle && (footer.submenuFooterLink || footer.submenuFooterExternalLink)) ?
                <div className={[Classes.subMenuFooter, "center text-center"].join(' ')}>
                    { footer.submenuFooterText ? <p className={["small", Classes.submenuFooterText].join(' ')}>{ footer.submenuFooterText }</p> : null }
                    <AnyLink 
                      internal={footer.submenuFooterExternalLink && true}
                      external={footer.submenuFooterLink && footer.submenuFooterLink.slug && true}
                      link={footer.submenuFooterExternalLink || footer.submenuFooterLink && footer.submenuFooterLink.slug}
                      title={footer.submenuFooterLinkTitle}
                      button
                    />
                    
                </div>
                
                : null }
            
            <div className={Classes.subMenuTriangle}></div>
        </div>
    )
}

export default SubMenu