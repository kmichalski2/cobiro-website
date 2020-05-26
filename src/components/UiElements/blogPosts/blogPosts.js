import React, { useEffect } from 'react'
import { useState } from 'react'

import BlogCard from '../blogCard/blogCard'

import Classes from './blogPosts.module.scss'
import BlogPostsHeader from '../blogPostsHeader/blogPostsHeader'


const BlogPosts = ({ blogPosts, offset, fixedMax, addedAmount, firstLarge, animate, shadow, horizontal, searchTitle, notificationPadding }) => {
    
    const initialAMount = fixedMax || (0 + (addedAmount || 3)) 

    const [numberOfPosts, setNumberOfPosts] = useState(blogPosts.length < initialAMount ? blogPosts.length : initialAMount)

    useEffect(() => {
        setNumberOfPosts(blogPosts.length < initialAMount ? blogPosts.length : initialAMount)
    }, [blogPosts])

    const posts = []
    const morePostsHandler = () => {
        if(blogPosts.length < (numberOfPosts + (addedAmount || 3))) {
          setNumberOfPosts(blogPosts.length)
        } else {
          setNumberOfPosts(numberOfPosts + (addedAmount || 3))
        }
    }

    for (let i = offset || 0; i < (fixedMax || (offset ? numberOfPosts + offset : numberOfPosts)) && i < blogPosts.length; i++) {
        posts.push(
            firstLarge && i === 0 ?
            <BlogPostsHeader key={i} post={blogPosts[i]} searchTitle={searchTitle} search notificationPadding={notificationPadding}/>
            :
            <BlogCard key={i} post={blogPosts[i]} large={firstLarge && i === 0 ? true : false} animate={animate} shadow={shadow} horizontal={horizontal}/>
        )
      }

    return (
        <>
            {posts}
            {
                !fixedMax && (offset ? numberOfPosts + offset : numberOfPosts) < blogPosts.length ?
                <div className={["col-xs-12", Classes.btnWrapper].join(' ')}>
                    <button className="btn" onClick={morePostsHandler}>Load more</button>
                </div>
                : null
            }
        </>
    )
}

export default BlogPosts