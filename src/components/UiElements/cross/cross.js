import React from 'react'

import Classes from './cross.module.scss'

const Cross = ({classes}) => (
    <div className={[Classes.cross, classes].join(' ')}></div>
)

export default Cross