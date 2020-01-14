import React from 'react'

import VoucherForm from '../voucher/voucherForm/voucherForm'
import SwayTop from '../../UiElements/SwayTop/SwayTop'
import voucherHeaderStyles from './VoucherHeader.module.scss'

const VoucherHeader = (props) => {
    const topColor = props.data.topGradiantColor
    const bottomColor = props.data.bottomGradiantColor
    const text = props.data.text
    const link = props.data.linkUrl
    const linkTitle = props.data.linkTitle
    const rightSide = props.data.signUpOrVoucher

    return (
        <SwayTop topColor={topColor} bottomColor={bottomColor} >
            <div className="container">
                <div className="row flex middle-xs">
                    <div className="col col-xs-12 col-lg-5 text-white">
                        <div className={["space-xs space-sm space-md", voucherHeaderStyles.textWrap].join(' ')}>
                            <h1>{props.data.title}</h1>
                            <div className={voucherHeaderStyles.text} dangerouslySetInnerHTML={{__html: text}}></div>
                            {link && linkTitle ?
                            <a className="btn btn-white btn-large" href={link} target="_blank">{linkTitle}</a>
                            : null }
                        </div>
                    </div>
                    <div className="col col-xs-12 col-lg-7 text-white" style={{marginBottom: rightSide === 'voucher' ? '-3rem' : null}}>
                        { rightSide === 'voucher' ?
                        <VoucherForm env="development" footnote="* A Cobiro account is free. The amount of $25 deposit will only be used for your Google Ads budget to gain the $75 free voucher."/>
                        : null }
                        
                    </div>
                </div>
            </div>
        </SwayTop>
    )
}

export default VoucherHeader