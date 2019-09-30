import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { navigate } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"

const Sites = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [urlInputted, setUrlInputted] = useState('');
    const [submission, setSubmission] = useState('');
    const [alert, setAlert] = useState('')
    const [isValidUrl, setIsValidUrl] = useState(false)
    const [pageData, setPageData] = useState({})

    useEffect(() => { 
        if(!isLoaded) {
            const url = window.location.href.split('/sites/').pop()
            setIsLoaded(true)
            submit(url)
        }
    }, [isLoaded])

    useEffect(() => { 
        console.log(pageData)
    }, [pageData])

    const validateUrl = (url) => {
        const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
        if(url.match(re)) {
            return true
        } else {
            return false
        }
    }

    const submit = (url) => {
        if(validateUrl(url)) {
            const newUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
            setSubmission(newUrl)
            setAlert('')
            navigate(`/sites/${newUrl}`)

            fetch(`/.netlify/lambda/sites?url=${newUrl}`, {
                method: 'POST'
              })
              .then((response) => {
                return response.json();
              })
              .then((response) => {
                // console.log('DATA from Functions: ', data)
                setPageData(response.data)
              })
              .catch((error) => console.log('ERROR fetching data: ', error));
              
        } else {
            setAlert('The url you typed is not valid')
            setSubmission('')
            navigate('/sites/')
        }
    }

    const handleChange = (event) => {   
        setUrlInputted(event.target.value);  
        if(validateUrl(event.target.value)) {
            setIsValidUrl(true)
        } else {
            setIsValidUrl(false)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submit(urlInputted)
    }
    
    return (
    <Layout>
        <SEO title={submission ? `Cobiro Marketing Hub || ${submission}` : 'Cobiro Marketing Hub'} />
        <section className="section">
            <div className="container">
                <div className="row center-xs">
                <div className="col col-xs-12 col-sm-6 text-center">
                    <form onSubmit={handleSubmit}>
                        <div className="flex center-xs">
                            <label className="no-mb">
                                <span className="hidden">Website:</span>
                                <input className="input-inline" type="text" onChange={handleChange} value={urlInputted}/>
                            </label>
                            <input className="btn btn-submit-inline" type="submit" value="Submit" onChange={handleChange} disabled={isValidUrl ? null : true}/>
                        </div>
                    </form>

                    {pageData ? <h1>{pageData.title}</h1> : null}
                    <p>{alert ? alert : "This is the page you are looking for."}</p>
                    {submission ?
                    <a href={`http://${submission}`} className="btn btn-large">
                    {submission}
                    </a>
                    : null }
                </div>
                </div>
            </div>  
        </section>
    </Layout>
    )
}

export default Sites
