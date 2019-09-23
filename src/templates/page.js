import React from "react"
import PageContent from "../components/pageContent"

const IndexPage = ( pageContext) => {
    console.log('context: ', pageContext.pageContext.data);
return <PageContent data={pageContext.pageContext.data} />
}

export default IndexPage

// export const query = graphql`
//   query {
//     datoCmsPage {
//       title
//       slug
//       sections {
//         __typename
//         ... on DatoCmsJumboHeader {
//           id
//           text
//           linkTitle
//           internalLink
//           heading
//           externalLink
//           externalLinkUrl
//           link {
//             title
//             slug
//             position
//           }
//           textLeftAlignment
//           image {
//             alt
//             width
//             height
//             fluid(
//               maxWidth: 1500
//               imgixParams: { fm: "webp", auto: "compress" }
//             ) {
//               ...GatsbyDatoCmsFluid
//             }
//           }
//         }
//         ... on DatoCmsThreeUp {
//           title
//           text
//           box1Icon {
//             alt
//             url
//           }
//           box1Title
//           box1Text
//           box1LinkText
//           box1Link {
//             slug
//           }
//           box2Icon {
//             url
//             alt
//           }
//           box2Title
//           box2Text
//           box2LinkText
//           box2Link {
//             slug
//           }
//           box3Icon {
//             url
//             alt
//           }
//           box3Title
//           box3Text
//           box3LinkText
//           box3Link {
//             slug
//           }
//         }
//         ... on DatoCmsExplanationWImage {
//           title
//           text
//           link {
//             slug
//           }
//           linkTitle
//           image {
//             alt
//             width
//             height
//             fluid(
//               maxWidth: 1200
//               imgixParams: { fm: "webp", auto: "compress" }
//             ) {
//               ...GatsbyDatoCmsFluid
//             }
//           }
//           imageToEdge
//           leftText
//         }
//         ... on DatoCmsFeaturedTestimonialsSingle {
//           quote
//           person
//           image {
//             alt
//             width
//             height
//             fluid(
//               maxWidth: 1200
//               imgixParams: { fm: "webp", auto: "compress" }
//             ) {
//               ...GatsbyDatoCmsFluid
//             }
//           }
//         }
//         ... on DatoCmsFeaturedCompany {
//           title
//           text
//           logos {
//             alt
//             width
//             height
//             fixed(width: 200) {
//               ...GatsbyDatoCmsFixed
//             }
//           }
//         }
//         ... on DatoCmsText {
//           title
//           text
//         }
//         ... on DatoCmsVideo {
//           videoEmbedUrl
//         }
//         ... on DatoCmsCtaJumbo {
//           title
//           text
//           linkTitle
//           link {
//             slug
//           }
//         }
//         ... on DatoCmsListPricing {
//           title
//           text
//           tier1Title
//           tier1Text
//           tier1Price
//           tier1LinkText
//           tier1ExternalLink
//           tier1Features
//           tier2Title
//           tier2Text
//           tier2Price
//           tier2LinkText
//           tier2ExternalLink
//           tier2Features
//         }
//       }
//     }
//   }
// `
