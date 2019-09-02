import { Link } from "gatsby"
import React from "react"
import linkedin from "../../images/linkedin.svg"


const ThreeUpPeople = ({ data }) => {

    const peopleClickHandler = (event) => {

        const el = event.target;
        const text = el.previousElementSibling;
        const textHeight = text.scrollHeight;
    
        if ( el.parentNode.classList.contains('expand') ) {
            el.innerText = 'View full profile';
            text.style.maxHeight = null;
        } else {
            el.innerText = 'Hide full profile';
            text.style.maxHeight = textHeight + 'px';
        }
        console.log(text, textHeight);
        el.parentNode.classList.toggle('expand');
    
    }

    return (
    <section className="section">
        <div className="container">
            <div className="row center-xs">
                <div className="col col-xs-12 text-center section-header">
                    <h2>Management Team</h2>
                    <p>Excellent management is key to excellent workflows</p>
                </div>
                <div className="col col-xs-12 col-md-6 col-lg-4">
                    <div className="card people">
                        <div className="card-header-wrapper">
                            <img src="/" className="card-img-large" alt="Person" />
                            <div className="flex middle-xs between-xs space-md-up text-left">
                                <div>
                                    <h4>Bo Krogsgaard</h4>
                                    <h5 >CEO</h5>
                                </div>
                                <Link to="/" target="_blank"><img className="social-icon" src={ linkedin } alt="Bo Krogsgaard"/></Link>
                            </div>
                        </div>
                        <p className="small text-left-xs people-description">Bo has been building online based companies since 1998 and Cobiro is the brain child of his experience - an evolution of a platform he developed for hotel booking and price comparison engines. At Cobiro, Bo is our CEO, responsible for leading the company towards new heights.</p>
                        <button className="btn hidden-md-up" onClick={peopleClickHandler} aria-label="View full profile">View full profile</button>
                    </div>
                </div>
                <div className="col col-xs-12 col-md-6 col-lg-4">
                    <div className="card people">
                        <div className="card-header-wrapper">
                            <img src="/" className="card-img-large" alt="Person" />
                            <div className="flex middle-xs between-xs space-md-up text-left">
                                <div>
                                    <h4>Bo Krogsgaard</h4>
                                    <h5 >CEO</h5>
                                </div>
                                <Link to="/" target="_blank"><img className="social-icon" src={ linkedin } alt="Bo Krogsgaard"/></Link>
                            </div>
                        </div>
                        <p className="small text-left-xs people-description">Bo has been building online based companies since 1998 and Cobiro is the brain child of his experience - an evolution of a platform he developed for hotel booking and price comparison engines. At Cobiro, Bo is our CEO, responsible for leading the company towards new heights.</p>
                        <button className="btn hidden-md-up" onClick={peopleClickHandler} aria-label="View full profile">View full profile</button>
                    </div>
                </div>
                <div className="col col-xs-12 col-md-6 col-lg-4">
                    <div className="card people">
                        <div className="card-header-wrapper">
                            <img src="/" className="card-img-large" alt="Person" />
                            <div className="flex middle-xs between-xs space-md-up text-left">
                                <div>
                                    <h4>Bo Krogsgaard</h4>
                                    <h5>CEO</h5>
                                </div>
                                <Link to="/" target="_blank"><img className="social-icon" src={ linkedin } alt="Bo Krogsgaard"/></Link>
                            </div>
                        </div>
                        <p className="small text-left-xs people-description">Bo has been building online based companies since 1998 and Cobiro is the brain child of his experience - an evolution of a platform he developed for hotel booking and price comparison engines. At Cobiro, Bo is our CEO, responsible for leading the company towards new heights.</p>
                        <button className="btn hidden-md-up" onClick={peopleClickHandler} aria-label="View full profile">View full profile</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default ThreeUpPeople
