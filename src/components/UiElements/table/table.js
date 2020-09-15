import React, { useState } from 'react'

import TableRow from './tableRow/tableRow'
import ImageAll from '../ImageAll/ImageAll'

import Classes from './table.module.scss'

const Table = ({name, headers, activeCol, rows, icon, bgColors, pricing}) => {
    const [expandedRow, setExpandedRow] = useState()

    const rowExpanderCheck = (i) => {
        let headerRow
        for(i; i > -1; i--) {
            if (!rows[i].nested) {
                headerRow = i
                break;
            }
        }
        return headerRow || null
    }

    return (
        <table className={["table space-xs-up", Classes.table, !headers ? Classes.noHeaders : null].join(' ')}>
            {headers ?
            <thead>
                <tr>
                { name ? <th className={[Classes.tableName, Classes.tableHeader].join(' ')}>{icon ? <ImageAll image={icon} alt={icon.alt || name} classes={Classes.icon} /> : null}{ name }</th> : null }
                { headers ? headers.map((h, i) => 
                    <th key={i} className={[Classes.tableHeader, activeCol !== i ? Classes.hiddenMobile : null].join(' ')} style={bgColors[i] ? {backgroundColor: bgColors[i]} : null}>
                        {h.label ? 
                            <span className={Classes.label}>
                                {h.label}
                            </span> 
                        : null}
                        <span className="h4">{ h.title }</span>
                        <span className="small text-normal block-xs space-small-xs-up">{h.subtitle}</span>
                        <span className="h1 block-xs no-mt">{h[pricing]}</span>
                    </th>) : null }
                </tr>
            </thead>
            : null}
            
            <tbody>
                { rows ? rows.map((r, i) =>  { 
                    
                    // if(r.nested) {
                    //     rowExpanderCheck(i) 
                    // }
                    const subRows = rows[i + 1] && rows[i + 1].nested

                    return (
                        <TableRow expanded={(r.nested ? rowExpanderCheck(i) === expandedRow : null) || expandedRow === i} expandHandler={subRows && !r.nested ? () => setExpandedRow(expandedRow !== i ? i : null) : null} key={i} rowHeader={r.rowName} label={r.label} cols={r.cols} nested={r.nested} activeCol={activeCol} toolTip={r.toolTip} bgColors={bgColors}/>
                    )
                })
             : null}
            </tbody>
            </table>
    )
}

export default Table