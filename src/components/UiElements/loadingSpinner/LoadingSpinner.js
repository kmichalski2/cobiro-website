import React from 'react'

import Classes from './LoadingSpinner.module.scss'

const LoadingSpinner = ({loading, large, children, relative, dark, center}) => {

    return (
        <>
        <span className={[large ? Classes.large : null, center ? Classes.center : null, loading ? Classes.loading : null, relative ? Classes.relative : null, dark ? Classes.dark : null].join(' ')}>
        <span>{children}</span>
        </span>
        
        </>
    )
}

export default LoadingSpinner