import React from 'react'
import { Link } from 'gatsby'

import * as Classes from './categoryLabel.module.scss'
import AnyLink from '../AnyLink/AnyLink'

const CategoryLabel = ({ category, link, large, background, classes }) => {

    return (
        <>
            {large ?
                <AnyLink link={link} classes={[Classes.categoryCard, background ? Classes.background : null].join(' ')} title={category} internal={true} noArrow/>
                :
                <p className={[Classes.category, classes].join(' ')}>{category}</p> 
            }
        </>
    )

}

export default CategoryLabel