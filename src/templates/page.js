import React from "react"
import PageContent from "../components/pageContent"

const IndexPage = ( pageContext) => {
return <PageContent data={pageContext.pageContext.data} locales={pageContext.pageContext.locales} />
}

export default IndexPage

