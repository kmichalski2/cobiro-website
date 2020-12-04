import React, { useState, createContext } from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import JumboHeader from "../components/sections/jumboHeader/jumboHeader"
import ThreeUpPeople from "./sections/threeUpPeople/threeUpPeople"
import ThreeUp from "../components/sections/threeUp"
import AccordionFaq from "../components/sections/AccordionFaq/accordionFaq"
import ExplanationImage from "./sections/explanationImage/explanationImage"
import FeatureList from "../components/sections/featureList"
import FeaturedCompanies from "../components/sections/featuredCompanies"
import FeaturedTestimonialsSingle from "../components/sections/featuredTestimonalSingle"
import JumboCta from "./sections/jumboCta/jumboCta"
import ListPricing from "../components/sections/listPricing/listPricing"
import Quotes from "../components/sections/quotes/quotes"
import Text from "./sections/text/text"
import Video from "../components/sections/video/video"
import FeaturedCarousel from "../components/sections/featuredCarousel/featuredCarousel"
import ImageSection from "../components/sections/image/image"
import Voucher from "../components/sections/voucher/voucher"
import VoucherHeader from "./sections/voucherHeader/voucherHeader"
import ExplanationGiftCard from "./sections/explanationGiftCard/explanationGiftCard"
import Form from "./sections/Form/Form"
import Gallery from "./sections/gallery/gallery"
import BlogLatest from "./sections/blogLatest"
import ContactPerson from './sections/contactPerson/contactPerson'
import PricingTables from "./sections/pricingTables/pricingTables"
import MediaDownload from './sections/mediaDownload/mediaDownload'
import ExpandablePersonsCard from './sections/expandablePersonsCard/expandablePersonsCard'
import IframeForm from "./sections/iframeForm/iframeForm"


// export const CurrentLocaleContext = React.createContext({})
// export const CurrentLocaleProvicer = CurrentLocaleContext.Provider

const PageContent = ({ data, locales, redirect, location }) => {
    
    const hideSignUp = data.hideSignupButtons
    const [menuInverted, setMenuInverted] = useState(false)
    const [notificationPadding, setNotificationPadding] = useState(0)
    const [navbarHeight, setNavbarHeight] = useState(0)
    const notifyerHeightHandler = (height) => {
        setNotificationPadding(height)
    }
    const navbarHeightHandler = (height) => {
        setNavbarHeight(height)
    }

  return (
    // <CurrentLocaleProvicer value={data.locale}>
    <Layout 
        customCta={ data.customCtaLinks && data.primaryCtaTitle && data.primaryCtaLink ? {title: data.primaryCtaTitle, link: data.primaryCtaLink} : null } 
        locales={ locales }
        location={location}
        currentLocale={data.locale}
        redirect={redirect}
        hiddenMenuItems={data.hiddenMenuItems}
        menuInverted={menuInverted}
        slug={data.slug}
        notifyerHeightHandler={notifyerHeightHandler}
        hideSignUp={hideSignUp}
        navbarHeightHandler={navbarHeightHandler}
        >
      <SEO 
        title={ data.seoTags && data.seoTags.title ? data.seoTags.title : data.title } 
        description={data.seoTags && data.seoTags.description ? data.seoTags.description : null} 
        lang={data.locale}
        meta={data.seoMetaTags.tags}
        locales={locales}
        location={location}
        />
        
        <main>
            {data.sections.map((section, index) => {
            switch(section.__typename.replace("DatoCms", "")) {
                case 'JumboHeader':
                    if(data.sections[index].textColor === 'dark' && menuInverted !== true) {
                        setMenuInverted(true)
                    } 
                    return <JumboHeader data={data.sections[index]} key={index} notificationPadding={index === 0 ? notificationPadding : null}/>
                case 'ThreeUp':
                    return <ThreeUp data={data.sections[index]} key={index}/>
                case 'FeaturedCarousel':
                    return <FeaturedCarousel data={data.sections[index]} key={index}/>
                case 'ExplanationWImage':
                    return <ExplanationImage data={data.sections[index]} alignment="left" toEdge={true} key={index}/>
                case 'Accordionfaq':
                    return <AccordionFaq data={data.sections[index]} key={index}/>
                case 'FeatureList':
                    return <FeatureList data={data.sections[index]} key={index}/>
                case 'FeaturedCompany':
                    return <FeaturedCompanies data={data.sections[index]} key={index}/>
                case 'FeaturedTestimonialsSingle':
                    return <FeaturedTestimonialsSingle data={data.sections[index]} key={index}/>
                case 'ThreeUpPerson':
                    return <ThreeUpPeople data={data.sections[index]} key={index}/>
                case 'CtaJumbo':
                    return <JumboCta data={data.sections[index]} key={index}/>
                case 'BlogLatest':
                    return <BlogLatest data={data.sections[index]} key={index}/>
                case 'ListPricing':
                    return <ListPricing data={data.sections[index]} key={index}/>
                case 'Quote':
                    return <Quotes data={data.sections[index]} key={index}/>
                case 'Text':
                    return <Text data={data.sections[index]} key={index}/>
                case 'Video':
                    return <Video data={data.sections[index]} key={index}/>
                case 'Image':
                    return <ImageSection data={data.sections[index]} key={index}/>
                case 'Gallery':
                    return <Gallery data={data.sections[index]} key={index}/>
                case 'VoucherSignup':
                    return <Voucher data={data.sections[index]} key={index}/>
                case 'VoucherHeader':
                    if(data.sections[index].textColor === 'dark' && menuInverted !== true) {
                        setMenuInverted(true)
                    } 
                    return <VoucherHeader data={data.sections[index]} key={index}/>
                case 'ExplanationGiftCard':
                    return <ExplanationGiftCard data={data.sections[index]} key={index}/>
                case 'FormSection':
                    return <Form data={data.sections[index]} key={index}/>
                case 'IframeForm':
                    return <IframeForm data={data.sections[index]} key={index}/>
                case 'ContactPerson':
                    return <ContactPerson data={data.sections[index]} key={index}/>
                case 'PricingTable':
                    return <PricingTables data={data.sections[index]} navbarHeight={navbarHeight} key={index}/>
                case 'MediaDownload':
                    return <MediaDownload data={data.sections[index]} key={index}/>
                case 'ExpandablePersonsCard':
                    return <ExpandablePersonsCard data={data.sections[index]} key={index}/>
                default:
                    return null
                }
        })}
        </main>
        
    </Layout>
    // </CurrentLocaleProvicer>
  )
}

export default PageContent
