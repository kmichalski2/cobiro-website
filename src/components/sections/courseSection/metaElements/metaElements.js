import React from 'react'

import * as Classes from './metaElements.module.scss'

const MetaElements = ({ course, light, category, level, lessonsNamePlural }) => (
    <div className={["flex middle-xs", Classes.meta, light ? Classes.inverted : null].join(' ')}>
        <p className={[Classes.catLabel, Classes[course.category]].join(' ')}>{category}</p>
        <div className={[Classes.level, Classes[course.level]].join(' ')}>{level}</div>
        <p className={Classes.lessonsCount}>{course.videoes.length} {lessonsNamePlural}</p>
    </div>
)

export default MetaElements