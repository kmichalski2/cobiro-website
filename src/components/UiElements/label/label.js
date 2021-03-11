import React from 'react'

import * as Classes from './label.module.scss'

const Label = ({color, label, classes}) => (
<div className={[classes, Classes.label, color === 'blue' ? Classes.blue : color === 'green' ? Classes.green : null].join(' ')}>{label}</div>
)

export default Label