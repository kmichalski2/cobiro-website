import React, { useState } from "react"
import Classes from './AccordionFaq.module.scss'

const AccordionFaq = ({ data }) => {
  const accordions = data.accordion.accordionTabs

  const [expandedAccordion, setExpandedAccordion] = useState(null)
  const [accordionMaxHeight, setAccordionMaxHeight] = useState(null)

  function createMarkup(text) {
    return {__html: text}
  }

  const newAccordionClickHandler = (event, i) => {
    const sibling = event.target.nextElementSibling
    const parentNode = event.target.parentNode

    if(expandedAccordion === i) {
      setExpandedAccordion(null)
      setAccordionMaxHeight(null)
      setAccordionMaxHeight(null)
    } else {

      setExpandedAccordion(i)
      if (parentNode.classList.contains("accordion-header")) {
        setAccordionMaxHeight(parentNode.nextElementSibling.scrollHeight)
      } else if(sibling && sibling.classList.contains(Classes.accordionText)) {
        setAccordionMaxHeight(sibling.scrollHeight)
      } else if(parentNode.classList.contains(Classes.accordionText)) {
        setAccordionMaxHeight(parentNode.scrollHeight)
      } else if (event.target.classList.contains("card")) {
        setAccordionMaxHeight(event.target.childNodes[1].scrollHeight)
      } else if(event.target.classList.contains(Classes.accordionText)) {
        setAccordionMaxHeight(event.target.scrollHeight)
      }
      
    }
  }


  return (
    <section className={[data.backgroundColor ? "bg-extra-ligt-grey" : null, "section"].join(' ')}>
      <div className={data.backgroundColor ? "bg-sway-inner" : null}>
        <div className="container center">
          <div className="row">
            <div className="col col-xs-12 text-center section-header">
              { data.title ? <h2>{data.title}</h2> : null }
              { data.text ? <p>{data.text}</p> : null }
            </div>
            <div className={["col col-xs-12", Classes.accordion].join(' ')}>
              {accordions.map((acc, index) => (
              <div key={index} className={["card card-visible text-left", Classes.question, expandedAccordion === index ? "expanded-accordion" : null].join(' ')} onClick={event => newAccordionClickHandler(event, index)}>
                <div className={["flex between-xs middle-xs accordion-header"]}>
                  <h5>{acc.title}</h5>
                  <button
                    className={["btn btn-toggle btn-unstyled btn-unstyled btn-accordion", expandedAccordion === index ? "active" : null].join(' ')}
                    aria-label="Expand accordion panel"
                  >
                    <span>+</span>
                  </button>
                </div>
                <div className={["small", Classes.accordionText, expandedAccordion === index ? Classes.expandedAccordion : null].join(' ')} dangerouslySetInnerHTML={createMarkup(acc.text)} style={expandedAccordion === index ? {maxHeight: accordionMaxHeight + "px"} : null}>
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
