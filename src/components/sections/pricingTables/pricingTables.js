import React, { useState } from 'react'
import Section from '../../UiElements/Section/Section'
import Table from '../../UiElements/table/table'
import Checkmark from '../../UiElements/checkmark/checkmark'

import Classes from './pricingTables.module.scss'
import Cross from '../../UiElements/cross/cross'
import Label from '../../UiElements/label/label'

const PricingTables = ({ data }) => {
    const {pricingTables, columnHeadings} = data

    const [activeCol, setActiveCol] = useState(0)

    console.log(columnHeadings)

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

    const toggleColumnsMobileHandler = () => {

    }

    console.log(pricingTables)
    return (
        <Section>
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        {columnHeadings && columnHeadings.length > 1 ? 
                        
                            <div className={Classes.tabs}>
                                { columnHeadings.map((h, i) => 
                                    <button 
                                        key={i} 
                                        className={["btn btn-secondary", Classes.tab, activeCol === i ? Classes.active : null].join(' ')}
                                        onClick={() => setActiveCol(i)}
                                        >{h}</button>
                                ) }
                            </div>
                        
                        : null}
                        {pricingTables ? pricingTables.map((t, i) => 
                            <div key={i} className={Classes.table}>
                                <Table  
                                    name={t.tableName} icon={t.icon} 
                                    headers={columnHeadings}
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
                        ) : null}
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default PricingTables