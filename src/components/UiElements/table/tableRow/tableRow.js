import React from 'react'

import Classes from './tableRow.module.scss'

const TableRow = ({rowHeader, cols, label, nested, activeCol}) => {
    
    return (
        <tr>
            { rowHeader ? <th scope="row" className={nested ? Classes.nested : null}><span className={label ? Classes.marginRight : null}>{rowHeader}</span> {label}</th> : null }
            { cols ? cols.map((c, i) => <td key={i} className={[activeCol ==! i ? Classes.hiddenMobile : null, Classes.tableCell].join(' ')}>{c}</td>) : null }
        </tr>
    )
}

export default TableRow