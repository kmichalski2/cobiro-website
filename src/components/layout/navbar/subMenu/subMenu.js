import React, { useEffect, useState } from 'react'
import { Link } from "gatsby"
import SubMenuColumn from './subMenuColumn/subMenuColumn'
import HtmlText from '../../../UiElements/HtmlText/HtmlText'
import AnyLink from '../../../UiElements/AnyLink/AnyLink'

import Classes from './subMenu.module.scss'
import SubMenuFooter from './subMenuFooter/subMenuFooter'


const SubMenu = ({ footer, columns, columnRight, submenuTitle, submenuDescription, show, expand,  contentContainer}) => {

    const [offset, setOffset] = useState(0)
    const [triangleOffset, setTriangleOffset] = useState(0)

    useEffect(() => {
        setSubMenuOffset()
        window.addEventListener("resize", resizeHandler)
    },[])

    
    const resizeHandler = () => {
      setSubMenuOffset()
    }

    

    const submenu = React.createRef()
    const subMenuTriangle = React.createRef()

    function getPageTopLeft(el) {
        const rect = el.getBoundingClientRect();
        const docEl = contentContainer.current;
        return rect.left - (window.pageXOffset || ((window.innerWidth - docEl.clientWidth) / 2) || 0)

      }
      const setSubMenuOffset = () => {
          if (submenu.current) {
              const sub = submenu.current
              
              if(window.innerWidth > "960") {
                const subOffset = getPageTopLeft(sub)

                if(subOffset < 0 ) {
                  // sub.style.marginLeft = -1 * subOffset + 16 + 'px'
                  setOffset(-1 * subOffset + 16)
                  setTriangleOffset(subOffset + -16)
                  // subMenuTriangle.current.style.marginLeft = subOffset + -16 + 'px'
                  return true
                } else {
                  // sub.style.marginLeft = 0
                  // subMenuTriangle.current.style.marginLeft = 0
                  setOffset(0)
                  setTriangleOffset(0)
                }
                return false
            } else {
              // sub.style.marginLeft = '-1.1rem'
              setOffset(-17.6)
            }
          }
      }
      // setSubMenuOffset()
      

      // const subSubMenuClickHandler = (event, clickable) => {
      //   if (window.innerWidth < 960 && event.target.parentNode.classList.contains(Classes.hasSubMenu)) {
      //     if (!clickable) {
      //       event.preventDefault()
      //     }
      //     event.target.parentNode.classList.toggle("expanded")
      //     if (event.target.parentNode.classList.contains("expanded")) {
      //       event.target.nextElementSibling.style.maxHeight =
      //         event.target.nextElementSibling.children[0].offsetHeight + "px"
      //     } else {
      //       event.target.nextElementSibling.style.maxHeight = null
      //     }
      //   }
      // }
      

    return (
        <div className={[Classes.subMenu, show ? Classes.show : null, expand ? Classes.expand : null].join(' ')} ref={submenu} style={{marginLeft: `${offset}px`}}>
            <div className={Classes.subMenuInner}>
              <div>
                <div className="space-xs-up">
                  <h3>{ submenuTitle }</h3>
                  <HtmlText RawHtml={submenuDescription} classes="small  hidden-xs hidden-sm hidden-md" />
                </div>
                <div className="flex-lg">
                  {columns && columns.length > 0 ? columns.map((sub, index) => (
                    
                      <SubMenuColumn 
                        key={index}
                        title={sub.title}
                        icon={sub.icon} 
                        link={sub.link} 
                        submenuLinks={sub.submenuLinks}
                      />
                      
                  )) : null}
                </div>
              </div>
              <div className={Classes.borderLeft}>
                <div className="space-xs-up">
                  <h3>{ columnRight.title }</h3>
                  <HtmlText RawHtml={columnRight.description} classes={["small hidden-xs hidden-sm hidden-md", Classes.columnRightSpacing].join(' ')} />
                </div>
                  <SubMenuColumn 
                    submenuLinks={columnRight.links}
                    expandedDefault
                  />
              </div>
                </div>
                
                { footer.submenuFooterText || (footer.submenuFooterLinkTitle && (footer.submenuFooterLink || footer.submenuFooterExternalLink)) ?
                <SubMenuFooter 
                  text={footer.submenuFooterText}
                  externalLink={footer.submenuFooterExternalLink}
                  internalLink={footer.submenuFooterLink && footer.submenuFooterLink.slug}
                  linkTitle={footer.submenuFooterLinkTitle}
                  classes={Classes.subMenuFooter}
                />

                
                : null }
            
            <div ref={subMenuTriangle} className={Classes.subMenuTriangle} style={{marginLeft: `${triangleOffset}px`}}></div>
        </div>
    )
}

export default SubMenu