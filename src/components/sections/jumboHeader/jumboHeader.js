import { Link } from "gatsby"
import React from "react"
import JumboHeaderStyles from "./jumboHeader.module.scss"

const JumboHeader = ({ data }) => (
<section className={[JumboHeaderStyles.borderBottom, 'section bg-lightblue'].join(' ')}>
		<div className="container">
			<div className="row middle-xs center-xs">
				<div className="col col-xs-12 col-md-6 text-left-md">
					<div className="text-padding">
						<h1>#1 platform for Online Advertising</h1>
						<p>Grow your business and career with digital marketing - all in one place</p>
					
							<Link to="/" className="btn btn-large space-xs space-sm">Sign up for free</Link>
					</div>
				</div>
				<div className="col col-xs-12 col-md-6">
					<img src="" className="img-responsive img-full-width" alt="Get business success with Google Ads" />
				</div>
			</div>
		</div>
		<div className={JumboHeaderStyles.bottomCaption}>
			<p>Cobiro is 100% certified partner with:</p>
			<div className={JumboHeaderStyles.partnerImages}>
				<img src="" alt=""/>
				<img src="" alt=""/>
				<img src="" alt=""/>
			</div>
		</div>
</section>

)

export default JumboHeader
