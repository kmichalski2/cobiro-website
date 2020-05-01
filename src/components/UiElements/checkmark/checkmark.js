import React from 'react'

import Classes from './checkmark.module.scss'

const Checkmark = ({classes}) => (
    <div className={[Classes.checkmark, classes].join(' ')}></div>
)

export default Checkmark