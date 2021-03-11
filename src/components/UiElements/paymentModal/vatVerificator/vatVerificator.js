import React, {useState} from 'react'
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';

import * as Classes from './vatVerificator.module.scss'

const axios = require('axios');


const VatVerificator = ({vatValidatedHandler}) => {

    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [succes, setSucces] = useState(false)
    const [failure, setFailure] = useState(false)
    const [showValidator, setShowValidator] = useState(false)

    const onSubmitHandler = () => {
        setLoading(true)

        const validHandler = () => {
            setLoading(false)
            setSucces(true)
            setFailure(false)
            vatValidatedHandler(true)
        }

        const inValidHandler = () => {
            setLoading(false)
            setSucces(false)
            setFailure(true)
            vatValidatedHandler(false)
        }

        axios.get(`${process.env.GATSBY_HUB_URL}/v1/subscriptions/payments/vats/validate?vat_number=${value}`)
            .then((res) => {
                if(res.data.data.attributes.valid) {
                    validHandler()
                } else {
                    inValidHandler()
                }
            }).catch((err) => {
                inValidHandler()
            })   
        
        }

    return (
        <>
        <button className={["btn btn-text small space-small-xs-up", Classes.VATBtn].join(' ')} onClick={setShowValidator}>Enter VAT number</button>
        {showValidator ?
        <div className="flex between-xs middle-xs">
            <form className={Classes.form}>
                <input className={Classes.input} type="text" value={value} onChange={event => setValue(event.target.value)}/>
                <div className={[succes ? Classes.succes : null, failure ? Classes.failure : null].join(' ')}></div>
            </form>
            <button className={[Classes.btn, 'btn btn-small'].join(' ')} onClick={() => onSubmitHandler()}>
                <span className={loading ? Classes.submitLoading : null}>Submit</span>
                    <span className={Classes.Spinner}><LoadingSpinner loading={loading}/></span>

            </button>
        </div>
        : null}
        </>
    )
}

export default VatVerificator