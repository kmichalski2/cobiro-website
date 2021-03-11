import React from "react"
import Section from "../../UiElements/Section/Section"
import IconCard from "../../UiElements/IconCard/IconCard"
import HtmlText from "../../UiElements/HtmlText/HtmlText"
import * as Classes from "./fourUp.module.scss"

const FourUp = ({ data }) => {

  return (
    <Section bgColor={data.sectionBackgroundColor && data.sectionBackgroundColor.hex} classes={Classes.section}>
        <div className="container">

          <div className={["row center-xs", Classes.text].join(' ')}>
            {data.text ? (
              <div className="col col-xs-12 col-md-8 col-lg-6 text-center">
                <HtmlText RawHtml={data.text}/>
              </div>
            ) : null}
          </div>
          <div className="row center-xs stretch-xs ">
            {data.box1Text && data.box1Icon ? (
              <div className="col col-xs-12 col-md-6 col-lg-3 flex">
                <IconCard 
                  image={data.box1Icon}
                  alt={data.box1Icon.alt || null }
                  text={data.box1Text} 
                  shadow={!data.bgColor}
                  classes={Classes.IconCardRounded}
                  checkmark
                  />
              </div>
            ) : null}

            {data.box2Text && data.box2Icon ? (
              <div className="col col-xs-12 col-md-6 col-lg-3 flex">
                <IconCard 
                  image={data.box2Icon} 
                  alt={data.box2Icon.alt || null } 
                  text={data.box2Text} 
                  shadow={!data.bgColor}
                  classes={Classes.IconCardRounded}
                  checkmark
                  />
              </div>
            ) : null}

            {data.box3Text && data.box3Icon ? (
              <div className="col col-xs-12 col-md-6 col-lg-3 flex">
                <IconCard 
                  image={data.box3Icon} 
                  alt={data.box3Icon.alt || null } 
                  text={data.box3Text} 
                  shadow={!data.bgColor}
                  classes={Classes.IconCardRounded}
                  checkmark
                  />
              </div>
            ) : null}

            {data.box4Text && data.box4Icon ? (
              <div className="col col-xs-12 col-md-6 col-lg-3 flex">
                <IconCard 
                  image={data.box4Icon} 
                  alt={data.box4Icon.alt || null } 
                  text={data.box4Text} 
                  shadow={!data.bgColor}
                  classes={Classes.IconCardRounded}
                  checkmark
                  />
              </div>
            ) : null}

          </div>
      </div>
    </Section>
  )
}

export default FourUp
