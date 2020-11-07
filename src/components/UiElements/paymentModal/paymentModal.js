import React, { useEffect, useState, useContext } from 'react'
import Modal from '../modal/modal'
import {CurrentLocaleContext} from '../../layout/layout'
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';

import Classes from './paymentModal.module.scss'

const axios = require('axios');

const PaymentModal = ({showModal, setShowModal, rawPrice, monthlyPricing}) => {

    const [loading, setLoading] = useState(true)
    const [submission, setSubmission] = useState({email: '', password: ''})
    const [paymentInformation, setPaymentInformation] = useState()

    const majorUnitPrice = rawPrice / 100
    const price = majorUnitPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})
    
    const currentLang = useContext(CurrentLocaleContext).locale
    const customLangCode = useContext(CurrentLocaleContext).customLangCode
    
    const aydenRef = React.useRef()

    
    const handlePayment = (userId) => {
        axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/make-payment`, {
            data: {
                type: "make-payment",
                attributes: {
                    payment_id: userId,
                    email: submission.email,
                    plan_id: 123,
                    amount: rawPrice,
                    currency: "USD",
                    return_url: "https://app.test-cobiro.com/sites",
                    origin: "https://app.test-cobiro.com",
                    shopper_ip: "192.168.0.1",
                    browser_info: paymentInformation.data.browserInfo,
                    payment_method: paymentInformation.data.paymentMethod,
                    riskData: paymentInformation.data.riskData
                }
            }
        }).then((res) => {
            console.log('res', res)
        }).catch((err) => {
            console.log('err', err)
        })
    }

    const registerUser = () => {

        console.log('paymentInformation.data', paymentInformation.data)
        axios.post(`${process.env.GATSBY_HUB_URL}/v1/register`, {
            data: {
                type: "users",
                attributes: {
                    email: submission.email,
                    password: submission.password,
                    "partner_id": 1
                }
            }
        }).then((res) => {
            console.log('res', res)
            const userId = res.data.data.id
            handlePayment(userId)
        }).catch((err) => {
            console.log('err', err)
        })
    }
    
    const handleOnChange = (state, component) => {
        setPaymentInformation(state)
    }
    
    const handleOnSubmit = () => {
        console.log('register user:', submission)
        console.log('make payment:', paymentInformation)
        if(paymentInformation.isValid) {
            registerUser()
        } else {
            console.log('error')
        }
    }
    
    const handleOnAdditionalDetails = (state, component) => {
        // setPaymentInformation(state)
    }

    const handleUserRegistrationChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        setSubmission({...submission, [key]: value})
    }


    useEffect(() => {
        if(showModal && rawPrice && typeof window !== 'undefined') {
            console.log('showModal', rawPrice)
            axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/payment-methods`, {
                data: {
                    type: "payment-methods",
                    attributes: {
                        amount: rawPrice,
                        locale: 'en-US',
                        currency: "USD" 
                    }
                }
            }).then((res) => {
                const response = res.data.data.attributes
                setLoading(false)

                const aydenConfiguration = {
                    locale: customLangCode || currentLang, // The shopper's locale. For a list of supported locales, see https://docs.adyen.com/checkout/components-web/localization-components.
                    environment: "test", // When you're ready to accept live payments, change the value to one of our live environments https://docs.adyen.com/checkout/components-web#testing-your-integration.  
                    originKey: "pub.v2.8215883284862673.aHR0cDovL2xvY2FsaG9zdDo4MDAw.ixsPi4cTCsm_eykIhZaFbfMcMhY6zGnDxqIVc1BKT-E", // Your client key. To find out how to generate one, see https://docs.adyen.com/development-resources/client-side-authentication. Web Components versions before 3.10.1 use originKey instead of clientKey.
                    paymentMethodsResponse: response, // The payment methods response returned in step 1.
                    onChange: handleOnChange, // Your function for handling onChange event
                    onAdditionalDetails: handleOnAdditionalDetails, // Your function for handling onAdditionalDetails event,
                    showPayButton: false,
                    paymentMethodsConfiguration: {
                        card: {
                            hasHolderName: true,
                            holderNameRequired: true
                        }
                    },
                    hasHolderName: true,
                    holderNameRequired: true,
                    amount: { value: rawPrice, currency: 'USD' }
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
                            <h4>Cobiro {showModal}</h4>
                            <p className="small">You’ll be charged {price} {monthlyPricing ? 'monthly' : 'yearly'} until you cancel your subscription. All amounts shown are in USD. Payment data is always encrypted and secure.</p>
                        </div>
                        <div className={["col col-xs-12 col-lg-8 first-lg", Classes.modalLeft].join(' ')}>
                            {/* <img src={PaymentDummy} alt="" /> */}
                            <h3 className="space-xs-up">Account Information</h3>
                            <form>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="email">Email address</label>
                                    <input id="email" type="email" name="email" placeholder="Email address" 
                                        value={submission.email} 
                                        onChange={handleUserRegistrationChange} 
                                        />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="password">Password</label>
                                    <input id="password" type="password" name="password" placeholder="Password" 
                                        value={submission.password} 
                                        onChange={handleUserRegistrationChange} 
                                        />
                                </div>
                            
                            </form>
                            <div className="space-xs-up" ref={aydenRef}></div>
                            <button className="btn btn-full-width" onClick={handleOnSubmit} disabled={!paymentInformation || !paymentInformation.isValid}>Pay {price}</button>
                        </div>
                    </div>
                </div>
        </Modal>
    )
}

export default PaymentModal