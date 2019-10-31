import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import JumboHeader from "../components/sections/jumboHeader/jumboHeader"
import ThreeUpPeople from "./sections/threeUpPeople/threeUpPeople"
import ThreeUp from "../components/sections/threeUp"
import AccordionFaq from "../components/sections/accordionFaq"
import ExplanationImage from "../components/sections/explanationImage"
import FeatureList from "../components/sections/featureList"
import FeaturedCompanies from "../components/sections/featuredCompanies"
import FeaturedTestimonialsSingle from "../components/sections/featuredTestimonalSingle"
import JumboCta from "../components/sections/jumboCta"
import ListPricing from "../components/sections/listPricing"
import Quotes from "../components/sections/quotes/quotes"
import Text from "./sections/text/text"
import Video from "../components/sections/video/video"
import FeaturedCarousel from "../components/sections/featuredCarousel/featuredCarousel"
import Image from "../components/sections/image/image"

const pageContent = ({ data }) => {
  return (
    <Layout>
      <SEO title={ data.seoTags ==! null ? data.seoTags.title : data.title } description={data.seoTags ==! null ? data.seoTags.description : null} />
      <main>
        {data.sections.map((section, index) => {
        switch(section.__typename.replace("DatoCms", "")) {
            case 'JumboHeader':
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
                return <Image data={data.sections[index]} key={index}/>
            default:
                return null
            }
    })}
      </main>
    </Layout>
  )
}

export default pageContent
