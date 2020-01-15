import React, { useState } from "react"

import VoucherFormStyles from './voucherForm.module.scss'

const VoucherForm = ({env, footnote}) => {

    const axios = require('axios');

    const envUrl = env === 'development' ? 'test-cobiro' : env === 'staging' ? 'staging-cobiro' : env === 'production' ? 'cobiro' : null
    const [planId, setPlanId] = useState(2)
    const [website, setWebsite] = useState('')
    const [isWebsiteValid, setIsWebsiteValid] = useState(false)
    // const [name, setName] = useState('')
    // const [isNameValid, setIsNameValid] = useState(false)
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [errors, setErrors] = useState()
    const [isLoading, setIsLoading] = useState(false)


    const password = Math.random().toString(36).substring(1)


    const handleFocus = (event) => {
        event.target.classList.add(VoucherFormStyles.focus)
    }
    const handleBlur = (event) => {
        if((!event.target.value && !event.target.classList.contains(VoucherFormStyles.invalid))) {
            event.target.classList.add(VoucherFormStyles.invalid)
        }
        event.target.classList.remove(VoucherFormStyles.focus)
    }

    const handleChange = (event) => {
        // if(event.target.name === 'name') {
        //     setName(event.target.value)
        //     handleChangeName(event)
        // } else 
        if(event.target.name === 'email') {
            setEmail(event.target.value)
            handleChangeEmail(event)
        } else if(event.target.name === 'website') {
            setWebsite(event.target.value)
            handleChangeWebsite(event)
        }
    }

    // const handleChangeName = (event) => {
    //     if(event.target.value && event.target.classList.contains(VoucherFormStyles.invalid)) {
    //         event.target.classList.remove(VoucherFormStyles.invalid)
    //         setIsNameValid(true)
    //     } else if(event.target.value) {
    //         setIsNameValid(true)  
    //     } else if(!event.target.value) {
    //         setIsNameValid(false)
    //     }
    // }

    const handleChangeEmail = (event) => {
        const email = event.target.value
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
        if(email.match(re)) {
            event.target.classList.remove(VoucherFormStyles.invalid)
            setIsEmailValid(true)
        } else {
            event.target.classList.add(VoucherFormStyles.invalid)
            setIsEmailValid(false)
        }   
    }

    const handleChangeWebsite = (event) => {
        const url = event.target.value
        if(url && validateUrl(url)) {
            setIsWebsiteValid(true)
            event.target.classList.remove(VoucherFormStyles.invalid)
        } else {
            setIsWebsiteValid(false)
            event.target.classList.add(VoucherFormStyles.invalid)
        }
    }

    const validateUrl = (url) => {
        const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
        if(url.match(re)) {
            return true
        } else {
            return false
        }
    }

    const handleSubmit = () => {
        setErrors()
        setIsLoading(true)

        registerUser();
    }

    const trackUser = (user_id, site_id, plan_id) => {
        if(typeof window !== 'undefined' && typeof window.mixpanel !== 'undefined') {
            window.mixpanel.identify(user_id);
            window.mixpanel.track("/SeamlessBilling - Account - Account Created", {
                "site_id-created": site_id,
                "currency": "USD",
                "amount_selected": plan_id === 0 ? 25 : plan_id === 1 ? 50 : plan_id === 2 ? 100 : plan_id === 3 ? 200 : null} );
            console.log('Mixpanel: tracking user')
        } else {
            console.log('Mixpanel not defined')
        }
    }

    const registerUser = () => {
        axios({
            method: 'post',
            url: `https://hub.${envUrl}.com/v1/register`,
            data: {
                data: {
                    type: "users",
                    attributes: {
                        email: email,
                        // first_name: name,
                        last_name: "lastname",
                        password: password
                    }
                }
            },
            headers: {"Content-Type": "application/vnd.api+json"}
          })
          .then(response => {
            console.log('USER REGISTRATION RESPONSE: ', response);
            setErrors()
            // setUserId(response.data.data.id)
            loginUser(response.data.data.id)
          })
          .catch(error => {
            console.log('USER REGISTRATION ERROR: ', error.response);
            setErrors(error.response.data.errors)
            setIsLoading(false)
          }) 
    }

    const loginUser = (customerId) => {
        axios({
            method: 'post',
            url: `https://hub.${envUrl}.com/v1/login`,
            data: {
                data: {
                    type: "login",
                    attributes: {
                        email: email,
                        password: password
                    }
                }
            }
          })
          .then(response => {
            console.log('USER LOGIN RESPONSE: ', response);
            setErrors()
            // setAccessToken(response.data.data.attributes.access_token)
            // setRefreshToken(response.data.data.attributes.refresh_token)
            createSite(response.data.data.attributes.access_token, customerId)
          })
          .catch(error => {
            console.log('USER LOGIN ERROR: ', error.response);
            setErrors(error.response.data.errors)
            setIsLoading(false)
          }) 
    }

    const createSite = (token, customerId) => {
        const domain = website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]

        axios({
            method: 'post',
            url: `https://hub.${envUrl}.com/v1/sites`,
            data: {
                data: {
                    type: "sites",
                    attributes: {
                        user: customerId,
                        domain: `https://${domain}`
                    }
                }
            },
            headers: {Authorization: `Bearer ${token}`}
          })
          .then(response => {
            console.log('CREATE SITE RESPONSE: ', response);
            console.log('customer_id: ', customerId, ' site_id: ', response.data.data.id, ' plan_id: ', planId, planId === 1 ? 25 : planId === 2 ? 50 : planId === 3 ? 100 : planId === 4 ? 200 : null)
            
            setErrors()
            trackUser(customerId, response.data.data.id, planId)

            return response
          })
          .then(response => {     
            getPaymentUrl(token, customerId, response.data.data.id)
          })
          .catch(error => {
            console.log('USER LOGIN ERROR: ', error.response);
            setErrors(error.response.data.errors)
            setIsLoading(false)
          }) 
    }

    const getPaymentUrl = (token, customerId, siteId) => {
        console.log(`https://app.${envUrl}.com/user/login?token=${token}&redirectUri=site/${siteId}/store`)
        axios({
            method: 'post',
            url: `https://hub.${envUrl}.com/v1/valitor/payment-requests`,
            data: {
                data: {
                    type: "payment-requests",
                    attributes: {
                        payment_type: "subscription",
                        plan_id: planId,
                        customer_id: customerId,
                        redirect_uri: `https://app.${envUrl}.com/user/login?token=${token}&redirectUri=site/${siteId}/store`,
                        customer: {
                            email: email,
                            // first_name: name,
                            last_name: "example",
                            address: "somewhere",
                            website: website
                        }
                    }
                }
            },
            headers: {Authorization: `Bearer ${token}`}
          })
          .then(response => {
            console.log('PAYMENT URL RESPONSE: ', response);
            setErrors()
            window.location.href = response.data.meta.url
          })
          .catch(error => {
            console.log('PAYMENT URL ERROR: ', error.response);
            setErrors(error.response.data.errors)
            setIsLoading(false)
          }) 
    }

    return (
        <div className="card card-visible">
    <div className="row start-xs">
        <div className={["col col-xs-12", VoucherFormStyles.depositButtons].join(' ')}>
            <p className={["text-bold", VoucherFormStyles.labelText].join(' ')}>Your budget</p>
            <div className="flex between-xs flex-wrap">
                <button className={["btn btn-large btn-select", planId === 1 ? VoucherFormStyles.active : null].join(' ')} onClick={() => setPlanId(1)}>$25</button>
                <button className={["btn btn-large btn-select", planId === 2 ? VoucherFormStyles.active : null].join(' ')} onClick={() => setPlanId(2)}>$50</button>

                <button className={["btn btn-large btn-select", VoucherFormStyles.mostUsed, planId === 3 ? VoucherFormStyles.active : null].join(' ')} onClick={() => setPlanId(3)}>$100{/*<span>Most used</span>*/}</button>
                <button className={["btn btn-large btn-select", planId === 4 ? VoucherFormStyles.active : null].join(' ')} onClick={() => setPlanId(4)}>$200</button>
            </div>
        </div>
        <div className="col col-xs-12">
            <div className="space-xs-up">
                <label className={["text-left", ].join(' ')}>
                    <span className={["text-bold", VoucherFormStyles.labelText].join(' ')}>Your website</span>
                    <div className={VoucherFormStyles.inputWebsite}>
                        <span className={['small text-darkgrey', VoucherFormStyles.prefix].join(' ')}>http://</span>
                        <input className="input-inline" type="text" placeholder="yourwebsite.com" name="website" value={website} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                    </div>
                </label>
            </div>
            {/* <div className="space-xs-up">
                <label className="text-left">
                    <span className={["text-bold", VoucherFormStyles.labelText].join(' ')}>Your name</span>
                    <input className="input-inline" type="text" name="name" value={name} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                </label>
            </div> */}
            <div className="space-xs-up">
                <label className="text-left">
                    <span className={["text-bold", VoucherFormStyles.labelText].join(' ')}>Your email</span>
                    <input className="input-inline" type="text" name="email" value={email} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                </label>
            </div>
        </div>
        { errors ? 
            <div className={["col col-xs-12 space-xs-up", VoucherFormStyles.errorTexts].join(' ')}>
                <p className="small text-left text-red">{errors.map((err, i) => (i < errors.length - 1 && errors.length > 1) ? `${err.detail} ` : err.detail || err.title)}</p> 
            </div>
        : null }
        <div className="col col-xs-12 ">
            <button 
                className={["btn btn-large space-xs-up", VoucherFormStyles.btn, isLoading ? VoucherFormStyles.btnSpinner : null]
                    .join(' ')} 
                onClick={handleSubmit} 
                disabled={/*isNameValid && */isEmailValid && isWebsiteValid && !isLoading ? false : true}>
                    <span className={VoucherFormStyles.submitText}>Get started</span>
                    <span className={VoucherFormStyles.spinner}></span>
            </button>
            <p className={["text-left", VoucherFormStyles.footnote].join(' ')}>{footnote}</p>
            
        </div>
        </div>
    </div>
    )
}

export default VoucherForm