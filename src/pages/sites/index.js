import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { navigate } from "gatsby"

import Layout from "../../components/layout/layout"
import SEO from "../../components/seo"
import SitesStyles from './sites.module.scss'

import Waves from "../../components/waves/waves"
import Map from '../../components/pmp/Map/Map'
import SetupComparison from '../../components/pmp/SetupComparison/SetupComparison'
import Services from "../../components/pmp/Services/Services"
import SearchMarketingAd from '../../components/pmp/SearchMarketingAd/SearchMarketingAd'
import SearchMarketing from '../../components/pmp/SearchMarketing/Searchmarketing'
import Competitors from '../../components/pmp/Competitors/Competitors'
import JumboCta from "../../components/sections/jumboCta/jumboCta"
import Ads from "../../components/pmp/Ads/Ads"
import GoogleMyBusiness from "../../components/pmp/GoogleMyBusiness/GoogleMyBusiness"
import GiftCardSection from "../../components/pmp/GiftCardSection/GiftCardSection"

const Sites = (props) => {
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

    useEffect(() => { 
        if(props.location.pathname === '/sites/') {
            setPageData(null)
        }
    })

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

            axios.post(`/.netlify/functions/sites?url=${newUrl}`)
            .then(function (response) {
                console.log(response);
                if(response.status === 200) {
                    setPageData(response.data.data)
                    console.log(response.data.data)
                } else {
                    setAlert('Error fetching data')
                    console.log('Error fetching data')
                }
            })
            .catch(function (error) {
                console.log('Error: ', error.response)
                console.log('Error: ', error)
            })
            .finally(function () {
                setIsLoading(false)
            });  
              
        } else {
            setSubmission('')
            navigate('/sites/')
            setAlert('The url you typed is not valid')
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

    let openingHours = []
    const openingHoursObj = pageData ? pageData.attributes.opening_hours : null
    if(pageData && openingHoursObj) {
        for (let day in openingHoursObj){
            if(openingHoursObj.hasOwnProperty(day)){
                openingHours.push({day: day, hour: openingHoursObj[day]})
            }
         }
    }
     
    return (
    <Layout>
        <SEO title={submission ? `Cobiro Marketing Hub || ${submission}` : 'Cobiro Marketing Hub'} />
        <section className="section bg-lightblue" style={{backgroundImage: `linear-gradient(#004BD5, #62C9FF)`, position: 'relative', paddingBottom: 0, paddingTop: '7.5rem' }}>
            <div className="container text-white ">
                <div className="row top-xs center-xs">
                <div className={[SitesStyles.headerText, !pageData ? "col col-xs-12 col-md-8 col-lg-6 text-center center-xs center-sm center-md space-xs-up" : "col col-xs-12 col-lg-6 space-xs-up text-center-xs text-left-lg"].join(' ')}>
                    {pageData ?
                    <div className={SitesStyles.siteImages}>
                        <img className={SitesStyles.desktop} src={pageData.page_speed[0].desktop.screenshot} />
                        <img className={SitesStyles.mobile} src={pageData.page_speed[1].mobile.screenshot} />
                    </div>
                    : null }
                    <h1 className={"text-white "}>{ pageData ? pageData.id.charAt(0).toUpperCase() + pageData.id.slice(1) : 'Marketing Plan'}</h1>
                    <p className="text-white">{ pageData ? `${pageData.id.charAt(0).toUpperCase() + pageData.id.slice(1)}: ${pageData.attributes.category.replace('/', '').split('/').join(', ')}` : 'All your marketing in one place. For free. Search for your site and get personal recommendations.'}</p>
                    {!pageData ?
                    <>
                    <form onSubmit={handleSubmit}>
                        <div className="flex">
                            <label className={["no-mb", SitesStyles.label].join(' ')}>
                                <input className="input-inline" type="text"  placeholder="Analyze any website" onChange={handleChange} value={urlInputted}/>
                            </label>

                            <button className={[SitesStyles.button, isLoading ? SitesStyles.searching : pageData && !isEditing ? SitesStyles.searched : null, "btn btn-secondary btn-secondary-white"].join(' ')} disabled={isValidUrl ? null : true}>
                                <span>Submit</span>
                                <span className={SitesStyles.spinner}></span>
                                <svg className={SitesStyles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path className={SitesStyles.checkmark} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                            </button>
                        </div>
                    </form>
                    {alert ? <p className="text-white space-xs-up small">{alert}. Did you type the correct url?</p> : null }
                    {isLoading ? <p className="text-white space-xs-up small">This may take a while. Please be patient.</p> : null }
                    </>
                    : null }
                
                </div>
                {pageData ? 
                <div className="col col-xs-12 col-lg-6" style={{zIndex: 5}}>
                    <div className={["card card-visible text-left", SitesStyles.card].join(' ')}>
                        <Map lat={55.687169} lng={12.591030} customLook={true}/>
                        
                        <div className={SitesStyles.cardText}>
                            <div className="space-xs space-sm">
                                {pageData && (pageData.attributes.address.street || pageData.attributes.address.city) ? 
                                <>
                                <p className="text-bold">Address</p>
                                <p className="small text-lightblack">
                                    {pageData.attributes.address.street ? pageData.attributes.address.street : null }<br/>
                                    {pageData.attributes.address.city ? pageData.attributes.address.city : null}
                                </p>
                                </>
                                : null }
                                {pageData && pageData.attributes.phone_number ? 
                                <>
                                    <p className="text-bold">Phone</p>
                                    <p  className="small text-lightblack">{pageData.attributes.phone_number}</p>
                                </>
                                : null }
                            </div>
                            <div>
                                {pageData && openingHours.length > 0 ? 
                                <>
                                <p className="text-bold">Opening hours</p>    
                                {openingHours.map((day, i) => 
                                <div key={i} className={["flex between-xs", SitesStyles.openingHours].join(' ')}>
                                    <p className="small text-lightblack">{day.day}:</p>
                                    <p className="small text-lightblack">{day.hour}</p>      
                                </div>
                                )}
                                </>
                                : null}
    
                            </div>
                         
                        </div>
                    </div>
                </div>
                : null }
                </div>
            </div>  
            <Waves whiteSway transparentSways highWaveRight/>
        </section>
        {pageData ? <SetupComparison pageSpeed={pageData.page_speed[0].desktop.performance.score * 100} /> : null}
        <Services />
        {pageData ?  <SearchMarketingAd searchTerm={pageData.google_search_ads[0].top_keywords.split(' ')[0]} title="Google Search Marketing" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum" linkText="See more" link="/" domain={pageData.attributes.url} ads={pageData.google_search_ads[1].ad_template}  backgroundColor /> : null }
        {pageData ? <SearchMarketing keywords={pageData.google_search_ads[2].keywords}/> : null }
        {pageData ? <GoogleMyBusiness domain={pageData.attributes.url} category={pageData.attributes.category.replace('/', '').split('/')[0]} address={pageData.attributes.address.street} phone={pageData.attributes.phone_number} searchTerm={pageData.google_search_ads[0].top_keywords.split(' ')[0]}/> : null }
        <GiftCardSection />
        {pageData ? <Ads title="Facebook Marketing" text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur" linkText="See more" link="/" logo="" domain={pageData.attributes.url} ads={pageData.google_search_ads[1].ad_template} adType="facebook" sway={true} /> : null}
        {pageData ? <Ads title="Instagram Marketing" text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur" linkText="See more" link="/" logo="" domain={pageData.attributes.url} ads={pageData.google_search_ads[1].ad_template} adType="instagram" sway={false} /> : null} 
        {pageData ? <Competitors competitors={pageData.similar_sites} /> : null}
        <JumboCta data={{title: 'Start building your business with Cobiro ', text: 'Focus your energy on running your business, while we take care of the advertising part.', externalLinkCta: '/', linkTitle: 'Sign up for free', backgroundColor: true, topGradiantColor: {hex: '#004BD5'}, bottomGradiantColor: {hex: '#62C9FF'}}}/>
    </Layout>
    )
}

export default Sites
