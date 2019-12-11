import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { navigate } from "gatsby"

import Layout from "../../components/layout/layout"
import SEO from "../../components/seo"
import SitesStyles from './sites.module.scss'

import Waves from "../../components/waves/waves"

import Map from './Map/Map'


const Sites = () => {
    const axios = require('axios');
    
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
            setAlert('')
            navigate(`/sites/${newUrl}`)
            setIsLoading(true)

            axios.get('https://pmp.cobiro.com/pmp/', {
                params: {
                    url: `http://www.${newUrl}`,
                    format: 'json'
                }
            })
            .then(function (response) {
                console.log(response);
                if(response.status === 200) {
                    setPageData(response.data)
                    console.log(response.data)
                } else {
                    setAlert('Error fetching data')
                    console.log('Error fetching data')
                }
            })
            .catch(function (error) {
                console.log('Error: ', error)
                setAlert('Error')
            })
            .finally(function () {
                setIsLoading(false)
            });  

            // fetch(`https://pmp.cobiro.com/pmp/?url=http://www.${newUrl}&format=json`, {
            //     method: 'GET'
            //   })
            //   .then((response) => {
            //     return response.json();
            //   })
            //   .then((response) => {
            //     if(response.status === 200) {
            //         setPageData(response.data)
            //         console.log(response.data)
            //     } else {
            //         setAlert('Error fetching data')
            //         console.log('Error fetching data')
            //     }
            //     setIsLoading(false)
            //   })
            //   .catch((error) => {
            //       console.log('Error: ', error)
            //       setAlert('Error')
            //   });
              
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
        <section className="section bg-lightblue" style={{backgroundImage: `linear-gradient(#004BD5, #62C9FF)`, position: 'relative', paddingBottom: 0, paddingTop: '7.5rem' }}>
            <div className="container text-white">
                <div className="row top-xs">
                <div className="col col-xs-12 col-lg-6" style={{marginTop: '5rem'}}>
                    <h1>Marketing Plan</h1>
                    <p className="text-white">All your marketing in one place. For free. Search for your site and get personal recommendations.</p>
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
                    {alert ? <h4 className=" space-xs-up">{pageData && pageData.attributes ? `Google Categories for ${submission}` : alert ? alert : null }</h4> : null }

                    {/* <div>{pageData ? <code className="text-left">{JSON.stringify(pageData)}</code> : null}</div> */}
                    {/* {submission ?
                    <a href={`http://${submission}`} className="btn btn-large">
                    {submission}
                    </a>
                    : null } */}
                </div>
                {/* {pageData || alert ?  */}
                <div className="col col-xs-12 col-lg-6" style={{zIndex: 5}}>
                    <div className={["card card-visible text-left", SitesStyles.card].join(' ')}>
                        <Map lat={55.687169} lng={12.591030}/>
                        
                        <div className={SitesStyles.cardText}>
                            <div>
                                <p className="text-bold no-mb">Address</p>
                                <p className="small">731 Utica Ave, Brooklyn, NY<br/>
                                11203, United States
                                </p>
                                <p className="text-bold no-mb">Phone</p>
                                <p  className="small">+45 34424234
                                </p>
                            </div>
                            <div>
                                <p className="text-bold no-mb">Address</p>
                                <p className="small">731 Utica Ave, Brooklyn, NY<br/>
                                11203, United States
                                </p>
                                <p className="text-bold no-mb">Phone</p>
                                <p className="small">+45 34424234
                                </p>
                            </div>
                         
                        </div>
                    </div>
                </div>
                {/* : null} */}
                </div>
            </div>  
            <Waves whiteSway transparentSways highWaveRight/>
        </section>
    </Layout>
    )
}

export default Sites
