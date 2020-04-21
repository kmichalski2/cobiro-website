import React, { useState } from "react"
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

const PageContent = ({ data, locales }) => {

    const [menuInverted, setMenuInverted] = useState(false)

  return (
    <Layout 
        customCta={ data.customCtaLinks && data.primaryCtaTitle && data.primaryCtaLink ? {title: data.primaryCtaTitle, link: data.primaryCtaLink} : null } 
        locales={ locales } 
        currentLocale={data.locale}
        hiddenMenuItems={data.hiddenMenuItems}
        menuInverted={menuInverted}
        >
      <SEO 
        title={ data.seoTags && data.seoTags.title ? data.seoTags.title : data.title } 
        description={data.seoTags && data.seoTags.description ? data.seoTags.description : null} 
        lang={data.locale}
        />
      <main>
        {data.sections.map((section, index) => {
        switch(section.__typename.replace("DatoCms", "")) {
            case 'JumboHeader':
                if(data.sections[index].textColor === 'dark' && menuInverted !== true) {
                    console.log('DARK TExt')
                    setMenuInverted(true)
                } 
                console.log(menuInverted)
                return <JumboHeader data={data.sections[index]} key={index}/>
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
                return <VoucherHeader data={data.sections[index]} key={index}/>
            case 'ExplanationGiftCard':
                return <ExplanationGiftCard data={data.sections[index]} key={index}/>
            case 'FormSection':
                return <Form data={data.sections[index]} key={index}/>
            default:
                return null
            }
    })}
      </main>
    </Layout>
  )
}

export default PageContent
