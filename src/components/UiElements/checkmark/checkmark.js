import React from 'react'

import Classes from './checkmark.module.scss'

const Checkmark = ({classes, white}) => (
    <div className={[Classes.checkmark, white ? Classes.white : null, classes].join(' ')}></div>
)

export default Checkmark