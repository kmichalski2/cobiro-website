import React from 'react'

import * as Classes from './cross.module.scss'

const Cross = ({classes, white}) => (
    <div className={[Classes.cross, white && Classes.white, classes].join(' ')}></div>
)

export default Cross