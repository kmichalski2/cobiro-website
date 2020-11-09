import React, { useEffect, useState, useContext } from 'react'
import Modal from '../modal/modal'
import {CurrentLocaleContext} from '../../layout/layout'
import AdyenCheckout from '@adyen/adyen-web'
import '@adyen/adyen-web/dist/adyen.css'
import { v4 as uuidv4 } from 'uuid'

import Classes from './paymentModal.module.scss'

const axios = require('axios');

const PaymentModal = ({showModal, setShowModal, rawPrice, monthlyPricing}) => {

    const [loading, setLoading] = useState(true)
    const [submission, setSubmission] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({})
    const [dirty, setDirty] = useState({})
    const [paymentInformation, setPaymentInformation] = useState()

    const majorUnitPrice = rawPrice / 100
    const price = majorUnitPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})
    const VAT = (majorUnitPrice * 0.2).toLocaleString("en-US", {style:"currency", currency:"USD"})
    const priceExVAT = (majorUnitPrice * 0.8).toLocaleString("en-US", {style:"currency", currency:"USD"})
    
    const currentLang = useContext(CurrentLocaleContext).locale
    const customLangCode = useContext(CurrentLocaleContext).customLangCode
    
    const aydenRef = React.useRef()

    let checkout


    const handlePayment = (userId) => {
        axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/make-payment`, {
            data: {
                type: "make-payment",
                attributes: {
                    payment_id: uuidv4(),
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
            if(res.data.data.action) {
                const action = res.data.data.action
                checkout.createFromAction(action).mount(aydenRef)
            }
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
        setDirty({...dirty, [key]: true})

        if(e.target.type === 'email') { 
            const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
            if(value.match(re)) {
                const newErrors = {...errors}
                delete newErrors[key]
                setErrors(newErrors)
            } else {
                setErrors({...errors, [key]: 'Email is invalid'})
            }
        } else if(e.target.type === 'password') {
            if(value.length < 6) {
                setErrors({...errors, [key]: 'Needs to be a minimum of 6 characters long'})
            } else {
                const newErrors = {...errors}
                delete newErrors[key]
                setErrors(newErrors)
            }
        }
    }

    const isObjEmpty = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object
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
                    originKey: process.env.GATSBY_AYDEN_ORIGIN_KEY, // Your client key. To find out how to generate one, see https://docs.adyen.com/development-resources/client-side-authentication. Web Components versions before 3.10.1 use originKey instead of clientKey.
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

                checkout = new AdyenCheckout(aydenConfiguration);
                console.log('checkout', checkout)
                const card = checkout.create('dropin').mount(aydenRef.current);



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
                            <p className="text-xs-small">You’ll be charged {price} {monthlyPricing ? 'monthly' : 'yearly'} until you cancel your subscription. All amounts shown are in USD. Payment data is always encrypted and secure.</p>
                            <table className="table text-xs-small table-unstyled">
                            <tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td className="text-right">{priceExVAT}</td>
                                </tr>
                                <tr>

                                <td>VAT 25%</td>
                                <td className="text-right">{VAT}</td>
                                </tr>
                                <tr>
                                    <td className="text-bold">Total incl. VAT</td>
                                    <td className="text-right text-bold">{price}/{monthlyPricing ? 'month' : 'year'}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        <div className={["col col-xs-12 col-lg-8 first-lg", Classes.modalLeft].join(' ')}>
                            {/* <img src={PaymentDummy} alt="" /> */}
                            <h3 className="space-xs-up">Account Information</h3>
                            <form>
                                <div className={["form-group", Classes.formGroup, errors.email ? Classes.error : null, dirty.email ? Classes.dirty : null].join(' ')}>
                                    <label className="sr-only" htmlFor="email">Email address</label>
                                    <input id="email" type="email" name="email" placeholder="Email address" 
                                        value={submission.email} 
                                        onChange={handleUserRegistrationChange} 
                                        />
                                        {errors.email ? <p className={["text-red text-xs-small", Classes.errorText].join(' ')}>{errors.email}</p> : null}
                                </div>
                                <div className={["form-group", Classes.formGroup, errors.password ? Classes.error : null, dirty.password ? Classes.dirty : null].join(' ')}>
                                    <label className="sr-only" htmlFor="password">Password</label>
                                    <input id="password" type="password" name="password" placeholder="Password" 
                                        value={submission.password} 
                                        onChange={handleUserRegistrationChange} 
                                        />
                                        {errors.password ? <p className={["text-red text-xs-small", Classes.errorText,].join(' ')}>{errors.password}</p> : null}
                                </div>
                            
                            </form>
                            <div className="space-xs-up" ref={aydenRef}></div>
                            <button className="btn btn-full-width" onClick={handleOnSubmit} disabled={!paymentInformation || !paymentInformation.isValid || !isObjEmpty(errors)}>Pay {price}</button>
                        </div>
                    </div>
                </div>
        </Modal>
    )
}

export default PaymentModal