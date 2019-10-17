import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { navigate } from "gatsby"

import Layout from "../../components/layout/layout"
import SEO from "../../components/seo"
import SitesStyles from './sites.module.scss'

const Sites = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [urlInputted, setUrlInputted] = useState('');
    const [submission, setSubmission] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [alert, setAlert] = useState('')
    const [isValidUrl, setIsValidUrl] = useState(false)
    const [pageData, setPageData] = useState()
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => { 
        if(!isLoaded) {
            const url = window.location.href.split('/sites/').pop()
            setIsLoaded(true)
            setUrlInputted(url)
            submit(url)
        }
    }, [isLoaded])

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
            setIsEditing(false)
            setIsValidUrl(true)
            const newUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
            setPageData(null)
            setSubmission(newUrl)
            // setAlert('')
            navigate(`/sites/${newUrl}`)
            setIsLoading(true)
            fetch(`/.netlify/functions/sites?url=${newUrl}`, {
                method: 'POST'
              })
              .then((response) => {
                return response.json();
              })
              .then((response) => {
                if(response.status === 200) {
                    setPageData(response.data)
                } else {
                    setAlert('Error fetching data')
                    console.log('Error fetching data')
                }
                setIsLoading(false)
              })
              .catch((error) => {
                  console.log('Error: ', error)
                  setAlert('Error')
              });
              
        } else {
            // setAlert('The url you typed is not valid')
            setSubmission('')
            navigate('/sites/')
        }
    }

    const handleChange = (event) => {
        setIsEditing(true)   
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
        <section className="section bg-lightblue">
            <div className="container">
                <div className="row ">
                <div className="col col-xs-12 col-md-6">
                    <h1>Marketing Plan</h1>
                    <p>All your marketing in one place. For free. Search for your site and get personal recommendations.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex">
                            <label className="no-mb">
                                <input className="input-inline" type="text"  placeholder="Analyze any website" onChange={handleChange} value={urlInputted}/>
                            </label>
                            {/* <input className="btn btn-submit-inline" type="submit" value={isLoading ? 'Loading' : 'Search'} onChange={handleChange} disabled={isValidUrl ? null : true}/> */}

                            <button className={[SitesStyles.button, isLoading ? SitesStyles.searching : pageData && !isEditing ? SitesStyles.searched : null, "btn"].join(' ')} disabled={isValidUrl ? null : true}>
                                <span>Submit</span>
                                <span className={SitesStyles.spinner}></span>
                                <svg className={SitesStyles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path className={SitesStyles.checkmark} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                            </button>
                            
                        </div>
                    </form>

                    {/* <div>{pageData ? <code className="text-left">{JSON.stringify(pageData)}</code> : null}</div> */}
                    {/* {submission ?
                    <a href={`http://${submission}`} className="btn btn-large">
                    {submission}
                    </a>
                    : null } */}
                </div>
                {pageData || alert ? 
                <div className="col col-xs-12 col-md-6">
                    <div className={["card card-visible text-left", SitesStyles.card].join(' ')}>
                        <h4 className=" space-xs-up">{pageData && pageData.attributes ? `Google Categories for ${submission}` : alert ? alert : 'nothing' }</h4>
                        <ul className="text-left-xs price-list list-unstyled">
                        {pageData && pageData.attributes ? 
                            pageData.attributes.google_categories.map((item, i) => (
                                <li key={i}>{item.google_category}</li>
                            ))
                        : null}   
                        </ul>
                    </div>
                </div>
                : null}
                </div>
            </div>  
        </section>
    </Layout>
    )
}

export default Sites
