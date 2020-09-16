import React from 'react'
import { Link } from 'gatsby'

import Classes from './categoryLabel.module.scss'
import AnyLink from '../AnyLink/AnyLink'

const CategoryLabel = ({ category, link, large, background }) => {

    return (
        <AnyLink link={link} classes={[Classes.categoryCard, large ? Classes.large : null, background ? Classes.background : null].join(' ')} title={category} internal={true} noArrow/>
    )

}

export default CategoryLabel