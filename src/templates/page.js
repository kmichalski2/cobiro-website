import React from "react"
import PageContent from "../components/pageContent"

const IndexPage = ( pageContext) => {
return <PageContent data={pageContext.pageContext.data} />
}

export default IndexPage

