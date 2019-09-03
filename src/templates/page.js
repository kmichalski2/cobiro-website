import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import JumboHeader from "../components/sections/jumboHeader"
import ThreeUpPeople from "../components/sections/threeUpPeople"
import ThreeUp from "../components/sections/threeUp"
import AccordionFaq from "../components/sections/accordionFaq"
import ExplanationImage from "../components/sections/explanationImage";
import FeatureList from "../components/sections/featureList";
import FeaturedCompanies from "../components/sections/featuredCompanies";
import FeaturedTestimonialsSingle from "../components/sections/featuredTestimonalSingle";
import JumboCta from "../components/sections/jumboCta";
import ListPricing from "../components/sections/listPricing";
import Quotes from "../components/sections/quotes";
import Text from "../components/sections/text";
import Video from "../components/sections/video";

const IndexPage = ({pageContext}) => (
  <Layout>
    <SEO title={pageContext.title} />
    {pageContext.sections.map((section, index) => {
        switch(section) {
            case 'JumboHeader':
                return <JumboHeader key={index}/>
            case 'ThreeUp':
                return <ThreeUp key={index}/>
            case 'ExplanationImage':
                return <ExplanationImage alignment="left" key={index}/>
            case 'AccordionFaq':
                return <AccordionFaq key={index}/>
            case 'FeatureList':
                return <FeatureList key={index}/>
            case 'FeaturedCompanies':
                return <FeaturedCompanies key={index}/>
            case 'FeaturedTestimonialsSingle':
                return <FeaturedTestimonialsSingle key={index}/>
            case 'ThreeUpPeople':
                return <ThreeUpPeople key={index}/>
            case 'JumboCta':
                return <JumboCta key={index}/>
            case 'ListPricing':
                return <ListPricing key={index}/>
            case 'Quotes':
                return <Quotes key={index}/>
            case 'Text':
                return <Text key={index}/>
            case 'Video':
                return <Video key={index}/>
            default:
                break;
            }
    })}
  </Layout>
)

export default IndexPage
