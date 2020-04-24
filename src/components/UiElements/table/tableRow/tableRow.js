import React from 'react'

const TableRow = ({rowHeader, rows}) => {

    return (
        <tr>
            { rowHeader ? <th scope="row">{rowHeader}</th> : null }
            { rows ? rows.map((r, i) => <td key={i}>{r}</td>) : null }
        </tr>
    )
}

export default TableRow