import React from 'react'

import * as Classes from './loader.module.scss'

const Loader = ({classes}) => (
    <div className={[Classes.loader, classes].join(' ')}></div>
)

export default Loader