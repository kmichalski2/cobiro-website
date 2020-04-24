import React from 'react'

import Classes from './tableRow.module.scss'

const TableRow = ({rowHeader, cols, label, nested}) => {
    
    return (
        <tr>
            { rowHeader ? <th scope="row" className={nested ? Classes.nested : null}>{rowHeader} {label}</th> : null }
            { cols ? cols.map((c, i) => <td key={i}>{c}</td>) : null }
        </tr>
    )
}

export default TableRow