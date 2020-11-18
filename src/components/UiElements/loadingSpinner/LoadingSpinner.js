import React from 'react'

import Classes from './LoadingSpinner.module.scss'

const LoadingSpinner = ({loading, large, children}) => {

    return (
        <>
        <span className={[large ? Classes.large : null, loading ? Classes.loading : null].join(' ')}>
        <span>{children}</span>
        </span>
        
        </>
    )
}

export default LoadingSpinner