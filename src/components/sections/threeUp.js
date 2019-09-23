import { Link } from "gatsby"
import React from "react"
import icon from "../../images/placeholder_icon.svg"
import icon2 from "../../images/placeholder_icon2.png"
import icon3 from "../../images/placeholder_icon3.png"
import splash from "../../images/video-splash-left.png"


const ThreeUpPeople = ({ data }) => (
	
<section className="section" style={{position: 'relative'}}>
	<div className="container" style={{position: 'relative', zIndex: 1}}>
		<div className="row">
			{/* <div className="col col-xs-12 text-center section-header">
				<h2>What can you do with Cobiro?</h2>
				<p>Get professional ads in just few clicks and start advertising.</p>
			</div> */}
			<div className="col col-xs-12 col-md-4">
				<div className="card">
					<img src={icon} className="three-up-icon" alt="alt title"/>
					<div className="text-left text-center-md">
						<h4>Build your skills</h4>
						<p className="small">Get professional ads in just few clicks and start advertising.</p>
                        <Link to="/" className="small">Learn More</Link>
					</div>
				</div>
			</div>
            <div className="col col-xs-12 col-md-4">
				<div className="card">
					<img src={icon2} className="three-up-icon" alt="alt title"/>
					<div className="text-left text-center-md">
						<h4>Grow Your Business</h4>
						<p className="small">Get professional ads in just few clicks and start advertising.</p>
                        <Link to="/" className="small">Learn More</Link>
					</div>
				</div>
			</div>
            <div className="col col-xs-12 col-md-4">
				<div className="card">
					<img src={icon3} className="three-up-icon" alt="alt title"/>
					<div className="text-left text-center-md">
						<h4>Expand Your Offering</h4>
						<p className="small">Get professional ads in just few clicks and start advertising.</p>
                        <Link to="/" className="small">Learn More</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
	<img src={splash} style={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '15%'}} alt="splash"/>
</section>

)

export default ThreeUpPeople
