import React from 'react'

import * as Classes from './gradiantBar.module.scss'

const GradiantBar = ({ wide}) => (
    <div className={[Classes.gradiantBar, wide ? Classes.wide : null].join(' ')}></div>
)

export default GradiantBar