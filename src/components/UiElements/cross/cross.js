import React from 'react'

import Classes from './cross.module.scss'

const Cross = ({classes, white}) => (
    <div className={[Classes.cross, white && Classes.white, classes].join(' ')}></div>
)

export default Cross