import { Link } from "gatsby"
import React from "react"

const ThreeUpPeople = ({ data }) => (
<section className="section">
	<div className="container">
		<div className="row">
			<div className="col col-xs-12 text-center section-header">
				<h2>What can you do with Cobiro?</h2>
				<p>Get professional ads in just few clicks and start advertising.</p>
			</div>
			<div className="col col-xs-12 col-md-4">
				<div className="card">
					<img src="/" className="three-up-icon" alt="alt title"/>
					<div className="text-left text-center-md">
						<h4>Create</h4>
						<p className="small">Get professional ads in just few clicks and start advertising.</p>
                        <Link to="/" className="small">Learn More</Link>
					</div>
				</div>
			</div>
            <div className="col col-xs-12 col-md-4">
				<div className="card">
					<img src="/" className="three-up-icon" alt="alt title"/>
					<div className="text-left text-center-md">
						<h4>Create</h4>
						<p className="small">Get professional ads in just few clicks and start advertising.</p>
                        <Link to="/" className="small">Learn More</Link>
					</div>
				</div>
			</div>
            <div className="col col-xs-12 col-md-4">
				<div className="card">
					<img src="/" className="three-up-icon" alt="alt title"/>
					<div className="text-left text-center-md">
						<h4>Create</h4>
						<p className="small">Get professional ads in just few clicks and start advertising.</p>
                        <Link to="/" className="small">Learn More</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

)

export default ThreeUpPeople
