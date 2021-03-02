import React, { useState } from 'react'
import { useStaticQuery, graphql } from "gatsby"

import ButtonSwitch from '../../UiElements/buttonSwitch/buttonSwitch'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import Section from '../../UiElements/Section/Section'
import VideoEmbed from '../../UiElements/videoEmbed/videoEmbed'

import Classes from './courseSection.module.scss'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Label from '../../UiElements/label/label'
import Modal from '../../UiElements/modal/modal'

const CourseSection = ({ data }) => {

    const coursesData = useStaticQuery(graphql`
        query Courses {
            allDatoCmsCourse(filter: {title: {ne: null}}, sort: {fields: meta___publishedAt}) {
            nodes {
                title
                videoes {
                    title
                    youtubeEmbedLink
                    duration
                }
                text
                linkText
                level
                icon {
                url
                alt
                fixed(width: 45) {
                    aspectRatio
                    height
                    sizes
                    src
                    srcSet
                    width
                }
                }
                category
                externalLink
            }
            }
        }
    `)
    const courses = coursesData.allDatoCmsCourse.nodes
    const lightText = data.textColor === 'light'

    const ALL_COURSES = 'all'
    const BUILD = 'build'
    const GROW = 'grow'
    const PROMOTE = 'promote'

    const [activeCourses, setActiveCourses] = useState(ALL_COURSES)
    const [showCourse, setShowCourse] = useState(null)

    const hideCourseModal = () => {
        setShowCourse(null)
    }

    return (
        <Section bgColor={data.backgroundColor && data.backgroundColor.hex}>
            <Modal 
                showModal={showCourse !== null}
                setShowModal={hideCourseModal}
                dark={lightText}
                closeButton
                >
                    {showCourse !== null ?
                    <h2 className={lightText ? "text-white" : null}>{courses[showCourse].title}</h2>    
                    : null }
                
            </Modal>
            <div className="container">
                <div className="row middle-xs space-big-xs-up">
                    <div className="col col-xs-12 col-lg-6">
                        <VideoEmbed 
                            embedCode={data.youtubeEmbedLink}
                            />
                    </div>
                    <div className="col col-xs-12 col-lg-6">
                        <HeaderWText
                            h2
                            title={data.title}
                            text={data.text}
                            light={lightText}
                            links={[
                                {
                                    link: data.externalLinkButton ? data.externalLinkButton : null,
                                    internal: false,
                                    external: data.externalLinkButton,
                                    title: data.linkTitle,
                                    button: true,
                                    large: false
                                  }
                            ]}
                            />
                    </div>
                </div>
                <div className="row middle-xs">
                    <div className="col col-xs-12 col-lg-6">
                            <h3 className={lightText ? "text-white" : null}>{data.coursesTitle}</h3>
                    </div>
                    <div className="col col-xs-12 col-lg-6 end-lg flex-lg">
                        <div style={{display: 'inline-block'}}>
                            <ButtonSwitch buttons={[
                                {title: data.allName, active: activeCourses === ALL_COURSES, clickHandler: () => setActiveCourses(ALL_COURSES)},
                                {title: data.buildCategoryName,  active: activeCourses === BUILD, clickHandler: () => setActiveCourses(BUILD)},
                                {title: data.growCategoryName,  active: activeCourses === GROW, clickHandler: () => setActiveCourses(GROW)},
                                {title: data.promoteCategoryName,  active: activeCourses === PROMOTE, clickHandler: () => setActiveCourses(PROMOTE)},
                            ]} 
                            inverted={lightText}/>
                        </div>
                    </div>
                    <div className="col col-xs-12 space-xs-up">
                        <hr className={Classes.hr} />
                    </div>
                </div>
                <div className="row">
                    {courses && courses.map((c, i) => (
                        <div key={i} className="col col-xs-12 col-md-6 col-lg-4">
                            <button className={[Classes.card, lightText ? Classes.invertedCard : null].join(' ')} onClick={() => setShowCourse(i)}>
                                {c.icon ? <ImageAll image={c.icon} alt={c.icon.alt} /> : null }
                                <h4>{c.title}</h4>
                                <div className="flex">
                                    <p className={Classes.catLabel}>{c.category}</p>
                                    <div className={Classes.level}>{c.level}</div>
                                    <p>{c.videoes.length} {data.lessonsNamePlural}</p>
                                </div>
                                {c.videoes && c.videoes.map((v, i) => {
                                    if(i < 3) {
                                        return (
                                            <p key={i}>{v.title}</p>
                                        )
                                    }
                                })}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default CourseSection