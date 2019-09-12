import React from "react"
import logo from '../../images/boozt.png'
import splash from '../../images/left-splash.png'

const FeaturedCompanies = ({ data }) => (
<section className="section" style={{position: 'relative'}}>
	<img src={splash} alt="splash left" style={{position: 'absolute', left: 0, top: 0, height: '100%'}}/>
	<div className="section-inner">
		<div className="container">
			<div className="row center-xs middle-xs text-center">
				<div className="col col-xs-12 section-header">
					<h2>Join over 50.000 happy users globally who manage their ads better!</h2>
					<p>These are some of our costumers</p>
				</div>
				<div className="customer-logo col col-xs-6 col-md-3">
					<img src={logo} alt="customer logo"/>
				</div>
                <div className="customer-logo col col-xs-6 col-md-3">
					<img src={logo} alt="customer logo"/>
				</div>
                <div className="customer-logo col col-xs-6 col-md-3">
					<img src={logo} alt="customer logo"/>
				</div>
			</div>
		</div>
	</div>
</section>

)

export default FeaturedCompanies
