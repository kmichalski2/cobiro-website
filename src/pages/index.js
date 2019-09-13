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
import image1 from '../images/placeholder-imageleft.png'
import image2 from '../images/placeholder_imageright.png'
import image3 from '../images/placeholder-imageleft2.png'
import googleImage from "../images/google.png"


const IndexPage = () => (
  <Layout>
    <SEO title="Forside" />
    <JumboHeader textAlignment="left" jumboFooter={false} imageToRight={true}/>
    <ThreeUp/>
    <ExplanationImage title="Custom marketing plan" alignment="right" imageLoaded={image1} toEdge={false}/>
    <ExplanationImage title="Track your ad performance" alignment="left" imageLoaded={image2} toEdge={false}/>
    <ExplanationImage title="Multiple ad platforms" alignment="right" imageLoaded={image3} toEdge={false}/>
    <FeaturedTestimonialsSingle/>
    <FeaturedCompanies partners={true}/>
    <FeaturedCarousel />
    <Quotes/>
    <JumboHeader title="Grow your business today" imageLoaded={googleImage} textAlignment="left" jumboFooter={false} imageToRight={true}/>
  </Layout>
)

export default IndexPage
