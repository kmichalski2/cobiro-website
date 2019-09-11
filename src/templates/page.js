import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import JumboHeader from "../components/sections/jumboHeader/jumboHeader"
import ThreeUpPeople from "../components/sections/threeUpPeople"
import ThreeUp from "../components/sections/threeUp"
import AccordionFaq from "../components/sections/accordionFaq"
import ExplanationImage from "../components/sections/explanationImage";
import FeatureList from "../components/sections/featureList";
import FeaturedCompanies from "../components/sections/featuredCompanies";
import FeaturedTestimonialsSingle from "../components/sections/featuredTestimonalSingle";
import JumboCta from "../components/sections/jumboCta";
import ListPricing from "../components/sections/listPricing";
import Quotes from "../components/sections/quotes/quotes";
import Text from "../components/sections/text";
import Video from "../components/sections/video/video";

const IndexPage = ({pageContext}) => (
  <Layout>
    <SEO title={pageContext.title} />
    <main>
    {pageContext.sections.map((section, index) => {
        switch(section) {
            case 'JumboHeader':
                return <JumboHeader textAlignment="left" jumboFooter={false} imageToRight={true} key={index}/>
            case 'ThreeUp':
                return <ThreeUp key={index}/> 
            case 'ExplanationWImage':
                return <ExplanationImage alignment="left" key={index}/>
            case 'Accordionfaq':
                return <AccordionFaq key={index}/>
            case 'FeatureList':
                return <FeatureList key={index}/>
            case 'FeaturedCompany':
                return <FeaturedCompanies key={index}/>
            case 'FeaturedTestimonialsSingle':
                return <FeaturedTestimonialsSingle key={index}/>
            case 'ThreeUpPerson':
                return <ThreeUpPeople key={index}/>
            case 'CtaJumbo':
                return <JumboCta key={index}/>
            case 'ListPricing':
                return <ListPricing key={index}/>
            case 'Quote':
                return <Quotes key={index}/>
            case 'Text':
                return <Text key={index}/>
            case 'Video':
                return <Video key={index}/>
            default:
                return null
            }
    })}
    </main>
  </Layout>
)

export default IndexPage
