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

    const isSingleColumn = columns.length === 1

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
            {submenuTitle || submenuDescription ? 
                <div className="space-xs-up" style={{width: '100%', flex: '2'}}>
                  {submenuTitle ? <h3>{ submenuTitle }</h3> : null}
                  {submenuDescription ? <HtmlText RawHtml={submenuDescription} classes="small  hidden-xs hidden-sm hidden-md" /> : null }
                </div>
                : null}
                <div className="flex-lg">
              <div>
                <div className="flex-lg">
                  {columns && columns.length > 0 ? columns.map((sub, index) => (
                      <SubMenuColumn 
                        key={index}
                        title={sub.title}
                        icon={sub.icon} 
                        link={sub.link} 
                        submenuLinks={sub.submenuLinks}
                        expandedDefault={!sub.title && true}
                        isSingleColumn={isSingleColumn}
                      />  
                  )) : null}
                </div>
              </div>
              {columnRight.subMenuTitle || columnRight.links.length > 0 ?
              <div className={Classes.borderLeft}>
                  <SubMenuColumn 
                    title={columnRight.subMenuTitle}
                    icon={columnRight.subMenuIcon}
                    logo={columnRight.logo}
                    submenuLinks={columnRight.links}
                    expandedDefault={!columnRight.subMenuTitle && true}
                    borderLeft
                  />
              </div>
              : null}
              </div>
                </div>
                { footer.submenuFooterText || (footer.submenuFooterLinkTitle && (footer.submenuFooterLink || footer.submenuFooterExternalLink)) ?
                <SubMenuFooter 
                  title={footer.submenuFooterTitle}
                  text={footer.submenuFooterText}
                  image={footer.submenuFooterImage}
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