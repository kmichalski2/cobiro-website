import React, { useState } from 'react'
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';
import Classes from './emailVerificator.module.scss'

const EmailVerificator = ({submitSuccess, submitting, setSubmitting, handleEmailVerificationSubmit}) => {

    // const CODE_LENGTH = new Array(5).fill("");

    // const [value, setValue] = useState({
    //     0: "1",
    //     1: "2",
    //     2: "3",
    //     3: "4",
    //     4: "5",
    // })

    const [value, setValue] = useState('')
    // const [submitSuccess, setSubmitSuccess] = useState(false)
    // const [submitting, setSubmitting] = useState(false)

    const valueValidator = (val) => {

        const regex = /^[0-9]+$/
        const valid = regex.test(val)
        console.log('val.test(regex)', valid)

        if(valid) {
            return true
        } else {
            return false
        }

    }
    // const onChangeHandler = (e, index) => {
    //     const val = e.target.value
    //     const regex = "^[0-9]+$";
    //     if(val.match(regex) || val === '') {
    //         let newVal = value
    //         newVal[index] = e.target.value
    //         setValue(newVal)
    //         console.log(index, e.target.value, value[index], value)
    //     }
    // }

    const onChangeHandler = (e) => {
        const val = e.target.value

        if((valueValidator(val) || val === '') && val.length < 6) {
            let newVal = value
            newVal = e.target.value
            setValue(newVal)
            console.log(e.target.value, value, value)
        }
    }

    const handleOnSubmit = () => {
        setSubmitting(true)
        handleEmailVerificationSubmit(value)
    }

    return (
        <>
        
        <form className="space-xs-up">
            <div className={Classes.wrap}>
            <div>
                <label className="sr-only" htmlFor={`verifaction`}>{`Verifaction code`}</label>
                <input id={`verifaction`} className={Classes.input} type="text" name={`verifaction`} value={value} onChange={(e) => onChangeHandler(e)}/>
            </div>
            {/* {CODE_LENGTH.map((v, index) => {
                return (
                    <div key={index}>
                        <label className="sr-only" htmlFor={`verifaction_${index}`}>{`Verifaction code ${index}`}</label>
                        <input id={`verifaction_${index}`} className={Classes.input} type="text" name={`verifaction_${index}`} value={value[index]} onChange={(e) => onChangeHandler(e, index)}/>
                    </div>
                )
            })} */}
            </div>
        </form>
        <p className="text-center">Enter the verification code we sent to your email</p>
        <button 
            className={["btn btn-full-width", submitSuccess ? Classes.successBtn : null].join(' ')} 
            onClick={handleOnSubmit} 
            disabled={!value || !valueValidator(value) || value.length < 5} >
            <span>
                {submitting ? 
                    <LoadingSpinner loading={submitting}>
                        Loading
                    </LoadingSpinner> 
                    : 'Submit'
                }
            </span>
        </button>
        </>
    )
}

export default EmailVerificator