import React, { useEffect, useState, useContext } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Modal from '../modal/modal'
import {CurrentLocaleContext} from '../../layout/layout'
import AdyenCheckout from '@adyen/adyen-web'
import '@adyen/adyen-web/dist/adyen.css'
import { v4 as uuidv4 } from 'uuid'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

import Classes from './paymentModal.module.scss'
import ImageAll from '../ImageAll/ImageAll'

const axios = require('axios');

const PaymentModal = ({showModal, setShowModal, rawPriceIncVat, rawPriceExVat, monthlyPricing, planId}) => {

    const queryData = useStaticQuery(graphql`
    query PaymentImages {
        securePayment: file(relativePath: { eq: "logo-encrypt.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 300, quality: 80) {
                srcSet
                src
                sizes
                base64
                aspectRatio
              }
            }
        }
        googlePartner: file(relativePath: { eq: "logo-googlepartner.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 300, quality: 80) {
                srcSet
                src
                sizes
                base64
                aspectRatio
              }
            }
        }
    }
    `)
    
    const securePaymentImage = queryData.securePayment
    const googlePartnerImage = queryData.googlePartner

    console.log(queryData)

        
    const [loading, setLoading] = useState(true)
    const [submission, setSubmission] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({})
    const [dirty, setDirty] = useState({})
    const [paymentInformation, setPaymentInformation] = useState({})
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(false)
    const [paymentComponent, setPaymentComponent] = useState()
    const [paymentId, setPaymentId] = useState()


    const majorUnitPriceIncVat = rawPriceIncVat / 100
    const majorUnitPriceExVat = rawPriceExVat / 100
    const price = majorUnitPriceExVat.toLocaleString("en-US", {style:"currency", currency:"USD"})
    const VAT = (majorUnitPriceIncVat - majorUnitPriceExVat).toLocaleString("en-US", {style:"currency", currency:"USD"})
    const priceIncVAT = majorUnitPriceIncVat.toLocaleString("en-US", {style:"currency", currency:"USD"})
    
    const currentLang = useContext(CurrentLocaleContext).locale
    const customLangCode = useContext(CurrentLocaleContext).customLangCode
    
    const aydenRef = React.useRef()

    let checkout

    useEffect(() => {
        console.log('MOUNTED!')
        setPaymentId(uuidv4())
    }, [])

    const processPaymentResponse = (paymentRes) => {
        const USER_TOKEN = "09dfpgjdpfgidfgi"

        if (paymentRes.action) {
            console.log('paymentComponent', paymentComponent)
            paymentComponent.handleAction(paymentRes.action)
        } else {
          switch (paymentRes.resultCode) {
            case "Authorised":
                setSubmitting(false)
                setSubmitSuccess(true)
                setSubmitError(null)
                window.location.href = `https://app.cobiro.com/user/login?token=${USER_TOKEN}&redirectUri=%2Fonboarding%2Fsite`
              break;
            case "Pending":
              window.location.href = "/status/pending";
              break;
            case "Refused":
                setSubmitting(false)
                setSubmitSuccess(false)
                setSubmitError('The transaction was refused.')
              break;
            default:
                setSubmitting(false)
                setSubmitSuccess(false)
                setSubmitError('The transaction was refused.')
              break;
          }
        }
      }
    const handlePayment = (userId) => {


        axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/make-payment`, {
            data: {
                type: "make-payment",
                attributes: {
                    payment_id: paymentId,
                    email: submission.email,
                    plan_id: planId,
                    amount: rawPriceIncVat,
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
            console.log('res', res.data.data)
            if(res.data.data.attributes && res.data.data.attributes.payload) {
                console.log('HANDLING RESPONSE', res.data.data.attributes.payload)
                processPaymentResponse(res.data.data.attributes.payload)
            }
            // if(res.data.data.action) {
            //     const action = res.data.data.action
            //     checkout.createFromAction(action).mount(aydenRef)
            // }
            // setSubmitting(false)
            // setSubmitSuccess(false)
            // setSubmitError('Something went wrong. Please try again, and check you entered the correct values.')
        }).catch((err) => {
            console.log('err', err)
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError('Something went wrong. Please try again, and check you entered the correct values.')
        })
    }

    const loginUser = (usePayment, userId) => {
        
        axios.post(`${process.env.GATSBY_HUB_URL}/v1/login`, {
            data: {
                type: "login",
                attributes: {
                    email: submission.email,
                    password: submission.password,
                }
            }
        }).then((res) => {
            console.log('res', res)
            
            // if(usePayment) {
            //     handlePayment(userId, userToken)
            // } else {
            //     setSubmitting(false)
            //     setSubmitSuccess(true)
            // }
            
        }).catch((err) => {
            const error = err
            console.log('err', error.response)
            console.log('err.data', error.data)
            console.log('err.errors', error.errors)
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(error.response && error.response.data && error.response.data.errors.map(e => e.detail).join('. '))
        })

        
    }

    const registerUser = (usePayment) => {

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

            // loginUser(usePayment, userId)

            if(usePayment) {
                handlePayment(userId)
            } else {
                setSubmitting(false)
                setSubmitSuccess(true)
            }
            
        }).catch((err) => {
            const error = err
            console.log('err', error.response)
            console.log('err.data', error.data)
            console.log('err.errors', error.errors)
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(error.response && error.response.data && error.response.data.errors.map(e => e.detail).join('. '))
        })
    }
    
    const handleOnChange = (state, component) => {
        setPaymentComponent(component)
        setPaymentInformation(state)
    }
    
    const handleOnSubmit = () => {
        setSubmitting(true)
        console.log('register user:', submission)
        console.log('make payment:', paymentInformation)
        if(rawPriceIncVat !== 0 && paymentInformation.isValid) {
            registerUser(true)
        } else if(rawPriceIncVat === 0) {
            registerUser(false)
        } else {
            console.log('error')
        }
    }

    const handleShopperRedirect = (state) => {
        console.log('PAYMENT ID', paymentId)

        axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/handle-shopper-redirect`, {
            data: {
                type: "make-payment",
                attributes: {
                    payment_id: paymentId,
                    paymentData: state.data.paymentData,
                    payload:  {
                        ...state.data.details
                    }
                }
            }
        }).then((res) => {
            console.log('res', res)
            processPaymentResponse(res.data.data.attributes.payload)
            // loginUser(usePayment, userId)
            
        }).catch((err) => {
            console.log(err.response)
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(err.response && err.response.data && err.response.data.errors.map(e => e.detail).join('. '))
        })
    }
    
    const handleOnAdditionalDetails = (state, dropin) => {
        console.log('handleOnAdditionalDetails', state, dropin)

        handleShopperRedirect(state)
        
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
        if(showModal && rawPriceIncVat && typeof window !== 'undefined' && rawPriceIncVat !== 0) {
            console.log('showModal', rawPriceIncVat)
            axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/payment-methods`, {
                data: {
                    type: "payment-methods",
                    attributes: {
                        amount: rawPriceIncVat,
                        locale: 'en-US',
                        currency: "USD" 
                    }
                }
            }).then((res) => {
                const response = res.data.data.attributes
                

                const aydenConfiguration = {
                    locale: customLangCode || currentLang, // The shopper's locale. For a list of supported locales, see https://docs.adyen.com/checkout/components-web/localization-components.
                    environment: process.env.GATSBY_AYDEN_ENVIRONMENT, // When you're ready to accept live payments, change the value to one of our live environments https://docs.adyen.com/checkout/components-web#testing-your-integration.  
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
                    amount: { value: rawPriceIncVat, currency: 'USD' }
                };

                checkout = new AdyenCheckout(aydenConfiguration);
                console.log('checkout', checkout)
                setLoading(false)
                const card = checkout.create('dropin').mount(aydenRef.current)


            })
        } else if(showModal && rawPriceIncVat === 0) {
            setLoading(false)
        }
    }, [showModal])

    return (
        <Modal showModal={showModal} setShowModal={setShowModal} loading={loading}>
            <div className="container">
                    <div className="row">
                        <div className={["col col-xs-12 col-lg-4", Classes.modalRight].join(' ')}>
                                <div>
                                <div className={Classes.close}>
                                    <button className="btn btn-unstyled" onClick={() => setShowModal(false)}>&#10005;</button>
                                </div>
                                <h4>Cobiro {showModal}</h4>
                                <p className="text-xs-small">You’ll be charged {price} {monthlyPricing ? 'monthly' : 'yearly'} until you cancel your subscription. All amounts shown are in USD. Payment data is always encrypted and secure.</p>
                                <table className="table text-xs-small table-unstyled">
                                <tbody>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td className="text-right">{price}</td>
                                    </tr>
                                    <tr>

                                    <td>VAT 25%</td>
                                    <td className="text-right">{VAT}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-bold">Total incl. VAT</td>
                                        <td className="text-right text-bold">{priceIncVAT}/{monthlyPricing ? 'month' : 'year'}</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            <div className="flex">
                                <ImageAll image={securePaymentImage.childImageSharp} classes={Classes.paymentImages}/>
                                <ImageAll image={googlePartnerImage.childImageSharp} classes={Classes.paymentImages}/>
                            </div>
                        </div>
                        <div className={["col col-xs-12 col-lg-8 first-lg", Classes.modalLeft].join(' ')}>
                            <h3 className="space-xs-up">Account Information</h3>
                            <p className={["text-bold small space-small-xs-up", Classes.informationTitles, Classes.userInformation].join(' ')}>User information</p>
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
                            {rawPriceIncVat !== 0 ?
                                <p className={["text-bold small space-small-xs-up", Classes.informationTitles, Classes.paymentInformation].join(' ')}>Payment information</p>
                            : null}
                            <div className="space-xs-up" ref={aydenRef}></div>
                            <button 
                                className={["btn btn-full-width", submitSuccess ? Classes.successBtn : null].join(' ')} 
                                onClick={handleOnSubmit} 
                                disabled={(rawPriceIncVat !== 0 && (!paymentInformation || !paymentInformation.isValid)) || !isObjEmpty(errors)}>
                                    <span>
                                        {submitting ? 
                                        <LoadingSpinner loading={submitting}>
                                            Loading
                                        </LoadingSpinner> 
                                        : rawPriceIncVat !== 0 ? 
                                            `Pay ${priceIncVAT}` 
                                        : 'Register'}
                                    </span>
                            </button>
                            {submitError ? <p className="text-red space-top-xs-up small">{submitError}</p> : null}
                        </div>
                    </div>
                </div>
        </Modal>
    )
}

export default PaymentModal