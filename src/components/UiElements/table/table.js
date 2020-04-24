import React from 'react'

import TableRow from './tableRow/tableRow'

const Table = ({name, headers, rows}) => {

    return (
        <table className="table">
            <thead>
                <tr>
                { name ? <th>{ name }</th> : null }
                { headers ? headers.map((h, i) => <th key={i}>{ h }</th>) : null }
                </tr>
            </thead>
            <tbody>
                { rows ? rows.map((r, i) => <TableRow  key={i} rowHeader={} rows={} />) : null}
            </tbody>
            </table>
    )
}

export default Table