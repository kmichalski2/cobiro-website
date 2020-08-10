import React from 'react'
import { Link } from 'gatsby'

import Classes from './categoryLabel.module.scss'
import AnyLink from '../AnyLink/AnyLink'

const CategoryLabel = ({ category, link, large, background }) => {

    return (
        // <Link to={link} className={[Classes.categoryCard, large ? Classes.large : null, background ? Classes.background : null].join(' ')}>{category}</Link>
        <AnyLink link={link} classes={[Classes.categoryCard, large ? Classes.large : null, background ? Classes.background : null].join(' ')} title={category} internal={true} noArrow noPadding/>
    )

}

export default CategoryLabel