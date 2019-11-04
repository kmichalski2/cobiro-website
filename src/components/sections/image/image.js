import React from "react"
import Img from "gatsby-image"
import ImageStyles from "./image.module.scss"

const Image = ({ data }) => {
    return (
        <section className={ImageStyles.section}>
            <svg className={ImageStyles.topSway} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 61" preserveAspectRatio="xMidYMid slice" x="0" y="0" ><path d="M1920,28.54S1725,0,1387.75,0,816.35,61,456.07,61,0,48.16,0,48.16V0H1920Z" fill="#fff"/></svg>
            {data.image.fluid ?
                <Img className="img-full-width"
                fluid={data.image.fluid}
                alt={data.image.alt ? data.image.alt : data.title}
                />
                :
                <img className="img-full-width"
                src={data.image.url}
                alt={data.image.alt ? data.image.alt : data.title}
                />
            }
            <svg className={ImageStyles.bottomSway} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 61" preserveAspectRatio="xMidYMid slice" x="0" y="0" ><path d="M0,33.35S195,61,532.25,61,1103.65,0,1463.93,0,1920,13.72,1920,13.72V61H0Z" fill="#fff"/></svg>
        </section>
    )
}

export default Image
