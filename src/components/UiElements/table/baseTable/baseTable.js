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

const BaseTable = ({name, headers, activeCol, rows, icon, bgColors, pricing, rowExpandHandler, headerFixed, navbarHeight, scrollPos, monthlyPriceBillingRate, yearlyPriceBillingRate, yearlyPriceName, monthlyPriceName}) => {

    const [expandedRow, setExpandedRow] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [rawPrice, setRawPrice] = useState(false)

    const handleShowModal = (rawPrice, title) => {
        setShowModal(title)
        setRawPrice(rawPrice)
    }

    const rowExpanderCheck = (i) => {
        
        for(i; i > -1; i--) {
            if (!rows[i].nested) {
                return i
            }
        }
        return null
    }    

    const hasNumber = (myString) => {
        return /\d/.test(myString);
      }

    // let paymentModalConditional = null
    
    // useEffect(() => {
    //     if(typeof window !== 'undefined' && typeof window.location !== 'undefined') {
    //         console.log('WINDOW NOT UNDEFINED', window)
    //         paymentModalConditional = (<Suspense fallback={<></>}>
    //         <PaymentModal showModal={showModal} rawPrice={rawPrice} setShowModal={setShowModal} monthlyPricing={pricing === monthlyPriceName}/>
    //     </Suspense>)
    //     }
    // }, [])
    

    return (
        <>
        {/* {paymentModalConditional} */}
        {typeof window !== 'undefined' ?
        <Suspense fallback={<></>}>
            <PaymentModal showModal={showModal} rawPrice={rawPrice} setShowModal={setShowModal} monthlyPricing={pricing === monthlyPriceName}/>
        </Suspense>
        : null }
        <table className={["table space-xs-up", Classes.table, !headers ? Classes.noHeaders : null].join(' ')}>
            {headers ?
            <thead>
                <tr>
                { name ? <th className={[Classes.tableName, Classes.tableHeader].join(' ')}>{icon ? <ImageAll image={icon} alt={icon.alt || name} classes={Classes.icon} /> : null}{ name }</th> : null }
                { headers ? headers.map((h, i) => 
                    <th key={i} className={[Classes.tableHeader, activeCol !== i ? Classes.hiddenMobile : Classes.activeColMobile].join(' ')} style={bgColors[i] ? {backgroundColor: bgColors[i]} : null}>
                        {h.label ? 
                            <span className={Classes.label}>
                                {h.label}
                            </span> 
                        : null}
                        <span className="h4">{ h.title }</span>
                        <span className="small text-normal block-xs space-small-xs-up">{h.subtitle}</span>
                        <span className="h2 block-xs no-mt">{h[pricing]} <span className="text-normal small">{pricing === yearlyPriceName ? yearlyPriceBillingRate : monthlyPriceBillingRate}</span></span>
                        {pricing === yearlyPriceName && hasNumber(h[monthlyPriceName]) ? <span className={["block-xs no-mt space-xs-up text-normal text-overlined", Classes.overlinedText].join(' ')}>{h[monthlyPriceName]}</span> : pricing === yearlyPriceName ? <span className={["block-xs no-mt space-xs-up text-normal", Classes.hiddenText].join(' ')}>{h[monthlyPriceName]}</span> : null }
                        {/* h.link && h.linkTitle && <AnyLink external link={h.link} title={h.linkTitle} button classes="space-small-xs-up"/>*/}
                        { h.linkTitle && <button className="btn space-small-xs-up" onClick={() => handleShowModal(h[`${pricing}Raw`], h.title)}>{h.linkTitle}</button> }
                    </th>) : null }
                </tr>
                
            </thead>
            : null}
            
            <tbody>
                { rows ? rows.map((r, i) =>  { 

                    const subRows = rows[i + 1] && rows[i + 1].nested

                    return (
                        <TableRow 
                            expanded={(r.nested ? rowExpanderCheck(i) === expandedRow : false) || expandedRow === i} 
                            expandHandler={subRows && !r.nested ? () => setExpandedRow(expandedRow !== i ? i : null) : null} 
                            i={i}
                            key={i} 
                            rowHeader={r.rowName} 
                            label={r.label} 
                            cols={r.cols} 
                            nested={r.nested} 
                            activeCol={activeCol} 
                            toolTip={r.toolTip} 
                            bgColors={bgColors}
                            rowExpandHandler={rowExpandHandler}
                            topRow={!headers && i === 0}
                        />
                    )
                })
             : null}
            </tbody>
            </table>
            <Fade show={headers && headerFixed}>
                <div className={[Classes.fixedHeader, "container"].join(' ')} style={navbarHeight ? {top: scrollPos + 'px'} : null}>
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