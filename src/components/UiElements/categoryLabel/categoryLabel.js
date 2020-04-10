import React from 'react'
import { Link } from 'gatsby'

import Classes from './categoryLabel.module.scss'

const CategoryLabel = ({ category, link, large }) => {

    return (
        <Link to={link} className={[Classes.categoryCard, large ? Classes.large : null].join(' ')}>{category}</Link>
    )

}

export default CategoryLabel