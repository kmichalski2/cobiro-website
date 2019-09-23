import React from "react"
import PageContent from "../components/pageContent"

const IndexPage = ({ data }) => <PageContent data={data.datoCmsFrontpage} />

export default IndexPage

export const query = graphql`
  query {
    datoCmsFrontpage {
      title
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
