import React, {useState, Suspense, useEffect} from 'react'

import TableRow from '../tableRow/tableRow'
import ImageAll from '../../ImageAll/ImageAll'

import Classes from './baseTable.module.scss'
import Fade from '../../../hoc/fade/fade'


// import PaymentModal from '../../paymentModal/paymentModal'
// let PaymentModal = null

// if(typeof window !== 'undefined' && typeof window.location !== 'undefined') {
//     PaymentModal = React.lazy(() => import('../../paymentModal/paymentModal'))
// }

const PaymentModal = React.lazy(() => import('../../paymentModal/paymentModal'))

const BaseTable = ({name, headers, activeCol, rows, icon, bgColors, pricing, rowExpandHandler, headerFixed, navbarHeight, scrollPos, monthlyPriceBillingRate, yearlyPriceBillingRate, yearlyPriceName, paymentModalRightColTitle, monthlyPriceName, returnedModalOpen}) => {

    const RETURNING = 'returning'
    const [expandedRow, setExpandedRow] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [rawPriceIncVat, setRawPriceIncVat] = useState(false)
    const [rawPriceExVat, setRawPriceExVat] = useState(false)
    const [planId, setPlanId] = useState(false)
    const [returningData, setReturningData] = useState()
    
    useEffect(() => {
        console.log('returnedModalOpen', returnedModalOpen)
        if(returnedModalOpen) {
            handleShowModal(0, 0, RETURNING, null, returnedModalOpen)
        }
    }, [returnedModalOpen])

    const handleShowModal = (rawPriceIncVat, rawPriceExVat, title, id, data) => {
        
        setPlanId(id)
        setShowModal(title)
        setRawPriceIncVat(rawPriceIncVat)
        setRawPriceExVat(rawPriceExVat)
        setReturningData(data)
    }

    // const rowExpanderCheck = (i) => {
        
    //     for(i; i > -1; i--) {
    //         if (!rows[i].nested) {
    //             return i
    //         }
    //     }
    //     return null
    // }    

    const hasNumber = (myString) => {
        return /\d/.test(myString);
      }
    

    return (
        <>
        {typeof window !== 'undefined' && headers ?
        <Suspense fallback={<></>}>
            <PaymentModal showModal={showModal} rawPriceIncVat={rawPriceIncVat} rawPriceExVat={rawPriceExVat} setShowModal={setShowModal} monthlyPricing={pricing === monthlyPriceName} planId={planId} pricing={pricing} RETURNING={RETURNING} returningData={returningData} rightColTitle={paymentModalRightColTitle}/>
        </Suspense>
        : null }

        {headers ?
            <div className={Classes.headerWrapper}>

                { headers ? headers.map((h, i) => 
                    h.title ?
                    <div key={i} className={[Classes.tableHeader, activeCol !== i ? Classes.hiddenMobile : Classes.activeColMobile, h.label ? Classes.highlightedHeader : '', "card card-visible"].join(' ')} style={bgColors[i] ? {backgroundColor: bgColors[i]} : null}>
                        {h.label ? 
                            <span className={Classes.label}>
                                {h.label}
                            </span> 
                        : null}
                        <span className="h4">{ h.title }</span>
                        <span className="small text-normal block-xs space-xs-up">{h.subtitle}</span>
                        <span className="h2 block-xs no-mt no-mb">{h[pricing]}</span>
                        <span className="text-normal small">{pricing === yearlyPriceName ? yearlyPriceBillingRate : monthlyPriceBillingRate}</span>
                        {pricing === yearlyPriceName && hasNumber(h[monthlyPriceName]) ? <span className={["block-xs no-mb space-xs-up text-normal text-overlined space-xs-up", Classes.overlinedText].join(' ')}>{h[monthlyPriceName]}</span> : pricing === yearlyPriceName ? <span className={["block-xs no-mt space-xs-up text-normal space-xs-up", Classes.hiddenText].join(' ')}>{h[monthlyPriceName]}</span> : null }
                        {/* h.link && h.linkTitle && <AnyLink external link={h.link} title={h.linkTitle} button classes="space-small-xs-up"/>*/}
                        {/* <span className="text-xs-small text-normal space-xs-up block-xs">(excl. VAT)</span> */}
                        { h.linkTitle && h.buttonEmailLink ?
                            <a className="btn space-xs-up mt space-top-xs-up" href={h.buttonEmailLink} rel="noopener noreferrer">{h.linkTitle}</a>
                        : h.linkTitle && 
                            <button 
                                className={["btn space-xs-up mt space-top-xs-up", h.label ? "" : "btn-secondary" ].join(' ')}
                                onClick={
                                    () => handleShowModal(h[`${pricing}Raw`], h[`${pricing}RawExVat`], h.title, h[`${pricing}PlanId`])}
                                >
                                    {h.linkTitle}
                            </button> 
                            }
                            {h.featureList ?
                            <>
                            <p className="space-small-xs-up small text-bold">{h.featureListTitle}</p>
                            <ul className=" text-left price-list list-unstyled small">
                                {h.featureList.map((l, i) => 
                                    <li key={i}>{l}</li>
                                )}
                            </ul>
                            </>
                            : null}
                    </div>
                    : null
                ) : null }
                
            </div>
            : null}

        <table className={["table space-xs-up", Classes.table, !headers ? Classes.noHeaders : null].join(' ')}>
            
            
            <tbody>
                { rows ? rows.map((r, i) =>  { 

                    const subRows = rows[i + 1] && rows[i + 1].nested

                    return (
                        <TableRow 
                            // expanded={(r.nested ? rowExpanderCheck(i) === expandedRow : false) || expandedRow === i} 
                            // expandHandler={subRows && !r.nested ? () => setExpandedRow(expandedRow !== i ? i : null) : null} 
                            i={i}
                            key={i} 
                            rowHeader={r.rowName} 
                            label={r.label} 
                            cols={r.cols} 
                            nested={r.nested} 
                            activeCol={activeCol} 
                            toolTip={r.toolTip} 
                            bgColors={bgColors}
                            // rowExpandHandler={rowExpandHandler}
                            topRow={!headers && i === 0}
                        />
                    )
                })
             : null}
            </tbody>
            </table>
            <Fade show={headers && headerFixed}>
                <div className={[Classes.fixedHeader, "container"].join(' ')} style={navbarHeight ? {top: navbarHeight + 32 + 'px'} : null}>
                    <table className={["table space-xs-up", Classes.table].join(' ')}>
                        <thead>
                            <tr >

                                { name ? <th className={[Classes.tableName, Classes.tableHeader].join(' ')}>{icon ? <ImageAll image={icon} alt={icon.alt || name} classes={Classes.icon} /> : null}{ name }</th> : null }

                                { headers ? headers.map((h, i) => 
                                    <th key={i} className={[Classes.tableHeader, activeCol !== i ? Classes.hiddenMobile : Classes.activeColMobile].join(' ')} style={bgColors[i] ? {backgroundColor: bgColors[i]} : null}>
                                        <span className="h5">{ h.title }</span>
                                        <span className="h3 block-xs no-mt">{h[pricing]}</span>
                                    </th>) 
                                : null }

                            </tr>
                        </thead>
                    </table>
                </div>
            </Fade>
             </>
    )
}

export default BaseTable