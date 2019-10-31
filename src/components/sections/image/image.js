import React from "react"
import Img from "gatsby-image"
import ImageStyles from "./image.module.scss"

const Image = ({ data }) => {
    return (
        <section className={ImageStyles.section}>
            <svg className={ImageStyles.topSway} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 61.88"><g id="Lag_2" data-name="Lag 2"><g id="Lag_1-2" data-name="Lag 1"><path id="Path_5024" data-name="Path 5024" d="M1920,28.54S1725,0,1387.75,0,816.35,61.88,456.07,61.88,0,48.16,0,48.16V0H1920Z" fill="#fff"/></g></g></svg>
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
            <svg className={ImageStyles.bottomSway} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 61.88"><g id="Lag_2" data-name="Lag 2"><g id="Lag_1-2" data-name="Lag 1"><path id="Path_5024" data-name="Path 5024" d="M0,33.35S195,61.88,532.25,61.88,1103.65,0,1463.93,0,1920,13.72,1920,13.72V61.88H0Z" fill="#fff"/></g></g></svg>
        </section>
    )
}

export default Image
