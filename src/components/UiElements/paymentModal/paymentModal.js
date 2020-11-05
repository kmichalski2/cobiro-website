import React, { useEffect, useState, useContext } from 'react'
import Modal from '../modal/modal'
import {CurrentLocaleContext} from '../../layout/layout'
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';

import Classes from './PaymentModal.module.scss'
const axios = require('axios');

const PaymentModal = ({showModal, setShowModal, amount}) => {

    const [loading, setLoading] = useState(true)
   

    const currentLang = useContext(CurrentLocaleContext).locale
    const customLangCode = useContext(CurrentLocaleContext).customLangCode
    
    const aydenRef = React.useRef()

    const handleOnChange = (state, component) => {
        console.log(state)
        console.log(component)
    }
    
    const handleOnSubmit = (state, component) => {
        console.log(state)
        console.log(component)
    }
    
    const handleOnAdditionalDetails = (state, component) => {
        console.log(state)
        console.log(component)
    }


    useEffect(() => {
        if(showModal) {
            console.log('showModal', showModal)
        axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/payment-methods`, {
            data: {
                type: "payment-methods",
                attributes: {
                    amount: showModal,
                    locale: 'en-US',
                    currency: "USD" 
                }
            }
        }).then((res) => {
            const response = res.data.data.attributes
            console.log('RES', response)
            setLoading(false)

            const aydenConfiguration = {
                locale: customLangCode || currentLang, // The shopper's locale. For a list of supported locales, see https://docs.adyen.com/checkout/components-web/localization-components.
                environment: "test", // When you're ready to accept live payments, change the value to one of our live environments https://docs.adyen.com/checkout/components-web#testing-your-integration.  
                originKey: "pub.v2.8215883284862673.aHR0cDovL2xvY2FsaG9zdDo4MDAw.ixsPi4cTCsm_eykIhZaFbfMcMhY6zGnDxqIVc1BKT-E", // Your client key. To find out how to generate one, see https://docs.adyen.com/development-resources/client-side-authentication. Web Components versions before 3.10.1 use originKey instead of clientKey.
                paymentMethodsResponse: response, // The payment methods response returned in step 1.
                // onChange: handleOnChange, // Your function for handling onChange event
                onSubmit: handleOnSubmit,
                onAdditionalDetails: handleOnAdditionalDetails, // Your function for handling onAdditionalDetails event,
                showPayButton: true,
                amount: { value: showModal, currency: 'USD' }
            };

            const checkout = new AdyenCheckout(aydenConfiguration);
            console.log('checkout', checkout)
            const card = checkout.create('card').mount(aydenRef.current);



        })
    }
    }, [showModal])

    return (
        <Modal showModal={showModal} setShowModal={setShowModal} loading={loading}>
            <div className="container">
                    <div className="row">
                        <div className={["col col-xs-12 col-lg-4", Classes.modalRight].join(' ')}>
                            <div className={Classes.close}>
                                <button className="btn btn-unstyled" onClick={() => setShowModal(false)}>&#10005;</button>
                            </div>
                            <h4>Cobiro Professionel</h4>
                            <p className="small">Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, sed do </p>
                        </div>
                        <div className={["col col-xs-12 col-lg-8 first-lg", Classes.modalLeft].join(' ')}>
                            {/* <img src={PaymentDummy} alt="" /> */}
                            <h3>Account Information</h3>
                            <form>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="email">Email address</label>
                                    <input id="email" type="text" placeholder="Email address" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="password">Password</label>
                                    <input id="password" type="password" placeholder="Password" />
                                </div>
                            
                            </form>
                            <div ref={aydenRef}></div>
                        </div>
                    </div>
                </div>
        </Modal>
    )
}

export default PaymentModal