import React, { useState } from 'react'

import SearchMarketingStyles from './SearchMarketing.module.scss'
import Score from '../../UiElements/Score/Score'

import moneyImg from '../../../images/moneydollar.svg'
import reachImg from '../../../images/reach.svg'
import star from '../../../images/star.svg'

const SearchMarketing = ({ keywords, totalKeywords, groupedKeywords }) => {

    const [toolTipVisible, setToolTipVisible] = useState(false)
    const [expandedAccordion, setExpandedAccordion] = useState(null)
    const [accElAmount, setAccElAmount] = useState(6)

    const whiteSpaceWidth = 0.25
    const highVolume = groupedKeywords.keyword_percentage.high - whiteSpaceWidth
    const mediumVolume = groupedKeywords.keyword_percentage.medium - whiteSpaceWidth
    const lowVolume = groupedKeywords.keyword_percentage.low - whiteSpaceWidth

    const labelPosCheck = (val, offset) => {

        const centerPos = (val / 2) + offset

        const a = (centerPos * 3.6  - 90) * (Math.PI / 180);
        const r = 15.91549430918954
        const cx = 19.41549430918954 - 1.5
        const cy = 19.41549430918954 - 1.5

        const multiplier = 100 / 38.8309886184
        const x = (cx + r * Math.cos(a)) * multiplier
        const y = (cy + r * Math.sin(a)) * multiplier
        const pos = {y,x}
        return pos
    }

    const highVolumeLabelPos = labelPosCheck(highVolume, 0)
    const mediumVolumeLabelPos = labelPosCheck(mediumVolume, highVolume)
    const lowVolumeLabelPos = labelPosCheck(lowVolume, highVolume + mediumVolume)

    const keywordsReducer = (accumulator, item) => {
        return accumulator + item.keywords.length;
      };

    const keywordsCount = keywords ? keywords.reduce(keywordsReducer, 0) : 0

    const onChartElMouseEnter = (i) => {
        setToolTipVisible(i)
    }

    const onChartElMouseLeave = () => {
        setToolTipVisible(false)
    }

    const accordionClickHandler = (i, e) => {
        if(expandedAccordion === null || expandedAccordion !== i) {
            setExpandedAccordion(i)
        } else {
            setExpandedAccordion(null)
        }
    }

    return (
        <section className="section">
            <div className="container">
                <div className={["row middle-xs", SearchMarketingStyles.header].join(' ')}>
                    <div className="col col-xs-12 col-md-6 space-xs space-sm">
                        <h2>Google Search Marketing</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem</p>
                        <ul className="list-inline">
                            <li className={SearchMarketingStyles.legendGreen}>High Volume</li>
                            <li className={SearchMarketingStyles.legendYellow}>Medium Volume</li>
                            <li className={SearchMarketingStyles.legendBlue}>Low Volume</li>
                        </ul>
                    </div>
                    <div className="col col-xs-12 col-md-6 text-center flex center-xs end-md">
                        <div className={[SearchMarketingStyles.circle].join(' ')}>
                            <svg className={SearchMarketingStyles.circleChart} width="100%" height="100%" viewBox="0 0 38.8309886184 38.8309886184" xmlns="http://www.w3.org/2000/svg">
                                <linearGradient id="gradient1">
                                    <stop id="stop1" offset="0%" stopColor="#92E2A1" />
                                    <stop id="stop2" offset="100%" stopColor="#00AF21"/>
                                </linearGradient>
                                <linearGradient id="gradient2">
                                    <stop id="stop1" offset="0%" stopColor="#FFD00D" />
                                    <stop id="stop2" offset="100%" stopColor="#FF9517"/>
                                </linearGradient>
                                <linearGradient id="gradient3">
                                    <stop id="stop1" offset="0%" stopColor="#72A3FF" />
                                    <stop id="stop2" offset="100%" stopColor="#2F76FC"/>
                                </linearGradient>
                                <circle className={SearchMarketingStyles.circleHigh} cx="19.41549430918954" cy="19.41549430918954" r="15.91549430918954" fill="none" strokeDasharray={`${highVolume} ${100 - highVolume}`}  strokeDashoffset={25 - whiteSpaceWidth}  strokeWidth="6" stroke="url(#gradient1)" style={{filter:'url(#glow)'}} onMouseOver={() => onChartElMouseEnter(0)} onMouseLeave={() => onChartElMouseLeave()}></circle>
                                <circle className={SearchMarketingStyles.circleMedium} cx="19.41549430918954" cy="19.41549430918954" r="15.91549430918954" fill="none" strokeDasharray={`${mediumVolume} ${100 - mediumVolume}`} strokeDashoffset={25 + (100 - highVolume - (whiteSpaceWidth * 2)) } strokeWidth="6" stroke="url(#gradient2)" onMouseOver={() => onChartElMouseEnter(1)} onMouseLeave={() => onChartElMouseLeave()}></circle>
                                <circle className={SearchMarketingStyles.circleLow} cx="19.41549430918954" cy="19.41549430918954" r="15.91549430918954" fill="none" strokeDasharray={`${lowVolume} ${100 - lowVolume}`} strokeDashoffset={25 + (100 - highVolume - mediumVolume - (whiteSpaceWidth * 3))}  strokeWidth="6" stroke="url(#gradient3)" onMouseOver={() => onChartElMouseEnter(2)} onMouseLeave={() => onChartElMouseLeave()}></circle>

                            </svg>
                            <p className={["small text-white", SearchMarketingStyles.chartText].join(' ')} style={{top: `${highVolumeLabelPos.y}%`, left: `${highVolumeLabelPos.x}%`}}>{Math.round(highVolume + whiteSpaceWidth)}%</p>
                            <p className={["small text-white", SearchMarketingStyles.chartText].join(' ')} style={{top: `${mediumVolumeLabelPos.y}%`, left: `${mediumVolumeLabelPos.x}%`}}>{Math.round(mediumVolume + whiteSpaceWidth)}%</p>
                            <p className={["small text-white", SearchMarketingStyles.chartText].join(' ')} style={{top: `${lowVolumeLabelPos.y}%`, left: `${lowVolumeLabelPos.x}%`}}>{Math.round(lowVolume +  whiteSpaceWidth)}%</p>
                            <div className={SearchMarketingStyles.circleText}>
                                <h2>{totalKeywords}</h2>
                                <p>Relevant keywords</p>
                            </div>
                            { toolTipVisible === 2 ?
                            <p className={['small', SearchMarketingStyles.toolTip].join(' ')} style={{top: `${lowVolumeLabelPos.y}%`, left: `${lowVolumeLabelPos.x}%`}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                            : null }
                            { toolTipVisible === 1 ?
                            <p className={['small', SearchMarketingStyles.toolTip].join(' ')} style={{top: `${mediumVolumeLabelPos.y}%`, left: `${mediumVolumeLabelPos.x}%`}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                            : null }
                            { toolTipVisible === 0 ?
                            <p className={['small', SearchMarketingStyles.toolTip].join(' ')} style={{top: `${highVolumeLabelPos.y}%`, left: `${highVolumeLabelPos.x}%`}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                            : null }
                            
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    {keywords && keywords.map((k, i) =>
                    i <= accElAmount - 1 ?
                    
                        <div key={i} className="col col-xs-12">
                            <div className={["card card-visible text-left", SearchMarketingStyles.card, expandedAccordion === i ? SearchMarketingStyles.expanded : null].join(' ')}>
                                <button className={SearchMarketingStyles.accBtn} onClick={(event) => accordionClickHandler(i, event)}>
                                    <span className="h4">{k.adgroup.split(' - ')[0]}</span>
                                    <span className={SearchMarketingStyles.btnRight}>
                                        <span className={SearchMarketingStyles.btnCount}>{k.keywords.length}</span>
                                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48.875' height='26.766' viewBox='0 0 48.875 26.766'%3E%3Cpath d='M227.819,107.371l20.9,20.73,20.9-20.73' transform='translate(-224.284 -103.836)' fill='none' stroke='%230087ef' stroke-linecap='round' stroke-linejoin='round' stroke-width='5'/%3E%3C/svg%3E" />
                                    </span>
                                </button>

                                <div className={["table-responsive", SearchMarketingStyles.tableWrap].join(' ')} style={{maxHeight: expandedAccordion === i ? '550px' : 0}}>
                                    <table className={["table", SearchMarketingStyles.table].join(' ')}>
                                        <thead>
                                        <tr>
                                            <th scope="col" className="">Keyword</th>
                                            <th scope="col" className="text-center">Price</th>
                                            <th scope="col" className="text-center">Potential reach</th>
                                            <th scope="col" className="text-center">Rating</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {k.keywords.sort((a,b) => b.rating - a.rating).map((k, i) =>
                                            <tr key={i}>
                                                <td scope="row">{k.keyword}</td>
                                                <td><Score imgSrc={moneyImg} imgHalfSrc={moneyImg} score={k.price} total={5}/></td>
                                                <td><Score imgSrc={reachImg} imgHalfSrc={reachImg} score={k.potential_reach} total={5}/></td>
                                                <td><Score imgSrc={star} imgHalfSrc={star} score={k.rating} total={5}/></td>
                                            </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    </div>
                            </div>
                        </div>
                    : null
                    )}
                    {keywords && keywords.length > accElAmount ?
                    <div className="col col-xs-12">
                        <button className="btn block-center" onClick={() => setAccElAmount(accElAmount + 6)}>
                            Show more
                        </button>
                    </div>
                    : null }
                </div>
            </div>
        </section>
    )
}

export default SearchMarketing