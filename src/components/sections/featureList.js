import { Link } from "gatsby"
import React from "react"

const FeatureList = ({ data }) => (
  <section className="section">
    <div className="container">
      <div className="row middle-xs section-inner">
        <div className="col col-sm-12 col-md-4">
          <div className="img-responsive space-sm space-xs">
            <img src="" alt="alt title" />
          </div>
        </div>
        <div className="col col-sm-12 col-md-8">
          <div className="text-padding">
            <h3 className="">Feature</h3>
            <p>
              Feature text feature text feature text feature text feature text
              feature text feature text
            </p>
            <Link to="/" target="_blank">
              Read more
            </Link>
          </div>
        </div>
      </div>
      <div className="row middle-xs section-inner feature-list-border">
        <div className="col col-sm-12 col-md-4">
          <div className="img-responsive space-sm space-xs">
            <img src="" alt="alt title" />
          </div>
        </div>
        <div className="col col-sm-12 col-md-8">
          <div className="text-padding">
            <h3 className="">Feature</h3>
            <p>
              Feature text feature text feature text feature text feature text
              feature text feature text
            </p>
            <Link to="/" target="_blank">
              Read more
            </Link>
          </div>
        </div>
      </div>
      <div className="row middle-xs section-inner feature-list-border">
        <div className="col col-sm-12 col-md-4">
          <div className="img-responsive space-sm space-xs">
            <img src="" alt="alt title" />
          </div>
        </div>
        <div className="col col-sm-12 col-md-8">
          <div className="text-padding">
            <h3 className="">Feature</h3>
            <p>
              Feature text feature text feature text feature text feature text
              feature text feature text
            </p>
            <Link to="/" target="_blank">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default FeatureList
