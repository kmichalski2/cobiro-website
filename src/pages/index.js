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
import FeaturedCarousel from "../components/sections/featuredCarousel/featuredCarousel";

const IndexPage = () => (
  <Layout>
    <SEO title="Forside" />
    <JumboHeader textAlignment="left" jumboFooter={true} imageToRight={true}/>
    <ThreeUp/>
    <FeaturedCarousel />
    <ExplanationImage alignment="left" toEdge={true}/>
    <AccordionFaq/>
    <FeatureList/>
    <FeaturedCompanies/>
    <FeaturedTestimonialsSingle/>
    <ThreeUpPeople/>
    <JumboCta/>
    <ListPricing/>
    <Quotes/>
    <Text/>
    <Video/>
  </Layout>
)

export default IndexPage
