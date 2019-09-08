import { Link } from "gatsby"
import React from "react"

import JumboHeaderStyles from "./jumboHeader.module.scss"

import image from "../../../images/people_homepage.png"
import imageFloating from "../../../images/placeholder_jumboimage.png"
import fb_iamge from "../../../images/placeholder_fb_jumbo.png"
import gPartner from "../../../images/placeholder_google_partner.png"
import gcss from "../../../images/placeholder_css.png"


const JumboHeader = ( props, { data } ) => {

	const textSide = (
		<div className="col col-xs-12 col-md-6 text-left-md">
			<div className={[JumboHeaderStyles.text, 'text-padding'].join(' ')}>
				<h1>#1 platform for Online Advertising</h1>
				<p>Grow your business and career with digital marketing - all in one place</p>
			
					<Link to="/" className="btn btn-large space-xs space-sm">Sign up for free</Link>
			</div>
		</div>
	);

	const imageSide = (
		<div className="col col-xs-12 col-md-6">
			<img src={props.imageToBottom ? image : imageFloating} className={[props.imageToBottom ? JumboHeaderStyles.toBottom : JumboHeaderStyles.notToBottom, JumboHeaderStyles.jumboImage,'img-responsive img-full-width'].join(' ')} alt="Get business success with Google Ads" />
		</div>
	);
	const swayHighLeft = (
		<svg className={JumboHeaderStyles.sway} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 100"><path d="M1918.083,370.722c-230.827,18.69-528.046,18.431-757.332-.661-130.463-10.863-237.688-27.131-371.116-37.194C536.338,313.763,201.347,321.432,0,350.945l1.917,71.463H1920Z" transform="translate(0 -322.407)"/></svg>
	);
	const swayHighRight = (
		<svg className={JumboHeaderStyles.sway} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 100"><path d="M1.917,370.722c230.827,18.69,528.046,18.431,757.332-.661,130.463-10.863,237.688-27.131,371.116-37.194,253.3-19.1,588.288-11.434,789.635,18.078l-1.917,71.463H0Z" transform="translate(0 -322.407)" fill="#fdedd0"/></svg>
	);
	const jumboFooter = (
		<aside className={[JumboHeaderStyles.footer, "bg-yellow section text-center"].join(' ')}>
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
					<h3>Offical Partnership</h3>
					<p className="space-xs-up">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
					<div className="flex center">
						<img src={ gPartner } alt="facebook" />
						<img src={ gcss } alt="facebook" />
						<img src={ fb_iamge } alt="facebook" />
					</div>
					</div>
				</div>
			</div>
		</aside>
	);
	
	return (
	<section>
		<div className={[JumboHeaderStyles.JumboHeader, props.textAlignment === 'left' ? JumboHeaderStyles.textLeft : JumboHeaderStyles.textRight, 'section-inner bg-lightyellow'].join(' ')}>
			<div className="container">
				<div className={[props.imageToBottom ? 'bottom-xs' : 'middle-xs', 'row'].join(' ')}>
					{ props.textAlignment === 'left' ? textSide : imageSide }
					{ props.textAlignment === 'left' ? imageSide : textSide }
				</div>
			</div>
			{ props.textAlignment === 'left' ? swayHighLeft : swayHighRight }
		</div>
		{ props.jumboFooter ? jumboFooter : null }		
	</section>

)}

export default JumboHeader
