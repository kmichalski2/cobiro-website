import React from 'react'

import VoucherForm from '../voucher/voucherForm/voucherForm'
import SwayTop from '../../UiElements/SwayTop/SwayTop'
import voucherHeaderStyles from './voucherHeader.module.scss'
import GiftCard from '../../UiElements/GiftCard/GiftCard'

const VoucherHeader = (props) => {
    const topColor = props.data.topGradiantColor
    const bottomColor = props.data.bottomGradiantColor
    const text = props.data.text
    const link = props.data.linkUrl
    const linkTitle = props.data.linkTitle
    const rightSide = props.data.signUpOrVoucher
    const env = props.data.environment
    const footnote = props.data.footnote

    return (
        <SwayTop topColor={topColor} bottomColor={bottomColor} >
            <div className={["container", rightSide === 'voucher' ? voucherHeaderStyles.header : null].join(' ')}>
                <div className="row flex middle-xs">
                    <div className={["col col-xs-12 text-white", rightSide === 'signup' ? "col-lg-5" : "col-lg-6"].join(' ')}>
                        <div className={["space-xs space-sm space-md", voucherHeaderStyles.textWrap].join(' ')}>
                            <h1>{props.data.title}</h1>
                            <div className={voucherHeaderStyles.text} dangerouslySetInnerHTML={{__html: text}}></div>
                            {link && linkTitle ?
                            <a className="btn btn-white btn-large" href={link}>{linkTitle}</a>
                            : null }
                        </div>
                    </div>
                    <div className={["col col-xs-12 text-white", , rightSide === 'signup' ? "col-lg-7" : "col-lg-6 first-xs last-lg space-xs space-sm space-md"].join(' ')} style={{marginBottom: rightSide === 'signup' ? '-3rem' : null}}>
                        { rightSide === 'signup' ?
                        <VoucherForm env={env} footnote={footnote}/>
                        : rightSide === 'voucher' ?
                        <GiftCard />
                        : null }
                        
                    </div>
                </div>
            </div>
        </SwayTop>
    )
}

export default VoucherHeader