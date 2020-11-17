import React, { useEffect, useState, useContext } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Modal from '../modal/modal'
import {CurrentLocaleContext} from '../../layout/layout'
import AdyenCheckout from '@adyen/adyen-web'
import '@adyen/adyen-web/dist/adyen.css'
import { v4 as uuidv4 } from 'uuid'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'
import logo from "../../../images/logo.svg"
import Classes from './paymentModal.module.scss'
import ImageAll from '../ImageAll/ImageAll'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import EmailVerificator from './emailVerificator/emailVerificator'

const axios = require('axios');

const PaymentModal = ({showModal, setShowModal, rawPriceIncVat, rawPriceExVat, monthlyPricing, planId}) => {

    const queryData = useStaticQuery(graphql`
    query PaymentImages {
        securePayment: file(relativePath: { eq: "icon-sslencrypt.svg" }) {
            publicURL
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
    const [showEmailValidation, setShowEmailValidation] = useState(false)
    const [startLogin, setStartLogin] = useState(false)

    const [token, setToken] = useState('')
    
    const { executeRecaptcha } = useGoogleReCaptcha()

    const isFreeTier = rawPriceIncVat === 0
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
        setPaymentId(uuidv4())
    }, [])

    useEffect(() => {
        if(startLogin) {
            console.log('START LOGIN submission', startLogin, submission)
            loginUser(true)
        }
    }, [startLogin])

    const isObjEmpty = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    const redirectToApp = (userToken) => {
        window.location.href = `https://app.cobiro.com/user/login?token=${userToken}&redirectUri=%2Fonboarding%2Fsite`
    }

    const processPaymentResponse = (paymentRes, dropin) => {

        console.log('processPaymentResponse: paymentRes', paymentRes)

        if (paymentRes && (paymentRes.action || paymentRes.type)) {
            console.log('HANDLE ACTION', paymentRes.action || paymentRes)
            console.log('HANDLE ACTION: paymentComponent', paymentComponent)
            if(dropin) {
                dropin.handleAction(paymentRes.action || paymentRes)
            } else {
                paymentComponent.handleAction(paymentRes.action || paymentRes)
            }
        } else if(!paymentRes) {
            setSubmitting(false)
            setSubmitSuccess(true)
            setSubmitError(null)
            // loginUser(true)
            setStartLogin(true)
        } else {
          switch (paymentRes.resultCode) {
            case "Authorised":
                setSubmitting(false)
                setSubmitSuccess(true)
                setSubmitError(null)
                // loginUser(true)
                setStartLogin(true)
              break;
            case "Pending":
            //   window.location.href = "/status/pending";
                console.log('processPaymentResponse: pending', paymentRes)
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
    const handlePayment = () => {

        axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/make-payment`, {
            data: {
                type: "make-payment",
                attributes: {
                    payment_id: paymentId,
                    email: submission.email,
                    plan_id: planId,
                    amount: rawPriceIncVat,
                    currency: "USD",
                    return_url: `${window.location.href}?returning=1`,
                    origin: window.location.href,
                    shopper_ip: "192.168.0.1",
                    browser_info: paymentInformation.data.browserInfo,
                    payment_method: paymentInformation.data.paymentMethod,
                    riskData: paymentInformation.data.riskData
                }
            }
        }).then((res) => {
            console.log('handlePayment: res', res.data.data)
            if(res && res.data && res.data.data && res.data.data.attributes && res.data.data.attributes.payload) {
                processPaymentResponse(res.data.data.attributes.payload)
            } else if(isObjEmpty(res)) {
                processPaymentResponse()
            }
        }).catch((err) => {
            console.log('handlePayment: err', err)
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError('Something went wrong. Please try again, and check you entered the correct values.')
        })
    }

    const loginUser = (usePayment) => {
        
        axios.post(`${process.env.GATSBY_HUB_URL}/v1/login`, {
            data: {
                type: "login",
                attributes: {
                    email: submission.email,
                    password: submission.password,
                }
            }
        }).then((res) => {
            console.log('loginUser: res', res)
            const userToken = res.data.data.attributes.access_token
            
            setSubmitting(false)
            setSubmitSuccess(true)
            redirectToApp(userToken)

            // if(usePayment) {
            //     // handlePayment(userToken)
            //     redirectToApp(userToken)
            // } else {
            //     setSubmitting(false)
            //     setSubmitSuccess(true)
            //     redirectToApp(userToken)
            // }
            
        }).catch((err) => {
            const error = err
            console.log('loginUser: err', error.response)
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(error.response && error.response.data && error.response.data.errors.map(e => e.detail).join('. '))
        })
    }

    const handleRecaptchaValidation = async (usePayment) => {

        setShowEmailValidation(true)
        setSubmitting(false)
        console.log('handleRecaptchaValidation called')
        const result = await executeRecaptcha('homepage')

        console.log('handleRecaptchaValidation: result', result)
    }
    

    const registerUser = (usePayment) => {

        const source = !isFreeTier ? {source: "payment"} : {}

        console.log('paymentInformation.data', paymentInformation.data)

        axios.post(`${process.env.GATSBY_HUB_URL}/v1/register`, {
            data: {
                type: "users",
                attributes: {
                    ...source,
                    email: submission.email,
                    password: submission.password,
                    "partner_id": 1
                }
            }
        }).then((res) => {
            console.log('registerUser: res', res)
            // const userId = res.data.data.id

            if(!isFreeTier) {
                // loginUser(usePayment)
                handlePayment()
            } else {
                // handle email verification
                handleRecaptchaValidation(usePayment)
            }
            
        }).catch((err) => {
            const error = err
            console.log('registerUser: err', error.response)
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(error.response && error.response.data && error.response.data.errors.map(e => e.detail).join('. '))
        })
    }
    
    const handleOnChange = (state, component) => {
        setSubmitError(null)
        setPaymentComponent(component)
        setPaymentInformation(state)
    }
    
    const handleOnSubmit = () => {
        setSubmitError(null)
        setSubmitting(true)
        console.log('handleOnSubmit: submission', submission)
        console.log('handleOnSubmit: paymentInformation', paymentInformation)
        if(!isFreeTier && paymentInformation.isValid) {
            registerUser(true)
        } else if(isFreeTier) {
            registerUser(false)
        }
    }

    const handleShopperRedirect = (state, dropin) => {
        console.log('handleShopperRedirect: paymentId', paymentId)

        axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/handle-shopper-redirect`, {
            data: {
                type: "make-payment",
                attributes: {
                    payment_id: paymentId,
                    // paymentData: state.data.paymentData,
                    payload:  {
                        ...state.data.details
                    }
                }
            }
        }).then((res) => {
            console.log('handleShopperRedirect: res', res)
            if(res.data && res.data.data && res.data.data.attributes && res.data.data.attributes.payload) {
                processPaymentResponse(res.data.data.attributes.payload, dropin)
            } else if(isObjEmpty(res.data)) {
                processPaymentResponse(dropin)
            }
                        
        }).catch((err) => {
            console.log(err.response)
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(err.response && err.response.data && err.response.data.errors.map(e => e.detail).join('. '))
        })
    }
    
    const handleOnAdditionalDetails = (state, dropin) => {
        console.log('handleOnAdditionalDetails: state', state)
        console.log('handleOnAdditionalDetails: submission', submission)
        console.log('handleOnAdditionalDetails: submission', dropin)
        // Missing submission state - currently its stale
        setPaymentComponent(dropin)
        handleShopperRedirect(state, dropin) 
        
    }

    const handleUserRegistrationChange = (e) => {
        setSubmitError(null)

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

    const handleEmailVerificationSubmit = (verificationCode) => {
        console.log('verificationCode', verificationCode)

        axios.post(`${process.env.GATSBY_HUB_URL}/v1/users/email/verify/pin`, {
            data: {
                type: "users",
                code: verificationCode,
                email: submission.email,
                attributes: {
                    email: submission.email, 
                    code: verificationCode
                }
            }
        }).then((res) => {
            console.log('handleEmailVerificationSubmit: res', res)
            loginUser(false)
            
        }).catch((err) => {
            console.log(err.response)
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(err.response && err.response.data && err.response.data.errors.map(e => e.detail).join('. '))
        })
    }

    useEffect(() => {
        if(showModal && rawPriceIncVat && typeof window !== 'undefined' && !isFreeTier) {
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
                setLoading(false)
                const card = checkout.create('dropin').mount(aydenRef.current)

            })
        } else if(showModal && isFreeTier) {
            setLoading(false)
        }
    }, [showModal])

    return (
        <Modal showModal={showModal} setShowModal={setShowModal} loading={loading} small={isFreeTier ? true : false}>
            <div className="container">
                    <div className="row center-xs">
                    {!isFreeTier ?
                        <div className={["col col-xs-12 col-lg-4", Classes.modalRight].join(' ')}>
                                <div>
                                <div className={Classes.close}>
                                    <button className="btn btn-unstyled" onClick={() => setShowModal(false)}>&#10005;</button>
                                </div>
                                <h4>Cobiro {showModal}</h4>
                                <p className="text-xs-small">
                                    {monthlyPricing ?
                                    "You’ll be charged monthly until you cancel your subscription."
                                    :
                                    "You’ll be charged yearly until you cancel your subscription."
                                    }
                                </p>
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
                                <ImageAll image={securePaymentImage} classes={Classes.paymentImages}/>
                                <ImageAll image={googlePartnerImage.childImageSharp} classes={Classes.paymentImages}/>
                            </div>
                        </div>
                        : null }
                        <div className={["col col-xs-12", Classes.modalLeft, !isFreeTier ? "col-lg-8 first-lg" : null, isFreeTier ? Classes.modalFree : null].join(' ')}>
                            {isFreeTier ?
                                <>
                                    <div className={Classes.close}>
                                        <button className="btn btn-unstyled" onClick={() => setShowModal(false)}>&#10005;</button>
                                    </div>
                                    <img className={Classes.logo} src={logo} alt="Cobiro logo" />
                                    <h3 className="space-big-xs-up text-center">Sign up for free</h3>
                                 </>
                            : null }
                            {!isFreeTier ?
                            <>
                            <h3 className="space-xs-up">Account Information</h3>
                            <p className={["text-bold small space-small-xs-up", Classes.informationTitles, Classes.userInformation].join(' ')}>User information</p>
                            </>
                            : null }
                            {!showEmailValidation ? 
                            <>
                            <form>
                                <div className={["form-group", Classes.formGroup, errors.email ? Classes.error : null, dirty.email ? Classes.dirty : null].join(' ')}>
                                    <label className="sr-only" htmlFor="email">Email address</label>
                                    <input id="email" type="email" name="email" placeholder="E-mail" 
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
                            
                            {!isFreeTier ?
                                <p className={["text-bold small space-small-xs-up", Classes.informationTitles, Classes.paymentInformation].join(' ')}>Payment information</p>
                            : null}
                            <div className="space-xs-up" ref={aydenRef}></div>
                            <button 
                                className={["btn btn-full-width", submitSuccess ? Classes.successBtn : null].join(' ')} 
                                onClick={handleOnSubmit} 
                                disabled={(!isFreeTier && (!paymentInformation || !paymentInformation.isValid)) || !isObjEmpty(errors) || !submission.email || !submission.password}>
                                    <span>
                                        {submitting ? 
                                        <LoadingSpinner loading={submitting}>
                                            Loading
                                        </LoadingSpinner> 
                                        : !isFreeTier ? 
                                            `Pay ${priceIncVAT}` 
                                        : showEmailValidation ?
                                            'Submit'
                                        : 'Sign up'}
                                    </span>
                            </button>
                            </>
                            : 
                            <EmailVerificator 
                                submitSuccess={submitSuccess}
                                submitting={submitting}
                                setSubmitting={setSubmitting}
                                handleEmailVerificationSubmit={handleEmailVerificationSubmit}
                                />
                            }
                            {isFreeTier ?
                            <p className="space-top-xs-up text-xs-small text-center">By clicking the "Sign up" button, you are creating a Cobiro account, and you agree to Cobiro's Terms &amp; Conditions.</p>
                            : null}
                            
                            {submitError ? <p className="text-red space-top-xs-up small">{submitError}</p> : null}
                        </div>
                    </div>
                </div>
        </Modal>
    )
}

export default PaymentModal