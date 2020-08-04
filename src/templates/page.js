import React from "react"
import PageContent from "../components/pageContent"

const IndexPage = ( pageContext) => {
    console.log(pageContext.pageContext)
return <PageContent data={pageContext.pageContext.data} locales={pageContext.pageContext.locales} redirect={pageContext.location.state && pageContext.location.state.redirect }/>
}

export default IndexPage

