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
import EmailVerificator from './emailVerificator/emailVerificator'
import ReCAPTCHA from "react-google-recaptcha";

const axios = require('axios');
const queryString = require('query-string');

const PaymentModal = ({showModal, setShowModal, rawPriceIncVat, rawPriceExVat, monthlyPricing, planId, pricing, returningData}) => {
    
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
    const [ip, setIp] = useState("")
    const [recaptchaValid, setRecaptchaValid] = useState(false)
    const [urlParams, setUrlParams] = useState('')
    const [utmInterest, setUtmInterest] = useState('')
    const [resultCode, setResultCode] = useState('')

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

    const location = useContext(CurrentLocaleContext).location
    const parsedLocation = queryString.parse(location.search);

    useEffect(() => {

        setPaymentId(uuidv4())

        axios.get('https://www.cloudflare.com/cdn-cgi/trace').then((res) => {
            res.data.split('\n').map(el => {
                const keyValue = el.split(("="))
                if(keyValue && keyValue[0] === 'ip') {
                    setIp(keyValue[1])
                }
            })            
        })

        if(returningData) {
            
            const {payment_id, ...payload} = returningData
            setPaymentId(payment_id)
            handleShopperRedirect({MD: payload.MD, PaRes: payload.PaRes}, null, payment_id)
        }

        if(parsedLocation) {
            
            const {MD, PaRes, utm_interest, ...urlParams} = parsedLocation
            const stringified = queryString.stringify(urlParams);
            console.log('stringified', stringified)

            setUrlParams(stringified)

            if(utm_interest) {
                setUtmInterest(utm_interest)
            }
        }

    }, [])

    useEffect(() => {
        if(startLogin) {            
            const loginRediect = async () => {

                const token = await localStorage.getItem('loginToken')
                if(token) {
                    redirectToApp(token)
                } else {
                    loginUser(false)
                }
            }

            loginRediect()
            
        }
    }, [startLogin])

    const isObjEmpty = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    const errorFormatHandler = (err) => {

        const errorString = err.response && err.response.data && err.response.data.errors && (err.response.data.errors.message || err.response.data.errors.map(e => e.detail || e.title).join('. ')) || 'Something went wrong. Please try again, and check you entered the correct values.'

        return errorString
    }

    const pushWindowEvent = (event) => {
        if(window && window.dataLayer) {
            window.dataLayer.push({'event': event})
        }
    }

    const redirectToApp = async (userToken) => {

        let linkerParam = ''

        if(window.ga) {
            window.ga(function () {
                var trackers = window.ga.getAll();
                trackers.forEach(function (tracker) {
                    if(!linkerParam) {
                        const param = tracker.get('linkerParam')
                        linkerParam = param
                    }
                });
            });
        }

        window.location.href = `${process.env.GATSBY_APP_URL}/user/login?token=${userToken}&plan_id=${planId || 0}&status=${resultCode}&redirectUri=%2Fonboarding%2Fsite${urlParams ? '&' + urlParams : ''}${linkerParam ? '&' + linkerParam : ''}`
    }

    const processPaymentResponse = async (paymentRes, dropin) => {
        
        const action = paymentRes.action || paymentRes

        if (paymentRes && (paymentRes.action || paymentRes.type)) {
            
            if(action.type === 'redirect' && paymentRes.redirect) {
                const {TermUrl, ...redirectPayload} = paymentRes.redirect.data
                const token = await loginUser(true)
                localStorage.setItem('loginToken', token)
            }
            if(dropin) {
                dropin.handleAction(action)
            } else {
                paymentComponent.handleAction(action)
            }
        } else if(isObjEmpty(paymentRes)) {
            setSubmitError(null)
            pushWindowEvent('/Pricing - Payment Success')
            setStartLogin(true)
        } else {

            setResultCode(paymentRes.resultCode)

            switch (paymentRes.resultCode) {
                case "Authorised":
                    setSubmitError(null)
                    pushWindowEvent('/Pricing - Payment Success')
                    setStartLogin(true)
                break;
                case "Pending":
                    setSubmitError(null)
                    pushWindowEvent('/Pricing - Payment Success')
                    setStartLogin(true)
                break;
                case "Refused":
                    setSubmitting(false)
                    setSubmitSuccess(false)
                    pushWindowEvent('/Pricing - Payment failed')
                    setSubmitError('The transaction was refused.')
                break;
                default:
                    setSubmitting(false)
                    setSubmitSuccess(false)
                    pushWindowEvent('/Pricing - Payment failed')
                    setSubmitError('The transaction was refused.')
                break;
            }
        }
    }

    const handlePayment = () => {

        if(window && window.dataLayer) {
            window.dataLayer.push({'event': '/Pricing - Payment started','payment_id': paymentId })
        }

        axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/make-payment`, {
            data: {
                type: "make-payment",
                attributes: {
                    payment_id: paymentId,
                    email: submission.email,
                    plan_id: planId,
                    amount: rawPriceIncVat,
                    currency: "USD",
                    return_url: `${window.location.origin}${window.location.pathname}?returning=1&utm_nooverride=1&payment_id=${paymentId}${urlParams ? '&' + urlParams : ''}`,
                    redirect_from_issuer_method: "GET",
                    origin: window.location.origin,
                    shopper_ip: ip,
                    browser_info: paymentInformation.data.browserInfo,
                    payment_method: paymentInformation.data.paymentMethod,
                    riskData: paymentInformation.data.riskData
                }
            }
        }).then((res) => {
            const attributes = res && res.data && res.data.data && res.data.data.attributes
            if(attributes && attributes.payload) {
                processPaymentResponse(attributes.payload)
            } else if(isObjEmpty(res)) {
                processPaymentResponse()
            }
        }).catch((err) => {
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(errorFormatHandler(err))
        })
    }

    const loginUser = async (returnToken) => {

        
        const tokenReturned = await axios.post(`${process.env.GATSBY_HUB_URL}/v1/login`, {
            data: {
                type: "login",
                attributes: {
                    email: submission.email,
                    password: submission.password,
                }
            }
        }).then(async (res) => {

            const userToken = res.data.data.attributes.access_token

            if(!returnToken) {
                setSubmitting(false)
                setSubmitSuccess(true)
                redirectToApp(userToken)
            }  

            return userToken
            
        }).catch((err) => {
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(errorFormatHandler(err))
            return false
        })

        console.log('returning from login', tokenReturned)
        return tokenReturned
    }

    const handleRecaptchaValidation = (rCToken) => {
        
        axios.post(`${process.env.GATSBY_HUB_URL}/v1/verifyRecaptcha`, {
            recaptcha_token: rCToken
        }).then((res) => {
            setRecaptchaValid(true)
        }).catch((err) => {
            setSubmitError(errorFormatHandler(err))
        })
    }
    

    const registerUser = (usePayment) => {

        const source = !isFreeTier ? {source: "payment"} : {}
        const utm_interest = utmInterest ? {utm_interest: utmInterest} : {}

        axios.post(`${process.env.GATSBY_HUB_URL}/v1/register`, {
            data: {
                type: "users",
                attributes: {
                    ...source,
                    ...utm_interest,
                    email: submission.email,
                    password: submission.password,
                    "partner_id": 1
                }
            }
        }).then((res) => {
            
            pushWindowEvent('/Pricing - Account - Account Created')
            
            if(!isFreeTier) {
                handlePayment()
            } else {
                setShowEmailValidation(true)
                setSubmitting(false)
            }
            
        }).catch((err) => {
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(errorFormatHandler(err))
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
        if(!isFreeTier && paymentInformation.isValid) {
            registerUser(true)
        } else if(isFreeTier) {
            registerUser(false)
        }
    }

    const handleShopperRedirect = (payload, dropin, payId) => {

        axios.post(`${process.env.GATSBY_HUB_URL}/v2/subscriptions/payments/adyen/handle-shopper-redirect`, {
            data: {
                type: "make-payment",
                attributes: {
                    payment_id: paymentId || payId,
                    payload:  {
                        ...payload
                    }
                }
            }
        }).then((res) => {

            const attributes = res.data && res.data.data && res.data.data.attributes
            
            if(attributes && attributes.result_code && (!attributes.payload || (attributes.payload && attributes.payload.length === 0))) {

                const resultMutated = {
                        resultCode: attributes.result_code
                    }
                    
                processPaymentResponse(resultMutated, dropin)

            } else if(attributes && attributes.payload) {
                processPaymentResponse(attributes.payload, dropin)
            }
                        
        }).catch((err) => {
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(errorFormatHandler(err))
        })
    }
    
    const handleOnAdditionalDetails = (state, dropin) => {
        console.log('handleShopperRedirect called', state.data.details)
        setPaymentComponent(dropin)
        handleShopperRedirect(state.data.details, dropin) 
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
            loginUser(false)
            
        }).catch((err) => {
            setSubmitting(false)
            setSubmitSuccess(false)
            setSubmitError(errorFormatHandler(err))
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
                    {!returningData ?
                    <>
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
                            {isFreeTier ?
                            <ReCAPTCHA
                                sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY}
                                onChange={handleRecaptchaValidation}
                                />
                            : null}
                            
                            {!isFreeTier ?
                                <p className={["text-bold small space-small-xs-up", Classes.informationTitles, Classes.paymentInformation].join(' ')}>Payment information</p>
                            : null}
                            <div className="space-xs-up" ref={aydenRef}></div>
                            <button 
                                className={["btn btn-full-width", submitSuccess ? Classes.successBtn : null].join(' ')} 
                                onClick={handleOnSubmit} 
                                disabled={(!isFreeTier && (!paymentInformation || !paymentInformation.isValid)) || !isObjEmpty(errors) || !submission.email || !submission.password || (isFreeTier && !recaptchaValid)}>
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
                        </>
                        : 
                        <div className={Classes.returning}>
                            <img className={Classes.logo} src={logo} alt="Cobiro logo" />
                            {!submitError ?
                            <LoadingSpinner loading={true} large relative dark>
                                Loading
                            </LoadingSpinner> 
                            : <h3 className="text-center space-big-xs-up text-red">{submitError}</h3>
                            }
                             
                            <div className={["flex", isFreeTier ? "center-xs" : null].join(' ')}>
                                <ImageAll image={securePaymentImage} classes={Classes.paymentImages}/>
                                <ImageAll image={googlePartnerImage.childImageSharp} classes={Classes.paymentImages}/>
                            </div> 
                        </div>
                        }
                    </div>
                </div>
        </Modal>
    )
}

export default PaymentModal
