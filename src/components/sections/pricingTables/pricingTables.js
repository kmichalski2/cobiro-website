import React, { useState } from 'react'
import Section from '../../UiElements/Section/Section'
import Table from '../../UiElements/table/table'
import Checkmark from '../../UiElements/checkmark/checkmark'

import Classes from './pricingTables.module.scss'
import Cross from '../../UiElements/cross/cross'
import Label from '../../UiElements/label/label'
import ButtonSwitch from '../../UiElements/buttonSwitch/buttonSwitch'

const PricingTables = ({ data }) => {
    console.log(data)

    const headers = data.pricingHeaderTable && data.pricingHeaderTable.headers
    const bgColors = headers && headers.map(h => h.bgColor && h.bgColor.hex || '')
    
    const {pricingTables, pricingHeaderTable} = data

    const monthlyPricingName = 'monthlyPrice'
    const yearlyPricingName = 'yearlyPrice'

    const [activeCol, setActiveCol] = useState(0)
    const [activePricing, setActivePricing] = useState(monthlyPricingName)



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
            <div className="container">
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
                <div className="row">
                    <div className="col col-xs-12 space-xs-up">
                    <Table  
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
                
                <div className="row">
                    <div className="col col-xs-12">
                        
                        {pricingTables ? pricingTables.map((t, i) => 
                        <div key={i}>
                            {tierSwitcher}
                            <div key={i} className={Classes.table}>
                                <h4 className="space-xs-up">{t.tableName}</h4>
                                <Table  
                                    // name={t.tableName}
                                    // headers={columnHeadings}
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
                                    } /> 
                            </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default PricingTables