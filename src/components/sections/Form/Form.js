import React from 'react'

const Form = ({ data }) => {

    return (
        <div>
            <h2>FOrm</h2>
        <form name={data.formName} method="post" data-netlify="true" data-netlify-honeypot="bot-field">
            <div>
                <label htmlFor="text">Email</label>
                <input type="text" name="text" id="text" />
            </div>
        </form>
        </div>
    )
}

export default Form