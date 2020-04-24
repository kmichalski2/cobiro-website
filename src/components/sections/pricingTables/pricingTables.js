import React from 'react'
import Section from '../../UiElements/Section/Section'
import Table from '../../UiElements/table/table'
import Checkmark from '../../UiElements/checkmark/checkmark'

import Classes from './pricingTables.module.scss'
import Cross from '../../UiElements/cross/cross'
import Label from '../../UiElements/label/label'

const PricingTables = ({ data }) => {
    const {pricingTables, tier1Name, tier2Name} = data

    const tierElementPicker = (el, text) => {
        if(el === 'cross') {
            return <Cross classes={Classes.center} />
        }
        else if(el === "checkmark") {
            return <Checkmark classes={Classes.center} />
        }
        else if(el === "text") {
            return text
        }
        else {
            return null
        }
    }

    console.log(pricingTables)
    return (
        <Section>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        {pricingTables ? pricingTables.map((t, i) => 
                            <div key={i} className={Classes.table}>
                                <Table  
                                    name={t.tableName} icon={t.icon} 
                                    headers={[tier1Name, tier2Name]} 
                                    rows={
                                        t.row.map(r => { 
                                            return {
                                                rowName: r.rowName, 
                                                label: r.commingSoon || r.new ? <Label classes={Classes.marginLeft} label={r.commingSoon ? "Comming soon" : r.new ? "New" : null} color={r.commingSoon ? "blue" : r.new ? "green" : null}/> : null, 
                                                nested: r.nestedRow, 
                                                cols: [tierElementPicker(r.tier1Element, r.tier1Text), tierElementPicker(r.tier2Element, r.tier2Text)]
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