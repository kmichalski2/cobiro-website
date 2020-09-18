import React, { useEffect, useState } from 'react'
import Section from '../../UiElements/Section/Section'
import BaseTable from '../../UiElements/table/baseTable/baseTable'
import Checkmark from '../../UiElements/checkmark/checkmark'

import Classes from './pricingTables.module.scss'
import Cross from '../../UiElements/cross/cross'
import Label from '../../UiElements/label/label'
import ButtonSwitch from '../../UiElements/buttonSwitch/buttonSwitch'
import Table from '../../UiElements/table/table'
import CtaCard from '../../UiElements/ctaCard/ctaCard'

const PricingTables = ({ data, navbarHeight }) => {

    const headers = data.pricingHeaderTable && data.pricingHeaderTable.headers
    const bgColors = headers && headers.map(h => h.bgColor && h.bgColor.hex || '')
    
    const {pricingTables, pricingHeaderTable} = data

    const monthlyPricingName = 'monthlyPrice'
    const yearlyPricingName = 'yearlyPrice'

    const pricingCta = data.pricingFooterCtaTitle || data.pricingFooterCtaText 

    const [activeCol, setActiveCol] = useState(0)
    const [activePricing, setActivePricing] = useState(monthlyPricingName)
    const [headerFixed, setHeaderFixed] = useState(false)
    const [tableYPos, setTableYPos] = useState(0)


    const tableHeaderRef = React.createRef()
    const tablesRef = React.createRef()

    let tableHeader

    // pricingFooterCta_title
    // pricingFooterCtaText
    // pricingFooterCtaLinkTitle
    // pricingFooterCtaInternalLink {
    //   slug
    // }
    // pricingFooterCtaExternalLink
    // pricingFooterCtaBgColor {
    //   hex
    // }

    const tierElementPicker = (el) => {
        if(el === 'cross') {
            return <Cross classes={Classes.center} />
        }
        else if(el === "checkmark") {
            return <Checkmark classes={Classes.center} />
        }
        else if(el === "empty") {
            return ""
        }
        else {
            return el
        }
    }

    const scrollHandler = () => {
        // if(tableHeight) {
            const tableRect = tableHeader.getBoundingClientRect()
            // const scrolledPassed = tableRect.top < ((tableHeight - navbarHeight - 100) * -1)
            if(tableRect.top < 0) {
                setHeaderFixed(true)
                setTableYPos((-1 * tableRect.top) + navbarHeight)
            // } else if(scrolledPassed) {
            //     setHeaderFixed(false)
            } else {
                setHeaderFixed(false)
            }
        // }
        
    }

    useEffect(() => { 
        if(tableHeaderRef.current) {
            tableHeader = tableHeaderRef.current   
            if(typeof window !== 'undefined') {

                window.addEventListener('scroll', () => scrollHandler(), { passive: true })

                return () => window.removeEventListener('scroll', () => scrollHandler(), { passive: true })
            }
        }
         
     }, [navbarHeight])

     

    // let el


    // let callback = (entries, observer) => {
    //     entries.forEach(entry => {
    //         // console.log('top', entry.boundingClientRect.top)
    //         // console.log('window', window.pageYOffset)
    //         const scrollPosPassedTables = entry.boundingClientRect.top < (-1 * entry.target.offsetHeight)
            
    //         if(entry.boundingClientRect.top < 0 && entry.boundingClientRect.top > (-1 * entry.target.offsetHeight)) {
    //             console.log('scrolling in tables', entry.boundingClientRect.top, entry.target.offsetHeight)
    //             setIsFixed(true)
    //         } 
    //         if(entry.boundingClientRect.top > 0) {
    //             console.log('scrolling above tables', entry.boundingClientRect.top, entry.target.offsetHeight)
    //             setIsFixed(false)
    //         } 
    //         if(scrollPosPassedTables) {
    //             console.log('scrollPosPassedTables', entry.boundingClientRect.top, entry.target.offsetHeight)
    //             setIsFixed(false)
    //         } 
    //       // Each entry describes an intersection change for one observed
    //       // target element:
    //       //   entry.boundingClientRect
    //       //   entry.intersectionRatio
    //       //   entry.intersectionRect
    //       //   entry.isIntersecting
    //       //   entry.rootBounds
    //       //   entry.target
    //       //   entry.time
    //     })
    //   }

    // useEffect(() => {
    //     el = table.current.getBoundingClientRect()

        
    //     const options = {
    //         // root: tableSection.current,
    //         root: null,
    //         rootMargin: '50px 0px -100%',
    //         threshold: 0
    //     }
        
    //     const observer = new IntersectionObserver(callback, options);

    //     const target = table.current;
    //     observer.observe(target);
    // }, [])

    
    const tierSwitcher = headers && headers.length > 1 ? 
        <div className="row space-xs-up">
            <div className="col col-xs-12">
                <div className={Classes.tabs}>
                    <ButtonSwitch
                        buttons={
                            headers.map((h, i) => {
                                return {
                                    clickHandler: () => setActiveCol(i),
                                    title: h.title,
                                    active: activeCol === i
                                }
                            }

                            )
                        }
                    />
                </div>
            </div>
        </div>
    : null

    return (
        <Section classes={Classes.tablesSection}>
            <div className={["container", pricingCta ? "space-xs-up" : null, Classes.tablesSectionInner].join(' ')}>
                {pricingHeaderTable ?
                
            
                <div className="row space-big-xs-up">
                    <div className="col col-xs-12 text-center center">
                        <ButtonSwitch
                            buttons={[
                                {
                                    clickHandler: () => setActivePricing(monthlyPricingName),
                                    title: pricingHeaderTable.monthlyPriceName,
                                    extraText: pricingHeaderTable.monthlyPriceExtraText,
                                    active: activePricing === monthlyPricingName
                                },
                                {
                                    clickHandler: () => setActivePricing(yearlyPricingName),
                                    title: pricingHeaderTable.yearlyPriceName,
                                    extraText: pricingHeaderTable.yearlyPriceExtraText,
                                    active: activePricing === yearlyPricingName
                                }
                            ]}
                        />
                    </div>
                </div>
                : null}
                
                {tierSwitcher}
                {pricingHeaderTable ?
                <div ref={tableHeaderRef} className="row">
                    <div className="col col-xs-12 space-xs-up">
                    <BaseTable
                        navbarHeight={navbarHeight}
                        headerFixed={headerFixed}
                        scrollPos={tableYPos}
                        headers={pricingHeaderTable.headers}
                        pricing={activePricing}
                        bgColors={bgColors}
                        activeCol={activeCol}
                        name={' '}
                        rows={
                            pricingHeaderTable.row.map(r => { 
                                return {
                                    rowName: r.rowName, 
                                    label: r.labelText ? <Label label={r.labelText} color={r.labelColor || "blue"}/> : null, 
                                    nested: r.nestedRow, 
                                    cols: r.columns ? r.columns.map(col => tierElementPicker(col)) : [],
                                    toolTip: r.tooltip
                                }
                            })
                        }
                         /> 
                        
                    </div>
                </div>
                : null
                }
                
                <div ref={tablesRef}  className="row">
                    <div className="col col-xs-12">
                        
                        {pricingTables ? pricingTables.map((t, i) => 
                            <div key={i} className={Classes.tableWrap}>
                                {tierSwitcher}
                                <Table 
                                    expandable={t.expandable}                                    
                                    tableName={t.tableName}
                                    bgColors={bgColors}
                                    activeCol={activeCol}
                                    rows={
                                        t.row.map(r => { 
                                            return {
                                                rowName: r.rowName, 
                                                label: r.labelText ? <Label label={r.labelText} color={r.labelColor || "blue"}/> : null, 
                                                nested: r.nestedRow, 
                                                cols: r.columns ? r.columns.map(col => tierElementPicker(col)) : []
                                            }
                                        })
                                    }
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            {pricingCta ? 
            <div className="container">
                <div className="row">
                    <div className="col col-col-xs-12">
                        <CtaCard 
                            title={data.pricingFooterCtaTitle}
                            text={data.pricingFooterCtaText}
                            internalLink={data.pricingFooterCtaInternalLink && data.pricingFooterCtaInternalLink.slug}
                            externalLink={data.pricingFooterCtaExternalLink}
                            linkTitle={data.pricingFooterCtaLinkTitle}
                            bgColor={data.pricingFooterCtaBgColor && data.pricingFooterCtaBgColor.hex}
                            lightText={data.pricingFooterCtaTextColor === 'light'}
                        />
                    </div>
                </div>
            </div>
            : null}
        </Section>
    )
}
// pricingFooterCta_title
    // pricingFooterCtaText
    // pricingFooterCtaLinkTitle
    // pricingFooterCtaInternalLink {
    //   slug
    // }
    // pricingFooterCtaExternalLink
    // pricingFooterCtaBgColor {
    //   hex
    // }

export default PricingTables