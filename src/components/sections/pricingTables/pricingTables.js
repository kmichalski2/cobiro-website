import React, { useEffect, useState, useContext } from 'react'
import Section from '../../UiElements/Section/Section'
import BaseTable from '../../UiElements/table/baseTable/baseTable'
import Checkmark from '../../UiElements/checkmark/checkmark'
import {CurrentLocaleContext} from '../../layout/layout'

import Classes from './pricingTables.module.scss'
import Cross from '../../UiElements/cross/cross'
import Label from '../../UiElements/label/label'
import ButtonSwitch from '../../UiElements/buttonSwitch/buttonSwitch'
import Table from '../../UiElements/table/table'
import CtaCard from '../../UiElements/ctaCard/ctaCard'
const queryString = require('query-string');


const PricingTables = ({ data, navbarHeight, notificationPadding }) => {

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
    const [showModal, setShowModal] = useState()

    const location = useContext(CurrentLocaleContext).location
    const parsedLocation = queryString.parse(location.search);

    useEffect(() => {
        
            console.log('location', location)
            console.log('parsed', parsedLocation);
            let {returning, ...returningData} = parsedLocation;
            if(parsedLocation && returning === "1") {                
                setShowModal(returningData)
            }
    }, [])

    const tableHeaderRef = React.createRef()
    const tablesRef = React.createRef()

    let tableHeader

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

    
    const tierSwitcher = headers && headers.length > 1 ? 
        <div className="row space-xs-up">
            <div className="col col-xs-12">
                <div className={Classes.tabsWrapper}>
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
                            xsColumn
                        />
                    </div>
                </div>
            </div>
        </div>
    : null

    return (
        <>
        {pricingHeaderTable ?
        <Section
            
            classes="bg-gradiant-faded"
            >
            <div className="container">
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
                            xsColumn
                        />
                    </div>
                </div>

                <div ref={tableHeaderRef} className="row">
                    <div className="col col-xs-12 space-xs-up">
                    <BaseTable
                        returnedModalOpen={showModal}
                        navbarHeight={navbarHeight}
                        headerFixed={headerFixed}
                        scrollPos={tableYPos}
                        headers={pricingHeaderTable.headers}
                        monthlyPriceBillingRate={pricingHeaderTable.monthlyPriceBillingRate}
                        yearlyPriceBillingRate={pricingHeaderTable.yearlyPriceBillingRate}
                        yearlyPriceName={yearlyPricingName}
                        monthlyPriceName={monthlyPricingName}
                        pricing={activePricing}
                        bgColors={bgColors}
                        activeCol={activeCol}
                        name={' '}
                        // rows={
                        //     pricingHeaderTable.row.map(r => { 
                        //         return {
                        //             rowName: r.rowName, 
                        //             label: r.labelText ? <Label label={r.labelText} color={r.labelColor || "blue"}/> : null, 
                        //             nested: r.nestedRow, 
                        //             cols: r.columns ? r.columns.map(col => tierElementPicker(col)) : [],
                        //             toolTip: r.tooltip
                        //         }
                        //     })
                        // }
                         /> 
                        
                    </div>
                </div>
            </div>
        </Section>
        : null }
        <Section classes={Classes.tablesSection}>
            <div className={["container", pricingCta ? "space-xs-up" : null, Classes.tablesSectionInner].join(' ')}> 
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
                                                cols: r.columns ? r.columns.map(col => tierElementPicker(col)) : [],
                                                toolTip: r.tooltip
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
        </>
    )
}

export default PricingTables