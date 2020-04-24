import { Link } from "gatsby"
import React from "react"
import Section from "../UiElements/Section/Section"
import Card from "../UiElements/Card/Card"
import IconCard from "../UiElements/IconCard/IconCard"
import HtmlText from "../UiElements/HtmlText/HtmlText"

const ThreeUpPeople = ({ data }) => {
  const bigIcon = data.bigIcons

  return (
    <Section bgColor={data.bgColor && data.bgColor.hex}>
      <div className={data.backgroundColor ? "bg-sway-inner" : null}>
        <div className="container">
          <div className="row center-xs stretch-xs">
            {data.title || data.text ? (
              <div className="col col-xs-12 text-center section-header">
                {data.title ? <h2 className={data.textColor === 'light' ? "text-white" : null}>{data.title}</h2> : null}
                <HtmlText RawHtml={data.text} classes={data.textColor === 'light' ? "text-white" : null}/>
              </div>
            ) : null}

            {data.box1Title && data.box1Text && data.box1Icon ? (
              <div className="col col-xs-12 col-lg-4 flex">
                <IconCard 
                  image={data.box1Icon} 
                  alt={data.box1Icon.alt ? data.box1Icon.alt : data.box1Title} 
                  iconBig={bigIcon} 
                  title={data.box1Title} 
                  text={data.box1Text} 
                  footnote={data.box1Footnote} 
                  link={data.box1Link ? data.box1Link.slug : data.box1ExternalLink} 
                  internal={data.box1Link || false} 
                  external={data.box1ExternalLink || false} 
                  linkTitle={data.box1LinkText} 
                  shadow={!data.bgColor}
                  />
              </div>
            ) : null}

            {data.box2Title && data.box2Text && data.box2Icon ? (
              <div className="col col-xs-12 col-lg-4 flex">
                <IconCard 
                  image={data.box2Icon} 
                  alt={data.box2Icon.alt ? data.box2Icon.alt : data.box2Title} 
                  iconBig={bigIcon} 
                  title={data.box2Title} 
                  text={data.box2Text} 
                  footnote={data.box2Footnote} 
                  link={data.box2Link ? data.box2Link.slug : data.box2ExternalLink} 
                  internal={data.box2Link || false} 
                  external={data.box2ExternalLink || false} 
                  linkTitle={data.box2LinkText} 
                  shadow={!data.bgColor}
                  />
              </div>
            ) : null}

            {data.box3Title && data.box3Text && data.box3Icon ? (
              <div className="col col-xs-12 col-lg-4 flex">
                <IconCard 
                  image={data.box3Icon} 
                  alt={data.box3Icon.alt ? data.box3Icon.alt : data.box3Title} 
                  iconBig={bigIcon} 
                  title={data.box3Title} 
                  text={data.box3Text} 
                  footnote={data.box3Footnote} 
                  link={data.box3Link ? data.box3Link.slug : data.box3ExternalLink} 
                  internal={data.box3Link || false} 
                  external={data.box3ExternalLink || false} 
                  linkTitle={data.box3LinkText} 
                  shadow={!data.bgColor}
                  />
              </div>
            ) : null}
            
            {data.box4Title && data.box4Text && data.box4Icon ? (
              <div className="col col-xs-12 col-lg-4 flex">
                <IconCard 
                  image={data.box4Icon} 
                  alt={data.box4Icon.alt ? data.box4Icon.alt : data.box4Title} 
                  iconBig={bigIcon} 
                  title={data.box4Title} 
                  text={data.box4Text} 
                  footnote={data.box4Footnote} 
                  link={data.box4Link ? data.box4Link.slug : data.box4ExternalLink} 
                  internal={data.box4Link || false} 
                  external={data.box4ExternalLink || false} 
                  linkTitle={data.box4LinkText} 
                  shadow={!data.bgColor}
                  />
              </div>
            ) : null}

            {data.box5Title && data.box5Text && data.box5Icon ? (
              <div className="col col-xs-12 col-lg-4 flex">
                <IconCard 
                  image={data.box5Icon} 
                  alt={data.box5Icon.alt ? data.box5Icon.alt : data.box5Title} 
                  iconBig={bigIcon} 
                  title={data.box5Title} 
                  text={data.box5Text} 
                  footnote={data.box5Footnote} 
                  link={data.box5Link ? data.box5Link.slug : data.box5ExternalLink} 
                  internal={data.box5Link || false} 
                  external={data.box5ExternalLink || false} 
                  linkTitle={data.box5LinkText} 
                  shadow={!data.bgColor}
                  />
              </div>
            ) : null}

            {data.box6Title && data.box6Text && data.box6Icon ? (
              <div className="col col-xs-12 col-lg-4 flex">
                <IconCard 
                  image={data.box6Icon} 
                  alt={data.box6Icon.alt ? data.box6Icon.alt : data.box6Title} 
                  iconBig={bigIcon} 
                  title={data.box6Title} 
                  text={data.box6Text} 
                  footnote={data.box6Footnote} 
                  link={data.box6Link ? data.box6Link.slug : data.box6ExternalLink} 
                  internal={data.box6Link || false} 
                  external={data.box6ExternalLink || false} 
                  linkTitle={data.box6LinkText} 
                  shadow={!data.bgColor}
                  />
              </div>
            ) : null}

          </div>
        </div>
      </div>
    </Section>
  )
}

export default ThreeUpPeople
