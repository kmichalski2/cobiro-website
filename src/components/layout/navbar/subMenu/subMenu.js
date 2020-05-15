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
    const [windowWidth, setWindowWidth] = useState()

    useEffect(() => {
      setWindowWidth(window.innerWidth)        
      window.addEventListener("resize", resizeHandler)

      return () => window.removeEventListener('resize', resizeHandler)
    },[])

    useEffect(() => {
      setSubMenuOffset()
    }, [windowWidth])

    const resizeHandler = () => {
      setWindowWidth(window.innerWidth)
    }

    const submenu = React.createRef()
    const subMenuTriangle = React.createRef()

    const getPageTopLeft = (el) => {
      const rect = el.getBoundingClientRect();
      const docEl = contentContainer.current;
      return rect.left - (offset || 0) - (window.pageXOffset || ((windowWidth - docEl.clientWidth) / 2) || 0)
    }

    const setSubMenuOffset = () => {
      
        if (submenu.current) {
          
            const sub = submenu.current
            
            if(windowWidth > "960") {
              const subOffset = getPageTopLeft(sub)

              if(subOffset < 0 ) {
                setOffset(-1 * subOffset + 7.5)
                setTriangleOffset(subOffset - 7.5)
                return true
              } else {
                setOffset(0)
                setTriangleOffset(0)
              }
              return false
          } else {
            setOffset(0)
          }
        }
    }

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
                <div className={["space-xs-up", Classes.colRightTitle].join(' ')}>
                  <h3>{ columnRight.title }</h3>
                  <HtmlText RawHtml={columnRight.description} classes={["small hidden-xs hidden-sm hidden-md", Classes.columnRightSpacing].join(' ')} />
                </div>
                  <SubMenuColumn 
                    submenuLinks={columnRight.links}
                    expandedDefault
                    borderLeft
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