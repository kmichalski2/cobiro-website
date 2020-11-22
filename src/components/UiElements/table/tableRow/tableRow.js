import React, { useEffect, useState } from 'react'

import Classes from './tableRow.module.scss'

const TableRow = ({rowHeader, expanded, expandHandler, cols, label, nested, activeCol, toolTip, bgColors, rowExpandHandler, topRow, i}) => {
    
    const [maxHeight, setMaxHeight] = useState(0)
    const row = React.createRef()
    
    const expandChangeHandler = (callback) => {
        if(expanded) {
            const height = row.current.firstChild.offsetHeight
            setMaxHeight(height)
            rowExpandHandler(height)
        } else {            
            const height = row.current.firstChild.offsetHeight
            rowExpandHandler(maxHeight * -1)
            setMaxHeight(0)
        }
        if(callback) {
            expandHandler(callback)
        }
    }

    useEffect(() => {
        if(nested) {
            expandChangeHandler()
        }
    }, [expanded])

    

    return (
            <tr ref={row} className={[Classes.row, nested && !expanded ? Classes.collapsed : null, expanded && 'poo'].join(' ')}>
            { rowHeader ? 
                <th scope="row" className={[Classes.rowHeader, nested ? Classes.nested : null, expandHandler ? Classes.paddingLeft : null].join(' ')}>
                    {expandHandler ?
                        <button 
                            className={["btn btn-accordion btn-toggle-small btn-secondary", expanded ? "active" : null, Classes.expandButton].join(' ')} 
                            onClick={() => expandHandler()}
                            >
                                <span className="sr-only">Expand subrows</span>
                        </button>
                    : null}
                    <span className={[label ? Classes.marginRight : null, 'text-normal'].join(' ')}>{rowHeader}</span> 
                    {label}
                    {toolTip ?
                    <span className={[Classes.toolTip, "text-regular"].join(' ')}>
                        <span className={[Classes.toolTipText, "text-normal text-black"].join(' ')}>
                            {toolTip}
                        </span>
                    </span>
                    : null}
                </th> 
            : null }
            { cols ? cols.map((c, i) => 
                <td key={i} className={[activeCol !== i ? Classes.hiddenMobile : Classes.activeColMobile, topRow ? Classes.topRow : null, Classes.tableCell].join(' ')} style={bgColors && bgColors[i] ? {backgroundColor: bgColors[i]} : null}>
                    {c}
                </td>) 
            : null }
        </tr>
    )
}

export default TableRow