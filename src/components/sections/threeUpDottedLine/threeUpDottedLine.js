import React from "react"
import Section from "../../UiElements/Section/Section"
import IconCard from "../../UiElements/IconCard/IconCard"
import HtmlText from "../../UiElements/HtmlText/HtmlText"
import Classes from "./threeUpDottedLine.module.scss"
import ImageAll from "../../UiElements/ImageAll/ImageAll"

const ThreeUpDottedLine = ({ data }) => {

  return (
    <Section bgColor={data.sectionBackgroundColor && data.sectionBackgroundColor.hex}>
        <div className="container">

          <div className={["row center-xs", Classes.text].join(' ')}>
            {data.text ? (
              <div className="col col-xs-12 col-md-8 col-lg-6 text-center">
                <HtmlText RawHtml={data.text}/>
              </div>
            ) : null}
          </div>
          <div className={["row center-lg stretch-xs", Classes.rowRelative].join(' ')}>
            {data.box1Text && data.box1Icon ? (
              <div className={["col col-xs-12 col-lg-4 flex-column", Classes.iconCardWrapper].join(' ')}>
              <IconCard
                  image={data.box1Icon}
                  alt={data.box1Icon.alt || null }
                  text={data.box1Text}
                  shadow={!data.bgColor}
                  classes={Classes.IconCardRounded}
                />
                <div className={[Classes.imageWrapper, "center"].join(' ')}>
                  <ImageAll image={data.box1Image}/>
                </div>              
              </div>
            ) : null}

            <div className={Classes.dottedLineOne}/>

            {data.box2Text && data.box2Icon ? (
              <div className={["col col-xs-12 col-lg-4 flex-column", Classes.iconCardWrapper].join(' ')}>
                <IconCard 
                  image={data.box2Icon} 
                  alt={data.box2Icon.alt || null } 
                  text={data.box2Text} 
                  shadow={!data.bgColor}
                  classes={Classes.IconCardRoundedTwo}
                />
                <div className={[Classes.imageWrapper, "center"].join(' ')}>
                  <ImageAll image={data.box2Image}/>
                </div>
              </div>
            ) : null}

            <div className={Classes.dottedLineTwo}/>
            
            {data.box3Text && data.box3Icon ? (
              <div className={["col col-xs-12 col-lg-4 flex-column", Classes.iconCardWrapper].join(' ')}>
              <IconCard 
                  image={data.box3Icon} 
                  alt={data.box3Icon.alt || null } 
                  text={data.box3Text} 
                  shadow={!data.bgColor}
                  classes={Classes.IconCardRoundedThree}
                />
                <div className={[Classes.imageWrapper, "center"].join(' ')}>
                  <ImageAll image={data.box3Image}/>
                </div>              
              </div>
            ) : null}
          </div>
      </div>
    </Section>
  )
}

export default ThreeUpDottedLine
