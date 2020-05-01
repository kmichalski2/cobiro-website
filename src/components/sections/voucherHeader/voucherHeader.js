import React from 'react'

import VoucherForm from '../voucher/voucherForm/voucherForm'
import SwayTop from '../../UiElements/SwayTop/SwayTop'
import voucherHeaderStyles from './voucherHeader.module.scss'
import GiftCard from '../../UiElements/GiftCard/GiftCard'
import Section from '../../UiElements/Section/Section'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'

const VoucherHeader = (props) => {
    const text = props.data.text
    const link = props.data.linkUrl
    const linkTitle = props.data.linkTitle
    const rightSide = props.data.signUpOrVoucher
    const env = props.data.environment
    const footnote = props.data.footnote
    const formType = props.data.formType
    const backgroundColor = props.data.bgColor && props.data.bgColor.hex
    const light = props.data.textColor === 'light'

    console.log(props.data.textColor)

    return (
        <Section bgColor={backgroundColor}>
            <div className="container">
                <div className="row flex middle-xs">
                    <div className={["col col-xs-12", rightSide === 'signup' ? "col-lg-5" : "col-lg-6"].join(' ')}>
                        <HeaderWText 
                            title={props.data.title}
                            h1
                            text={text}
                            light={light}
                            classes={["space-xs space-sm space-md", voucherHeaderStyles.textWrap].join(' ')}
                            links={[
                                link && linkTitle ?
                                {
                                    link: link,
                                    title: linkTitle,
                                    external: true,
                                    button: true,
                                    large: true,
                                }
                                : ""
                            ]}
                        />
                    </div>
                    <div className={["col col-xs-12 text-white", , rightSide === 'signup' ? "col-lg-7" : "col-lg-6 first-xs last-lg space-xs space-sm space-md"].join(' ')} style={{marginBottom: rightSide === 'signup' ? '-3rem' : null}}>
                        { rightSide === 'signup' ?
                        <VoucherForm env={env} footnote={footnote} formType={formType}/>
                        : rightSide === 'voucher' ?
                        <GiftCard />
                        : null }
                        
                    </div>
                </div>
            </div>
            </Section>
    )
}

export default VoucherHeader