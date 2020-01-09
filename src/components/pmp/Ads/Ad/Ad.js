import React from 'react'

import AdStyles from './Ad.module.scss'

import actionsImg from './actions.png'
import bookmarkImg from './bookmark.png'

const Ad = ({url, ads, type, first}) => {

    return (
        <div className={["card card-visible text-left", AdStyles.card].join(' ')}>
            <div className="flex start-xs middle-xs space-xs-up">
                <div>
                    <img src="" style={{width: '3rem', height: '3rem', margin: 0}}/>
                </div>
                <div style={{marginLeft: '1rem'}}>
                    <p className="text-bold text-black no-mb">{url}</p>
                    <p className={["no-mb", AdStyles.small].join(' ')}>sponsored</p>
                </div>
            </div>
            
            {type === 'facebook' ? <p className={AdStyles.small}>{ads ? ads.description : null}</p> : null }
            <img className={AdStyles.image} src=""/>

            { type === 'facebook' ?
            <>
            <div className={AdStyles.fbCta}>
                <div>
                    <p className={["no-mb uppercase", AdStyles.small].join(' ')}>WWW.{url}</p>
                    <p className={["no-mb text-black text-bold", AdStyles.small].join(' ')}>{url}</p>
                    <p className={["no-mb", AdStyles.small].join(' ')}>{ads ? ads.headline_2 : null}</p>
                </div>
                <div>
                    <a href={`https://${url}`} className={[AdStyles.fbLink, AdStyles.small].join(' ')} target="_blank">SEE MORE</a>
                </div>
            </div>
            <hr className={AdStyles.hr}/>
            <div className="flex between-xs">
                <p className={["text-black text-bold no-mb", AdStyles.small].join(' ')}>Like</p>
                <p className={["text-black text-bold no-mb", AdStyles.small].join(' ')}>Comment</p>
                <p className={["text-black text-bold no-mb", AdStyles.small].join(' ')}>Share</p>
            </div>
            </>
            : null }

            { type === 'instagram' ?
            <>
            <a href={`https://${url}`} className={AdStyles.instaCta} target="_blank">
                Visit website
            </a>
            <div className={["flex between-xs", AdStyles.instaActions, first ? AdStyles.first : AdStyles.second].join(' ')} >
                <img src={actionsImg} />
                <img src={bookmarkImg} />
            </div>
            <p className={AdStyles.small}><span className="text-bold">{url}</span> {ads ? ads.description : null}</p>
            </>
            : null }
        </div>
    )
}

export default Ad