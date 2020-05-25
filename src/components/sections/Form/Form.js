import React, { useState, useEffect } from 'react'
import Classes from './form.module.scss'
import AnyLink from '../../UiElements/AnyLink/AnyLink';

const Form = ({ data }) => {
    const axios = require('axios');

    const createMarkup = (text)  => {
        return {__html: text}
    }

    const formPlacement = data.formPlacement
    const form = data.form

    console.log(form.formFields)

    let emptySubmission = {}
        form.formFields.map(f => {
            if(f.internal.type === 'DatoCmsCheckbox') {
                console.log('SETTINGS CHECKBOXES')
                
                f.checkboxes.map(c => { emptySubmission = {...emptySubmission, [c]: "false"}})
                console.log('CHECKBOXES: ', emptySubmission)
                console.log({...submission, ...emptySubmission })
                
            } else {
                emptySubmission = {...emptySubmission, [f.name]: ""}
            }
        })

    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [checkboxes, setCheckboxes] = useState({})
    const [submission, setSubmission] = useState(emptySubmission)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState()

    useEffect(() => {
        let initErrors = {}
        let initCheckboxes
        form.formFields.map(f => {
            
            if(f.required) {
                if(f.internal.type === 'DatoCmsCheckbox') {
                    initCheckboxes = {...initCheckboxes, [f.name]: {count: 0, max: f.maximumSelection, min: f.minimumSelection}}
                    
                } else {
                    initErrors = {...initErrors, [f.name]: `Please enter a value`}
                }
            }

            

            
            
        })
        if(initErrors) {
            setErrors({...errors, ...initErrors})
        }
        if(initCheckboxes) {
            setCheckboxes({...checkboxes, ...initCheckboxes})
        }

        
    }, [data])

    // useEffect(() => {
    //     let emptySubmission = {}
    //     form.formFields.map(f => {
    //         if(f.internal.type === 'DatoCmsCheckbox') {
    //             console.log('SETTINGS CHECKBOXES')
                
    //             f.checkboxes.map(c => { emptySubmission = {...emptySubmission, [c]: "false"}})
    //             console.log('CHECKBOXES: ', emptySubmission)
    //             console.log({...submission, ...emptySubmission })
                
    //         } else {
    //             emptySubmission = {...emptySubmission, [f.name]: ""}
    //         }
    //     })
    //     setSubmission(emptySubmission)
    // },[form])

    useEffect(() => {

        console.log(submission)
    }, [submission])

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    const handleChange = (e, value) => {
        
        

        if(e.target.type !== 'checkbox' && e.target.type !== 'radio') {
            setTouched({...touched, [e.target.name]: "yes"})
            setSubmission({...submission, [e.target.name]: e.target.value})
        }else if(e.target.type === 'radio') {
            setTouched({...touched, [e.target.name]: e.target.value})
            setSubmission({...submission, [e.target.name]: value})
        } else{
            setTouched({...touched, [e.target.name.split('-')[0]]: "yes"})
            setSubmission({...submission, [e.target.name]: e.target.checked === true ? "true" : "false"})
        }

        if(e.target.required && !e.target.value && !errors[e.target.name] && e.target.type !== 'checkbox') {
            setErrors({...errors, [e.target.name]: `Please enter a value`})
        }
        
        if(e.target.required && e.target.value && errors[e.target.name]) {
            const newErrors = {...errors}
            delete newErrors[e.target.name]
            setErrors(newErrors)
        }


        switch(e.target.type) {
            case 'checkbox':
                if(e.target.required) {

                    const name = e.target.name.split('-')[0]
                    
                    const newCheckboxes = {...checkboxes, [name]: {...checkboxes[name], count: e.target.checked ? checkboxes[name].count + 1 : checkboxes[name].count - 1}}

                    const checkbox = newCheckboxes[name]
                    
                    setCheckboxes(newCheckboxes)

                    if(checkbox && ( checkbox.count <= checkbox.max ) && checkbox.count >= checkbox.min) {
                        if(errors[name]) {
                            const newErrors = {...errors}
                            delete newErrors[name]
                            setErrors(newErrors)
                        }
                    } else {
                        setErrors({...errors, [name]: `Please select between ${checkbox.min} and ${checkbox.max}`})
                    }
                }
                return
            
            case 'email':
                const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
                if(e.target.value.match(re)) {
                    const newErrors = {...errors}
                    delete newErrors[e.target.name]
                    setErrors(newErrors)
                } else {
                    if(e.target.required) {
                        setErrors({...errors, [e.target.name]: 'Please enter a valid email'})
                    }
                }
                return
            default:
                return
            
        }

    }

    const submitHandler = (e) => {
        e.preventDefault()

        console.log(submission)
        setSubmitting(true)
        
        axios.post(`/.netlify/functions/submit`, { endpoint: data.formEndpoint, data: submission})
            .then(function (response) {
                console.log(response);
                // if(response.status === 200) {
                //     setPageData(response.data.data)
                //     console.log(response.data.data)
                // } else {
                //     setAlert('Error fetching data')
                //     console.log('Error fetching data')
                // }
                setSubmitting(false)
                if(response.status === 200) {
                    setSubmitted(true)
                } else {
                    setSubmitError('An error occured. Please check your submission and try again.')
                }
            })
            .catch(function (error) {
                console.log('Error: ', error.response)
                console.log('Error: ', error)
            })
    }

    

    const textMarkup = (
        <div className={["first-xs col col-xs-12 col-md-10 col-lg-6 space-xs-up", formPlacement === 'left' ? "last-lg" : null, formPlacement === 'center' || !formPlacement ? "text-center" : null].join(' ')}>
            <h2>{data.title}</h2>
            <div className="space-xs-up" dangerouslySetInnerHTML={createMarkup(data.text)}></div> 
        </div>
    )
    const formMarkup = (
    <div className={["col col-xs-12 col-md-10", formPlacement === 'center' || !formPlacement ? "col-xl-8" : "col-lg-6"].join(' ')}>
            <div className="card card-visible text-left">
                {/* <form name={form.formName} method="post" action={`/${form.succesPage.slug}`} data-netlify="true" data-netlify-honeypot="bot-field"> */}
                <form name={form.formName}>
                {/* <input type="hidden" name="form-name" value={form.formName} /> */}
                <p className="hidden">
                    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
                </p>
                    {form.formFields.map((f, i) =>
                        
                        <div key={i} className={[Classes.formFields, errors && errors[f.name] ? Classes.error : null, touched && touched[f.name] ? Classes.touched : null].join(' ')}>
                            {f.internal.type !== 'DatoCmsCheckbox' && f.internal.type !== 'DatoCmsRadioButtonField' ? 
                            <label className={Classes.label} htmlFor={f.name}>{f.label}{f.required ? <span className={Classes.required}> *</span> : null}</label>
                            : 
                            <p className={Classes.label}>{f.label}{f.required ? <span className={Classes.required}> *</span> : null}</p>
                            }
                            {f.helpText ? 
                                <div className={Classes.helpText} dangerouslySetInnerHTML={createMarkup(f.helpText)}></div> 
                            : null }

                            { f.internal.type === 'DatoCmsTextField' || f.internal.type === 'DatoCmsEmailField' || f.internal.type === 'DatoCmsNumberField' ?

                                <input 
                                    type={f.internal.type.replace('DatoCms', '').replace('Field', '')} 
                                    id={f.name} 
                                    name={f.name} 
                                    placeholder={f.placeholder} 
                                    required={f.required || false} 
                                    onChange={handleChange}
                                    value={submission[f.name]}
                                />

                            : f.internal.type === 'DatoCmsTextareaField' ?

                                <textarea type="textarea" 
                                    id={f.name} 
                                    name={f.name} 
                                    placeholder={f.placeholder} 
                                    required={f.required || false} 
                                    onChange={handleChange}
                                    value={submission[f.name]}
                                >
                                </textarea>

                            : f.internal.type === 'DatoCmsCheckbox' ?

                                f.checkboxes.map((b, i) =>
                                    <div key={i} >
                                        <input 
                                            type="checkbox" 
                                            id={`${f.name}-${i}`} 
                                            name={b} 
                                            required={f.required || false} 
                                            onChange={handleChange}
                                            value={submission[b]}
                                        />
                                        <label htmlFor={`${f.name}-${i}`}>
                                            {b}
                                        </label>
                                    </div>
                                )
                                
                            : f.internal.type === 'DatoCmsSelectField' ?

                                <select 
                                    type="select" 
                                    id={f.name} 
                                    name={f.name} 
                                    placeholder={f.placeholder} 
                                    required={f.required} 
                                    onChange={handleChange}
                                    value={submission[f.name]}
                                >

                                    <option value="">
                                        {f.placeholder}
                                    </option>

                                    {f.options.map((o, i) => 
                                        <option key={i} value={o}>
                                            {o}
                                        </option>
                                    )}

                                </select>

                            : f.internal.type === 'DatoCmsRadioButtonField' ?

                                f.radioButtons.map((b, i) => 
                                <div key={i} className={Classes.radio}>
                                    <label >
                                    <input 
                                        
                                        type="radio" 
                                        id={`${f.name}-${i}`} 
                                        name={f.name} 
                                        value={b} 
                                        required={f.required || false} 
                                        onChange={(e) => handleChange(e, b)}
                                        value={submission[f.name]}
                                    />
                                    
                                        {b}
                                    </label>
                                </div>
                                )
                            : null }
                        {errors[f.name] && touched[f.name] ? <p className={["text-red small", Classes.errorText].join(' ')}>{errors[f.name]}</p> : null}
                        </div>
                    )}
                    <AnyLink button large callBack={submitHandler} title={form.submitTitle} disabled={!isEmpty(errors) ? true : false} submitted={submitted} submitting={submitting} submitError={submitError} />
                    {submitError && <p className={Classes.submitError}>{submitError}</p>}
                    {/* <button className={["btn btn-large", Classes.btn].join(' ')} onClick={(e) => submitHandler(e)} disabled={!isEmpty(errors) ? true : false}>{form.submitTitle}</button> */}
                </form>
            </div>
        </div>
    )
    return (
        <section className="section">
            <div className="container">
                <div className="row middle-xs center-xs">
                    {formPlacement === 'right' || formPlacement === 'center' || !formPlacement ? textMarkup : formMarkup}
                    {
                    formPlacement === 'right' ? formMarkup 
                    : formPlacement === 'left' ? textMarkup
                    : null
                    }
                </div>
                {formPlacement === 'center' || !formPlacement ?
                <div className="row middle-xs center-xs">
                    {formMarkup}
                </div>   
                : null }
            </div>
        </section>
    )
}

export default Form