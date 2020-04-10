import React from 'react'
import Layout from '../../components/layout/layout'
import SwayTop from '../../components/UiElements/SwayTop/SwayTop'
import Classes from './blogCategory.module.scss'
import BlogPosts from '../../components/UiElements/blogPosts/blogPosts'


const BlogCagegory = ({ pageContext }) => {

    const {title, posts, topGradiantColor, bottomGradiantColor, footerCtaTitle, footerCtaText, ctaLinks} = pageContext

    console.log(pageContext)
    return (
        <Layout>
            <SwayTop topColor={{hex: topGradiantColor}} bottomColor={{hex: bottomGradiantColor}} >
              <div className={["container", Classes.header].join(' ')}>
                  <div className="row middle-xs center-xs">
                      <div className="col col-xs-12 col-lg-8 text-center">
                          <h1 className="text-white">{ title }</h1>
                      </div>
                  </div>
              </div>
          </SwayTop>
          <section className="section">
            <div className="container">
                <div className="row center-xs">
                    <BlogPosts blogPosts={posts} addedAmount={3} />
                </div>
            </div>
          </section>
        </Layout>
    )
}

export default BlogCagegory