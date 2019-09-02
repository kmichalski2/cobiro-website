import React from "react"

const FeaturedCompanies = ({ data }) => (
<section className="section">
	<div className="section-inner">
		<div className="container">
			<div className="row center-xs middle-xs text-center">
				<div className="col col-xs-12 section-header">
					<h2>Featured Companies</h2>
					<p>These are some of our costumers</p>
				</div>
				<div className="customer-logo col col-xs-6 col-md-3">
					<img src="/" alt="customer logo"/>
				</div>
                <div className="customer-logo col col-xs-6 col-md-3">
					<img src="/" alt="customer logo"/>
				</div>
                <div className="customer-logo col col-xs-6 col-md-3">
					<img src="/" alt="customer logo"/>
				</div>
			</div>
		</div>
	</div>
</section>

)

export default FeaturedCompanies
