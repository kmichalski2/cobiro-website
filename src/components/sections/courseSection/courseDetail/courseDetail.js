import React, { useEffect, useState } from 'react'
import AnyLink from '../../../UiElements/AnyLink/AnyLink'
import HtmlText from '../../../UiElements/HtmlText/HtmlText'
import VideoEmbed from '../../../UiElements/videoEmbed/videoEmbed'
import MetaElements from '../metaElements/metaElements'

import Classes from './courseDetail.module.scss'

const CourseDetail = ({ lightText, course, category, level, lessonsNamePlural}) => {
    // let activeVidMap
    
    // course.videoes && course.videoes.map((v, i) => {
    //     if(!activeVideo && v.youtubeEmbedLink) {
    //         activeVidMap = i
    //         console.log('course.videoes[i]', course.videoes[i])
    //     }
    // })
    const [activeVideo, setActiveVideo] = useState(course.videoes && course.videoes.findIndex(v => v.youtubeEmbedLink))
    
    console.log('course.videoes && course.videoes.findIndex(v => v.youtubeEmbedLink)', course.videoes && course.videoes.findIndex(v => v.youtubeEmbedLink))
    // useEffect(() => {
    //     course.videoes && course.videoes.map((v, i) => {
    //         if(!activeVideo && v.youtubeEmbedLink) {
    //             setActiveVideo(i)
    //             console.log('course.videoes[i]', course.videoes[i])
    //         }
    //     })
    // }, [])

    useEffect(() => {
        console.log('activeVideo', activeVideo)
        console.log('course.videoes', course.videoes)
        console.log('course.videoes[activeVideo]', course.videoes[activeVideo])

    }, [])

    useEffect(() => {
        console.log('course.videoes[activeVideo].youtubeEmbedLink', course.videoes[activeVideo] && course.videoes[activeVideo].youtubeEmbedLink)
    })
    

    return (
        <div className="row">
            <div className="col col-xs-12 col-md-6 text-left">
                <h2 className={lightText ? "text-white" : null}>{course.title}</h2>   
                <MetaElements 
                        course={course} 
                        light={lightText}
                        category={category} 
                        level={level}
                        lessonsNamePlural={lessonsNamePlural}
                            />
                <HtmlText RawHtml={course.text} classes={["text-left space-big-xs-up", lightText ? "text-white" : null].join(' ')} /> 
                <AnyLink external={course.externalLink} secondary link={course.externalLink} title={course.linkText} button light={lightText} classes="space-big-xs-up"/>
            </div>
            <div className="col col-xs-12 col-md-6 text-left">
                {course.videoes[activeVideo] && course.videoes[activeVideo].youtubeEmbedLink ? <VideoEmbed embedCode={course.videoes[activeVideo].youtubeEmbedLink} classes="space-xs-up"/> : null }
                {course.videoes && course.videoes.map((v, i) => {

                    const classes = ["flex top-xs between-xs", Classes.video, v.youtubeEmbedLink ? Classes.videoPlay : null, lightText ? Classes.light : null, activeVideo === i ? Classes.active : null].join(' ')

                    const content = (<>
                        <p>{i + 1}. {v.title}</p>
                        <p>{v.duration}</p>
                    </>)

                    return (
                        v.youtubeEmbedLink ?
                        <button key={i} onClick={() => setActiveVideo(i)} className={classes}>
                            {content}
                        </button>
                        : 
                        <div key={i} className={classes}>
                            {content}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CourseDetail