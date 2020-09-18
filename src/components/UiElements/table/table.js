import React, { useState } from 'react'
import BaseTable from './baseTable/baseTable'

import Classes from './table.module.scss'

const Table = ({expandable, tableName, bgColors, activeCol, rows}) => {
    
    const [maxHeight, setMaxHeight] = useState(1)

    const tableWrap = React.createRef()

    let rowHeights = 0

    const expandClickHandler = () => {
        if(maxHeight === 1) {
            const tableHeight = tableWrap.current.firstChild.offsetHeight
            setMaxHeight(tableHeight)
        } else {
            setMaxHeight(1)
        }
    }

    const rowExpandHandler = (val) => {
        const oldMaxHeight = maxHeight

        rowHeights = rowHeights + val
        setMaxHeight(oldMaxHeight + rowHeights)
        
    }

    return (
        <div className={[Classes.table, expandable ? [Classes.expandable, maxHeight > 1 ? Classes.expanded : Classes.collapsed].join(' ') : null].join(' ')} >
            <div className={Classes.heading}>
                <h4 className="space-xs-up">{tableName}</h4>
                {expandable && 
                    <button 
                        className={
                            [
                                "btn btn-accordion btn-toggle btn-secondary", 
                                maxHeight > 1 ? "active" : null, 
                                Classes.expandButton
                            ].join(' ')
                        } 
                        onClick={() => expandClickHandler()}
                        >
                            <span className="sr-only">Expand table</span>
                    </button>
                }
            </div>
            <div ref={tableWrap} className={Classes.tableWrapper} style={{maxHeight: maxHeight + 'px'}}>
                <BaseTable  
                    expandable={expandable}
                    bgColors={bgColors}
                    activeCol={activeCol}
                    rows={rows} 
                    rowExpandHandler={rowExpandHandler}
                /> 
            </div>
        </div>
    )
}

export default Table