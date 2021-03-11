import React, { useState } from 'react'
import { useStaticQuery, graphql } from "gatsby"

import ButtonSwitch from '../../UiElements/buttonSwitch/buttonSwitch'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import Section from '../../UiElements/Section/Section'
import VideoEmbed from '../../UiElements/videoEmbed/videoEmbed'

import * as Classes from './courseSection.module.scss'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Label from '../../UiElements/label/label'
import Modal from '../../UiElements/modal/modal'
import HtmlText from '../../UiElements/HtmlText/HtmlText'
import AnyLink from '../../UiElements/AnyLink/AnyLink'
import MetaElements from './metaElements/metaElements'
import CourseDetail from './courseDetail/courseDetail'

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

    const categoryNames = {
        build: data.buildCategoryName,
        grow: data.growCategoryName,
        promote: data.promoteCategoryName
    }

    const levelNames = {
        beginner: data.beginnerLevelName,
        intermediate: data.intermediateLevelName,
        advanced: data.advancedLevelName,
    }

    const [activeCourses, setActiveCourses] = useState(ALL_COURSES)
    const [showCourse, setShowCourse] = useState(null)

    const hideCourseModal = () => {
        setShowCourse(null)
    }

    console.log('courses', courses)
    return (
        <Section bgColor={data.backgroundColor && data.backgroundColor.hex}>
            <Modal 
                showModal={showCourse !== null}
                setShowModal={hideCourseModal}
                dark={lightText}
                closeButton
                >  
                {showCourse !== null ?
                <div className={Classes.modalWrapper}>
                    <CourseDetail
                        lightText={lightText}
                        course={courses[showCourse]}
                        category={categoryNames[courses[showCourse].category]}
                        level={levelNames[courses[showCourse].level]}
                        lessonsNamePlural={data.lessonsNamePlural}
                    />
                </div>
                : null }          
            </Modal>
            <div className="container">
                <div className="row middle-xs space-big-xs-up">
                    <div className="col col-xs-12 col-lg-6 space-xs space-sm space-md">
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
                            <h3 className={lightText ? "text-white space-xs-up" : null}>{data.coursesTitle}</h3>
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
                    {courses && courses.filter(c => activeCourses === ALL_COURSES ? true : c.category === activeCourses).map((c, i) => (
                        <div key={i} className="col col-xs-12 col-md-6 col-lg-4">
                            <button className={[Classes.card, lightText ? Classes.invertedCard : null].join(' ')} onClick={() => setShowCourse(i)}>
                                {c.icon ? <ImageAll image={c.icon} alt={c.icon.alt} /> : null }
                                <h4>{c.title}</h4>
                                <MetaElements 
                                    course={c} 
                                    light={lightText}
                                    category={categoryNames[c.category]} 
                                    level={levelNames[c.level]}
                                    lessonsNamePlural={data.lessonsNamePlural}
                                        />
                                <div className={Classes.videoesFade}>
                                {c.videoes && c.videoes.map((v, i) => {
                                    if(i < 3) {
                                        return (
                                            <div key={i} className="flex middle-xs between-xs">
                                                <p>{v.title}</p>
                                                <p>{v.duration}</p>
                                            </div>
                                        )
                                    }
                                })}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default CourseSection