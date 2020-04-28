import React from "react"

import VoucherStyles from "./voucher.module.scss"
import VoucherForm from "./voucherForm/voucherForm";
import Section from "../../UiElements/Section/Section";
import HeaderWText from "../../UiElements/HeaderWText/HeaderWText";

const Voucher = ({ data }) => {

    const env = data.environment
    const bgColor = data.bgColor && data.bgColor.hex
    const formType = data.formType
    const light = data.textColor === 'light'

    return (
        <Section bgColor={bgColor} id="voucher-signup">
            <div className="container">
                <div className="row center-xs text-center">
                    <div className="col col-xs-12">
                        <HeaderWText
                            title={data.title}
                            h2
                            text={data.text}
                            light={light}
                        />
                    </div>
                    
                    <div className="col col-xs-12 col-md-10 col-xl-8">
                        <VoucherForm env={env} footnote={data.footnote} formType={formType}/>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default Voucher
