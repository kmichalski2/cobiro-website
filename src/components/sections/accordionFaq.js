import React from "react"

const AccordionFaq = ({ data }) => {
  const accordions = data.accordion.accordionTabs

  const accordionClickHandler = event => {
    // Setup variables
    let el
    if (event.target.classList.contains("accordion-header")) {
      el = event.target
    } else {
      el = event.target.parentNode
    }
    const elBtn = el.getElementsByClassName("btn-accordion")[0]
    const sibling = el.nextElementSibling
    const activeBtn = document.getElementsByClassName("btn-accordion")
    const expandedAcc = document.getElementsByClassName("accordion-text")
    let expanded

    // Set expanded state of event.target before removing class
    if (sibling.classList.contains("expanded-accordion")) {
      expanded = true
    } else {
      expanded = false
    }

    // remove class active on all buttons
    if (activeBtn) {
      for (let i = 0; i < activeBtn.length; i++) {
        activeBtn[i].classList.remove("active")
      }
    }

    // remove class expanded-accordion on all accordion-text
    if (expandedAcc) {
      for (let i = 0; i < expandedAcc.length; i++) {
        expandedAcc[i].classList.remove("expanded-accordion")
        expandedAcc[i].style.maxHeight = null
      }
    }

    // Set appropriate classes and maxHeight depending on state of event.target
    if (expanded) {
      sibling.style.maxHeight = null
      elBtn.classList.remove("active")
      sibling.classList.remove("expanded-accordion")
    } else {
      sibling.style.maxHeight = sibling.scrollHeight + "px"
      elBtn.classList.add("active")
      sibling.classList.add("expanded-accordion")
    }
  }

  return (
    <section className={[data.backgroundColor ? "bg-sway" : null, "section accordion"].join(' ')}>
      <div className={data.backgroundColor ? "bg-sway-inner" : null}>
        <div className="container">
          <div className="row">
            <div className="col col-xs-12 text-center section-header">
              { data.title ? <h2>{data.title}</h2> : null }
              { data.text ? <p>{data.text}</p> : null }
            </div>
            <div className="col col-xs-12 accordion">
              {accordions.map((acc, index) => (
              <div key={index} className="card card-visible text-left">
                <div className="flex between-xs middle-xs accordion-header">
                  <h5>{acc.title}</h5>
                  <button
                    className="btn btn-accordion btn-toggle btn-secondary"
                    onClick={accordionClickHandler}
                    aria-label="Expand accordion panel"
                  >
                    <span>+</span>
                  </button>
                </div>
                <div className="small accordion-text">
                  {acc.text}
                </div>
              </div> 
              ))}      
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccordionFaq
