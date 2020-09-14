import React from 'react'

import TableRow from './tableRow/tableRow'
import ImageAll from '../ImageAll/ImageAll'

import Classes from './table.module.scss'

const Table = ({name, headers, activeCol, rows, icon}) => {
    console.log(rows)
    return (
        <table className={["table", Classes.table].join(' ')}>
            <thead>
                <tr>
                { name ? <th className={[Classes.tableName, Classes.tableHeader].join(' ')}>{icon ? <ImageAll image={icon} alt={icon.alt || name} classes={Classes.icon} /> : null}{ name }</th> : null }
                { headers ? headers.map((h, i) => 
                    <th key={i} className={[Classes.tableHeader, activeCol ==! i ? Classes.hiddenMobile : null].join(' ')}>
                        <span className="h5">{ h.title }</span>
                        <span className="small text-normal block-xs">{h.subtitle}</span>
                        <span className="h1 block-xs">{h['monthlyPrice']}</span>
                    </th>) : null }
                </tr>
            </thead>
            <tbody>
                { rows ? rows.map((r, i) => <TableRow  key={i} rowHeader={r.rowName} label={r.label} cols={r.cols} nested={r.nested} activeCol={activeCol} toolTip={r.toolTip}/>) : null}
            </tbody>
            </table>
    )
}

export default Table