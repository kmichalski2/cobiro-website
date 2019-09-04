import { Link } from "gatsby"
import React from "react"
import image from "../../../images/people_homepage.png"
import JumboHeaderStyles from "./jumboHeader.module.scss"

const JumboHeader = ({ data }) => (
<section className={[JumboHeaderStyles.JumboHeader, 'section bg-lightyellow'].join(' ')}>
		<div className="container">
			<div className="row middle-xs bottom-xs">
				<div className="col col-xs-12 col-md-6 text-left-md">
					<div className={[JumboHeaderStyles.text, 'text-padding'].join(' ')}>
						<h1>#1 platform for Online Advertising</h1>
						<p>Grow your business and career with digital marketing - all in one place</p>
					
							<Link to="/" className="btn btn-large space-xs space-sm">Sign up for free</Link>
					</div>
				</div>
				<div className="col col-xs-12 col-md-6">
					<img src={image} className="img-responsive img-full-width" alt="Get business success with Google Ads" />
				</div>
			</div>
		</div>
		<svg className={JumboHeaderStyles.sway} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 100"><path d="M1918.083,370.722c-230.827,18.69-528.046,18.431-757.332-.661-130.463-10.863-237.688-27.131-371.116-37.194C536.338,313.763,201.347,321.432,0,350.945l1.917,71.463H1920Z" transform="translate(0 -322.407)"/></svg>
</section>

)

export default JumboHeader
