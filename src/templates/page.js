import React from "react"
import PageContent from '../components/pageContent'

const IndexPage = ({data}) => (
    <PageContent data={data.datoCmsPage}/>
)

export default IndexPage

export const query = graphql`
  query {
    datoCmsPage {
        title
        slug
        sections {
            __typename
            ... on DatoCmsJumboHeader {
              id
              text
              linkTitle
              internalLink
              heading
              externalLink
              externalLinkUrl
              link {
                title
                slug
                position
              }
            }
          }
      }
  }
`