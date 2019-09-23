import React from "react"

const Quotes = ({ data }) => (
  <section className="section">
    <div className="container">
      <div className="row center-xs section-header">
        <div className="col col-xs-12 text-center">
          <h2>Quotes</h2>
          <p>Quotes from our customers</p>
        </div>
      </div>
      <div className="row center-xs cards">
        <div className="col col-xs-12 col-md-6 col-lg-4 flex between-xs">
          <div className="card quote text-left-xs between-xs flex flex-column">
            <h5 className="space-xs-up">Good stuff!</h5>
            <div className="flex start-xs middle-xs">
              <img src="" className="img-fluid" alt="quote" />
              <div>
                <p className="small">Person Name</p>
                <p className="small">Person Organization</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-xs-12 col-md-6 col-lg-4 flex between-xs">
          <div className="card quote text-left-xs between-xs flex flex-column">
            <h5 className="space-xs-up">Good stuff!</h5>
            <div className="flex start-xs middle-xs">
              <img src="" className="img-fluid" alt="quote" />
              <div>
                <p className="small">Person Name</p>
                <p className="small">Person Organization</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-xs-12 col-md-6 col-lg-4 flex between-xs">
          <div className="card quote text-left-xs between-xs flex flex-column">
            <h5 className="space-xs-up">Good stuff!</h5>
            <div className="flex start-xs middle-xs">
              <img src="" className="img-fluid" alt="quote" />
              <div>
                <p className="small">Person Name</p>
                <p className="small">Person Organization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Quotes
