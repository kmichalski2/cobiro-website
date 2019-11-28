import { Link } from "gatsby"
import React, { useState } from "react"

import VoucherStyles from "./voucher.module.scss"


const Voucher = ({ data }) => {
    const axios = require('axios');

    const [deposit, setDeposit] = useState(50)
    const [website, setWebsite] = useState('')
    const [isWebsiteValid, setIsWebsiteValid] = useState(false)
    const [name, setName] = useState('')
    const [isNameValid, setIsNameValid] = useState(false)
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const topColor = data.topGradiantColor ? data.topGradiantColor.hex : null
    const bottomColor = data.bottomGradiantColor ? data.bottomGradiantColor.hex : null

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

    const handleSubmit = () => {
        setIsLoading(true)

        let password = Math.random().toString(36).substring(1);

        axios({
            method: 'post',
            url: 'https://hub.test-cobiro.com/v1/register',
            data: {
                type: "users",
                attributes: {
                    email: email,
                    first_name: name,
                    last_name: "",
                    password: password
                }
            },
            headers: {'Content-Type': 'application/vnd.api+json'}
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          }) 
          .finally(function () {
            setIsLoading(false)
          });
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
                                    <button className={["btn btn-large btn-select", deposit === 10 ? VoucherStyles.active : null].join(' ')} onClick={() => setDeposit(10)}>$10</button>
                                    <button className={["btn btn-large btn-select", deposit === 25 ? VoucherStyles.active : null].join(' ')} onClick={() => setDeposit(25)}>$25</button>
                                </div>
                                <div>
                                    <button className={["btn btn-large btn-select", VoucherStyles.mostUsed, deposit === 50 ? VoucherStyles.active : null].join(' ')} onClick={() => setDeposit(50)}>$50<span>Most used</span></button>
                                    <button className={["btn btn-large btn-select", deposit === 100 ? VoucherStyles.active : null].join(' ')} onClick={() => setDeposit(100)}>$100</button>
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
                                {/* <div className={["space-xs-up flex space-between", VoucherStyles.inputInline].join(' ')}>
                                    <label className="text-left">
                                        <span className={["text-bold small", VoucherStyles.labelText].join(' ')}>Your name</span>
                                        <input className="input-inline" type="text" name="name" value={name} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                                    </label>
                                    <label className="text-left">
                                        <span className={["text-bold small", VoucherStyles.labelText].join(' ')}>Your email</span>
                                        <input className="input-inline" type="text" name="email" value={email} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                                    </label>
                                </div>  */}
                            </div>
                            <div className="col col-xs-12 flex top-xs top-sm start-xs flex-column-xs flex-row-sm">
                                <p className="small text-left">{data.footnote}</p>
    <button className={["btn btn-large", VoucherStyles.btn].join(' ')} onClick={handleSubmit} disabled={isNameValid && isEmailValid && isWebsiteValid ? false : true}>{ !isLoading ? 'Get started' : 'Loading'}</button>
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
