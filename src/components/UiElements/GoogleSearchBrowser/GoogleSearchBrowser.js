import React from 'react'

import GSearchBrowser from './GoogleSearchBrowser.module.scss'

const GoogleSearchBrowser = ({searchTerm, children}) => {
    

    return (
        <div className={["space-sm", "card", "card-visible", "space-xs", "img-responsive", GSearchBrowser.adWrapper].join(' ')}>
            <div className={GSearchBrowser.searchBar}>
                <p className="small text-left">{searchTerm}</p>
            </div>
            {children}
        </div>
    )
}

export default GoogleSearchBrowser