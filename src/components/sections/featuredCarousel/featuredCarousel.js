import React, { useEffect, useState } from "react"

import FeaturedCarouselStyles from "./featuredCarousel.module.scss"
import FeaturedCarouselSlide from "./featuredCarouselSlide/featuredCarouselSlide"

import image1 from "../../../images/placeholder_carousel.png"
import imageFloating from "../../../images/placeholder_jumboimage.png"


const FeaturedCarousel = ({ data }) => {

    const [activeSlide, setActiveSlide] = useState(0);
    const [animate, setAnimate] = useState(true);


    useEffect(() => {
        const slideTexts = document.querySelectorAll('.slide-text');
        slideTexts.forEach((el) => {
            if ( el.classList.contains('open') ) {
                el.style.maxHeight = el.children[0].offsetHeight + 'px';
            } else if ( !el.classList.contains('open') ) {
                el.style.maxHeight = 0;
            }
        });
        setAnimate(false);
    },
    [activeSlide],
    );

    const testData = [
        {title: 'One stop shop', text: 'No need for complex coordination across different marketing channels. Create and control all your marketing from one place to make work and life easier. ', image: image1, icon: ""},

        {title: 'Automated advertising', text: 'No need for complex coordination across different marketing channels. Create and control all your marketing from one place to make work and life easier. ', image: imageFloating, icon: ""},

        {title: 'Marketing guidance', text: 'No need for complex coordination across different marketing channels. Create and control all your marketing from one place to make work and life easier. ', image: image1, icon: ""},

        {title: 'Super support', text: 'No need for complex coordination across different marketing channels. Create and control all your marketing from one place to make work and life easier. ', image: image1, icon: ""},
    ]

    const clickHandler = (index) => {
        if (index !== activeSlide) {
            setActiveSlide(index);
            setAnimate(true);
        }
    }    
    
    return (
    <section className="section">
        <div className="container">
            <div className="row center-xs text-center space-xs-up">
                <div className="col col-xs-12 space-xs-up">
                    <h2>Automate, sit back and relax!</h2>
                    <p>It has never been easier to run and optimize your ads</p>
                </div>
            </div>
            <div className="row center-xs">
                <div className={[FeaturedCarouselStyles.carousel, 'col col-xs-12 col-lg-4 space-xs-up'].join(' ')}>
                    <ul className="list-unstyled">
                        {testData.map((el, index) => (
                            <FeaturedCarouselSlide click={() => clickHandler(index)} active={activeSlide === index ? true : false } title={el.title} text={el.text} key={index}/>
                        ))}
                    </ul>
                </div>
                <div className="col col-xs-12 col-lg-8">
                    {!animate ? <img src={testData[activeSlide].image} className={FeaturedCarouselStyles.image} alt="" /> : null}
                </div>
            </div>
        </div>
    </section>

)}

export default FeaturedCarousel
