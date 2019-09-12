import { Link } from "gatsby"
import React from "react"

import imageFloating from "../../images/google.png"

const ExplanationImage = ({ alignment, toEdge }) => {
    const image = (
        <div className="img-responsive space-sm space-xs">
            <img src={imageFloating} alt="explanation left" style={{width: toEdge ? '50vw' : '', maxWidth: toEdge ? 'none' : ''}}/>
        </div>
    );

    const text = (
        <div className="text-padding">
            <h3 className="">No marketing skills needed</h3>
            <p>You don’t need any marketing skills to have great ads. Run ads like a pro — without having to rely on experts.</p>
                <Link to="/">Show me how</Link>
        </div>
    )
    
    return (
        <section className="section" style={{overflow: 'hidden'}}>
            <div className="container">
                <div className="row middle-xs reverse">
                    <div className="col col-sm-12 col-md-6">
                        { alignment === 'left' ? image : text }
                    </div>
                    <div className="col col-sm-12 col-md-6">
                        { alignment === 'left' ? text : image }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExplanationImage
