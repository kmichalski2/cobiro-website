import { Link } from "gatsby"
import React from "react"

const JumboHeader = ({ data }) => (
<section className="section bg-yellow">
	<div className="container">
		<div className="row middle-xs center-xs">
			<div className="col col-xs-12 col-md-6 text-left-md">
				<div className="text-padding {{ spacing }}">
					<h1>Get business success with Google Ads</h1>
					<p>Fully automated advertising tool to help you create and optimize your Google Ads.</p>
				
						<Link to="/" className="btn btn-large space-xs space-sm">Sign up here</Link>
				</div>
			</div>
			<div className="col col-xs-12 col-md-6">
				<img src="" className="img-responsive img-full-width" alt="Get business success with Google Ads" />
			</div>
		</div>
	</div>
</section>

)

export default JumboHeader
