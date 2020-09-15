import React from 'react'

import Classes from './tableRow.module.scss'

const TableRow = ({rowHeader, expanded, expandHandler, cols, label, nested, activeCol, toolTip, bgColors}) => {

    return (
        !nested || (nested && expanded) ?
            <tr className={Classes.row}>
            { rowHeader ? 
                <th scope="row" className={[Classes.rowHeader, nested ? Classes.nested : null, expandHandler ? Classes.paddingLeft : null].join(' ')}>
                    {expandHandler ?
                        <button className={["btn btn-accordion btn-toggle btn-secondary", expanded ? "active" : null, Classes.expandButton].join(' ')} onClick={expandHandler}><span className="sr-only">Expand subrows</span></button>
                    : null}
                    <span className={label ? Classes.marginRight : null}>{rowHeader}</span> 
                    {label}
                    {toolTip ?
                    <span className={Classes.toolTip}>
                        <span className={[Classes.toolTipText, "text-normal text-black"].join(' ')}>
                            {toolTip}
                        </span>
                    </span>
                    : null}
                </th> 
            : null }
            { cols ? cols.map((c, i) => 
                <td key={i} className={[activeCol !== i ? Classes.hiddenMobile : null, Classes.tableCell].join(' ')} style={bgColors && bgColors[i] ? {backgroundColor: bgColors[i]} : null}>
                    {c}
                </td>) 
            : null }
        </tr>
        : null
    )
}

export default TableRow