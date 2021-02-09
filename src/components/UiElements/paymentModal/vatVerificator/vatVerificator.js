import React, {useState} from 'react'

const axios = require('axios');


const VatVerificator = ({vatValidatedHandler}) => {

    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)

    const onSubmitHandler = () => {
        setLoading(true)

        axios.get(`https://vat.abstractapi.com/v1/validate?api_key=YOUR_API_KEY&vat_number=${value}`)
            .then((res) => {
                console.log('VAT RES', res)
                setLoading(false)
                setSuccess(true)
                setFailure(false)
                vatValidatedHandler(true)
            }).catch((err) => {
                console.log('VAT ERR', err)
                setLoading(false)
                setSuccess(false)
                setFailure(true)
                vatValidatedHandler(false)
            })   
        
        }

    return (
        <div className="flex">
            <form>
                <input type="text" value={value} onChange={event => setValue(event.target.value)}/>
            </form>
            <button className={[Classes.btn, success && Classes.success, failure && Classes.failure].join(' ')} onClick={() => onSubmitHandler()}>Submit</button>
        </div>
    )
}

export default VatVerificator