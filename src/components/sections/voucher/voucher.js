import React, { useState } from "react"

import VoucherStyles from "./voucher.module.scss"


const Voucher = ({ data }) => {
    const axios = require('axios');

    const [planId, setPlanId] = useState(3)
    const [website, setWebsite] = useState('')
    const [isWebsiteValid, setIsWebsiteValid] = useState(false)
    const [name, setName] = useState('')
    const [isNameValid, setIsNameValid] = useState(false)
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [errors, setErrors] = useState()
    const [isLoading, setIsLoading] = useState(false)


    const topColor = data.topGradiantColor ? data.topGradiantColor.hex : null
    const bottomColor = data.bottomGradiantColor ? data.bottomGradiantColor.hex : null

    const password = Math.random().toString(36).substring(1)


    const handleFocus = (event) => {
        event.target.classList.add(VoucherStyles.focus)
    }
    const handleBlur = (event) => {
        if((!event.target.value && !event.target.classList.contains(VoucherStyles.invalid))) {
            event.target.classList.add(VoucherStyles.invalid)
        }
        event.target.classList.remove(VoucherStyles.focus)
    }

    const handleChange = (event) => {
        if(event.target.name === 'name') {
            setName(event.target.value)
            handleChangeName(event)
        } else if(event.target.name === 'email') {
            setEmail(event.target.value)
            handleChangeEmail(event)
        } else if(event.target.name === 'website') {
            setWebsite(event.target.value)
            handleChangeWebsite(event)
        }
    }

    const handleChangeName = (event) => {
        if(event.target.value && event.target.classList.contains(VoucherStyles.invalid)) {
            event.target.classList.remove(VoucherStyles.invalid)
            setIsNameValid(true)
        } else if(event.target.value) {
            setIsNameValid(true)  
        } else if(!event.target.value) {
            setIsNameValid(false)
        }
    }

    const handleChangeEmail = (event) => {
        const email = event.target.value
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
        if(email.match(re)) {
            event.target.classList.remove(VoucherStyles.invalid)
            setIsEmailValid(true)
        } else {
            event.target.classList.add(VoucherStyles.invalid)
            setIsEmailValid(false)
        }   
    }

    const handleChangeWebsite = (event) => {
        const url = event.target.value
        if(url && validateUrl(url)) {
            setIsWebsiteValid(true)
            event.target.classList.remove(VoucherStyles.invalid)
        } else {
            setIsWebsiteValid(false)
            event.target.classList.add(VoucherStyles.invalid)
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

    const handleSubmit = async () => {
        setErrors()
        setIsLoading(true)

        await registerUser();
    }


    const registerUser = async () => {
        await axios({
            method: 'post',
            url: 'https://hub.test-cobiro.com/v1/register',
            data: {
                data: {
                    type: "users",
                    attributes: {
                        email: email,
                        first_name: name,
                        last_name: "lastname",
                        password: password
                    }
                }
            },
            headers: {"Content-Type": "application/vnd.api+json"}
          })
          .then(response => {
            console.log(response);
            setErrors()
            // setUserId(response.data.data.id)
            loginUser(response.data.data.id)
          })
          .catch(error => {
            console.log(error.response);
            setErrors(error.response.data.errors)
            setIsLoading(false)
          }) 
    }

    const loginUser = async (customerId) => {
        await axios({
            method: 'post',
            url: 'https://hub.test-cobiro.com/v1/login',
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
            console.log(response);
            setErrors()
            // setAccessToken(response.data.data.attributes.access_token)
            // setRefreshToken(response.data.data.attributes.refresh_token)
            getPaymentUrl(response.data.data.attributes.access_token, customerId)
          })
          .catch(error => {
            console.log('Error: ', error.response);
            setErrors(error.response.data.errors)
            setIsLoading(false)
          }) 
    }

    const getPaymentUrl = async (token, customerId) => {
        await axios({
            method: 'post',
            url: 'https://hub.test-cobiro.com/v1/valitor/payment-requests',
            data: {
                data: {
                    type: "payment-requests",
                    attributes: {
                        payment_type: "subscription",
                        plan_id: planId,
                        customer_id: customerId,
                        customer: {
                            email: email,
                            first_name: name,
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
            console.log(response);
            setErrors()
            window.location.href = response.data.meta.url
          })
          .catch(error => {
            console.log(error.response);
            setErrors(error.response.data.errors)
            setIsLoading(false)
          }) 
    }


    const transparentSways = (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" x="0" y="0" viewBox="0 0 1920.28 259.65" className={VoucherStyles.whiteSways}>
        <g>
            <path data-name="Path 4909" className="cls-1" d="M0,181.54c230.83,28.07,530,27.7,759.25-1,130.46-16.31,237.69-40.75,371.12-55.86C1383.67,96,1718.66,107.54,1920,151.86l.28,107.42L0,259.19Z" fill="#fff" opacity="0.1"/>
            <path data-name="Path 4978" className="cls-1" d="M0,139.81c230.83,54.1,530,53.4,759.25-1.87C889.71,106.5,996.94,59.41,1130.37,30.28,1383.67-25,1718.66-2.82,1920,82.61l.28,177H0Z" fill="#fff" opacity="0.1"/>
        </g></svg>
    )

    const whiteSway = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 150" preserveAspectRatio="xMidYMid slice" x="0" y="0" className={[VoucherStyles.whiteSways, VoucherStyles.whiteSway].join(' ')}><g data-name="Lag 2"><g data-name="Lag 1"><path data-name="Path 4929" d="M0,72.55c230.83,28.07,530,27.7,759.25-1C889.71,55.23,996.94,30.8,1130.37,15.69,1383.67-13,1718.66-1.45,1920,42.87V150H0Z" fill="#fff"/></g></g></svg>
    )

    return (
        <section className={[VoucherStyles.section, data.backgroundColor ? VoucherStyles.withBg : null, "section"].join(' ')} style={{backgroundImage: data.backgroundColor ? `linear-gradient(${topColor}, ${bottomColor})` : null}}>
        { data.backgroundColor ? whiteSway : null }
        <div className={[data.backgroundColor ? "bg-sway-inner" : null, "section-inner"].join(' ')} style={{ position: "relative", zIndex: 1 }}>
            <div className="container">
                <div className="row center-xs text-center">
                    <div className="col col-xs-12 space-big">
                        { data.title ? <h2 className={data.backgroundColor ? 'text-white' : null}>{data.title}</h2> : null }
                        { data.text ? <div className={data.backgroundColor ? VoucherStyles.textWhite : null} dangerouslySetInnerHTML={{__html: data.text}}></div> : null }
                    </div>
                    
                    <div className="col col-xs-12 col-lg-6 space-big">
                        <div className="card card-visible">
                            <div className="row start-xs">
                            <div className={["col col-xs-12", VoucherStyles.depositButtons].join(' ')}>
                                <p className={["text-bold", VoucherStyles.labelText].join(' ')}>Select budget</p>
                                <div>
                                    <button className={["btn btn-large btn-select", planId === 1 ? VoucherStyles.active : null].join(' ')} onClick={() => setPlanId(1)}>$10</button>
                                    <button className={["btn btn-large btn-select", planId === 2 ? VoucherStyles.active : null].join(' ')} onClick={() => setPlanId(2)}>$25</button>
                                </div>
                                <div>
                                    <button className={["btn btn-large btn-select", VoucherStyles.mostUsed, planId === 3 ? VoucherStyles.active : null].join(' ')} onClick={() => setPlanId(3)}>$50<span>Most used</span></button>
                                    <button className={["btn btn-large btn-select", planId === 4 ? VoucherStyles.active : null].join(' ')} onClick={() => setPlanId(4)}>$100</button>
                                </div>
                            </div>
                            <div className="col col-xs-12">
                                <div className="space-xs-up">
                                    <label className={["text-left", ].join(' ')}>
                                        <span className={["text-bold small", VoucherStyles.labelText].join(' ')}>Your website</span>
                                        <div className={VoucherStyles.inputWebsite}>
                                            <span className={['small text-darkgrey', VoucherStyles.prefix].join(' ')}>http://</span>
                                            <input className="input-inline" type="text" placeholder="yourwebsite.com" name="website" value={website} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                                        </div>
                                    </label>
                                </div>
                                <div className="space-xs-up">
                                    <label className="text-left">
                                        <span className={["text-bold small", VoucherStyles.labelText].join(' ')}>Your name</span>
                                        <input className="input-inline" type="text" name="name" value={name} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                                    </label>
                                </div>
                                <div className="space-xs-up">
                                    <label className="text-left">
                                        <span className={["text-bold small", VoucherStyles.labelText].join(' ')}>Your email</span>
                                        <input className="input-inline" type="text" name="email" value={email} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                                    </label>
                                </div>
                            </div>
                            { errors ? 
                                <div className={["col col-xs-12 space-xs-up", VoucherStyles.errorTexts].join(' ')}>
                                    <p className="small text-left text-red">{errors.map((err, i) => (i < errors.length - 1 && errors.length > 1) ? `${err.detail} ` : err.detail || err.title)}</p> 
                                </div>
                            : null }
                            <div className="col col-xs-12 flex top-xs top-sm start-xs flex-column-xs flex-row-sm">
                                
                                <p className="small text-left">{data.footnote}</p>
                                <button 
                                    className={["btn btn-large", VoucherStyles.btn, isLoading ? VoucherStyles.btnSpinner : null]
                                        .join(' ')} 
                                    onClick={handleSubmit} 
                                    disabled={isNameValid && isEmailValid && isWebsiteValid && !isLoading ? false : true}>
                                        <span className={VoucherStyles.submitText}>Get started</span>
                                        <span className={VoucherStyles.spinner}></span>
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        { data.backgroundColor ? transparentSways : null }
        </section>
    )
}

export default Voucher
