import React from 'react'
import GiftCard from '../../UiElements/GiftCard/GiftCard'
 
import * as Classes from './explanationGiftCard.module.scss'

const ExplanationGiftCard = ({data}) => {

      const text = (
        <div className="text-padding">
          {data.title ? <h3 className="">{data.title}</h3> : null}
            {data.text ? <div className={Classes.text} dangerouslySetInnerHTML={{__html: data.text}}></div> : null}
      
          {data.linkTitle && data.linkUrl ? 
          <a className="btn space-xs-up" href={data.linkUrl}>{data.linkTitle}</a>
          : null}
          <p className="small">{data.footnote}</p>
        </div>
      )
    
      return (
        <section className="section">
            <div className="container">
              <div className="row middle-xs reverse">
                <div className={[data.leftText ? "last-xs last-sm first-md first-lg first-xl" : null, !data.leftText ? "space-xs space-sm space-md" : null, "col col-sm-12 col-md-6"].join(' ')}>
                  {data.leftText ? text : <GiftCard />}
                </div>
                <div className="col col-sm-12 col-md-6">
                  {data.leftText ? <GiftCard /> : text}
                </div>
              </div>
            </div>
        </section>
      )
}

export default ExplanationGiftCard