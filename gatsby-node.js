const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async function({ graphql, actions }) {
  const { createPage } = actions
  // const locales = ["en"]

  // locales.forEach(locale => {
  //   const prefix = locale === "en" ? "" : `/${locale}`
  //   createPage({
  //     path: `${prefix}/`,
  //     component: path.resolve(`./src/templates/page.js`),
  //     context: { locale },
  //   })
  // })

  // Promise.all(
  //   locales.map(locale => {
    // graphql(`
    //   {
    //     allDatoCmsPage(filter: {locale: {eq: "${locale}"}}) {
      await graphql(`{
        allDatoCmsPage(filter: {locale: {eq: "en"}}) {
          edges {
            node {
              title
              homepage
              slug
              locale
              _allSlugLocales {
                value
                locale
              }
              customCtaLinks
              primaryCtaTitle
              primaryCtaLink
              seoTags {
                title
                description
              }
              hiddenMenuItems {
                id
              }
              sections {
                __typename
                ... on DatoCmsJumboHeader {
                  backgroundColor
                  topGradiantColor {
                    hex
                  }
                  bottomGradiantColor {
                    hex
                  }
                  imageBehindWave
                  id
                  text
                  linkTitle
                  internalLink
                  heading
                  externalLink
                  externalLinkUrl
                  link {
                    title
                    slug
                    position
                  }
                  alignment
                  image {
                    path
                    url
                    alt
                    width
                    height
                    fluid(maxWidth: 900, imgixParams: {q: 50}) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                      sizes
                    }
                  }
                }
                ... on DatoCmsVoucherHeader {
                  title
                  text
                  linkTitle
                  linkUrl
                  signUpOrVoucher
                  environment
                  footnote
                  topGradiantColor {
                    hex
                  }
                  bottomGradiantColor {
                    hex
                  }
                }
                ... on DatoCmsExplanationGiftCard {
                  title
                  text
                  linkTitle
                  linkUrl
                  footnote
                  leftText
                }
                ... on DatoCmsThreeUp {
                  backgroundColor
                  title
                  text
                  box1Icon {
                    alt
                    url
                  }
                  box1Title
                  box1Text
                  box1LinkText
                  box1Link {
                    slug
                  }
                  box1ExternalLink
                  box2Icon {
                    url
                    alt
                  }
                  box2Title
                  box2Text
                  box2LinkText
                  box2Link {
                    slug
                  }
                  box2ExternalLink
                  box3Icon {
                    url
                    alt
                  }
                  box3Title
                  box3Text
                  box3LinkText
                  box3Link {
                    slug
                  }
                  box3ExternalLink
                  box4Icon {
                    url
                    alt
                  }
                  box4Title
                  box4Text
                  box4LinkText
                  box4Link {
                    slug
                  }
                  box4ExternalLink
                  box5Icon {
                    url
                    alt
                  }
                  box5Title
                  box5Text
                  box5LinkText
                  box5Link {
                    slug
                  }
                  box5ExternalLink
                  box6Icon {
                    url
                    alt
                  }
                  box6Title
                  box6Text
                  box6LinkText
                  box6Link {
                    slug
                  }
                  box6ExternalLink
                  box1Footnote
                  box2Footnote
                  box3Footnote
                  box4Footnote
                  box5Footnote
                  box6Footnote
                }
                ... on DatoCmsExplanationWImage {
                  backgroundColor
                  topGradiantColor {
                    hex
                  }
                  bottomGradiantColor {
                    hex
                  }
                  title
                  text
                  link {
                    slug
                  }
                  linkTitle
                  externalLinkUrl
                  showAsButton
                  imageToEdge
                  image {
                    alt
                    url
                    width
                    height
                    fluid(maxWidth: 1200) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                      sizes
                    }
                  }
                  leftText
                }
                ... on DatoCmsFeaturedTestimonialsSingle {
                  backgroundColor
                  quote
                  person
                  image {
                    alt
                    url
                    width
                    height
                    fluid(maxWidth: 1200) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                      sizes
                    }
                  }
                }
                ... on DatoCmsFeaturedCompany {
                  backgroundColor
                  title
                  text
                  googlePartnerLogo
                  logos {
                    alt
                    width
                    height
                    url
                    fixed(width: 200) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                    }
                  }
                }
                ... on DatoCmsText {
                  backgroundColor
                  title
                  text
                  backgroundImage {
                    url
                  }
                }
                ... on DatoCmsVideo {
                  backgroundColor
                  videoEmbedUrl
                }
                ... on DatoCmsCtaJumbo {
                  backgroundColor
                  topGradiantColor {
                    hex
                  }
                  bottomGradiantColor {
                    hex
                  }
                  title
                  text
                  linkTitle
                  link {
                    slug
                  }
                  externalLinkCta
                }
                ... on DatoCmsListPricing {
                  backgroundColor
                  topGradiantColor {
                    hex
                  }
                  bottomGradiantColor {
                    hex
                  }
                  title
                  text
                  tier1Title
                  tier1Text
                  tier1Price
                  tier1RecurringDescriptor
                  tier1LinkText
                  tier1ExternalLink
                  tier1Features
                  tier2Title
                  tier2Text
                  tier2Price
                  tier2RecurringDescriptor
                  tier2LinkText
                  tier2ExternalLink
                  tier2Features
                }
                ... on DatoCmsQuote {
                  backgroundColor
                  title
                  text
                  linkTitleQuotes
                  internalLinkQuotes {
                    slug
                  }
                  externalLinkQuotes
                  quotes {
                    quotes {
                      person
                      country
                      imageLeft {
                        url
                        alt
                        fixed(width: 24) {
                          base64
                          aspectRatio
                          width
                          height
                          srcSet
                          src
                          __typename
                        }
                      }
                      flag {
                        url
                        alt
                        fixed(width: 24) {
                          base64
                          aspectRatio
                          width
                          height
                          srcSet
                          src
                          __typename
                        }
                      }
                      quoteText
                    }
                  }
                }
                ... on DatoCmsFeaturedCarousel {
                  backgroundColor
                  title
                  text
                  slides {
                    slides {
                      title
                      text
                      icon {
                        path
                        url
                        alt
                        fixed(width:32) {
                          base64
                          aspectRatio
                          width
                          height
                          src
                          srcSet
                        }
                      }
                      image {
                        url
                        alt
                        fluid(maxWidth: 1200) {
                          base64
                          aspectRatio
                          width
                          height
                          src
                          srcSet
                          sizes
                        }
                      }
                    }
                  }
                }
                ... on DatoCmsThreeUpPerson {
                  backgroundColor
                  title
                  text
                  people {
                    title
                    text
                    name
                    image {
                      alt
                      url
                      fluid(maxWidth: 180) {
                        width
                        height
                        srcSet
                        base64
                        aspectRatio
                        src
                        sizes
                      }
                    }
                    linkedinLink
                    customLogoLink
                    customLogo {
                      alt
                      url
                      fluid(maxWidth: 200) {
                        width
                        srcSet
                        src
                        sizes
                        height
                        base64
                        aspectRatio
                      }
                    }
                  }
                }
                ... on DatoCmsFeatureList {
                  backgroundColor
                  features {
                    title
                    features {
                      title
                      text
                      link {
                        title
                        slug
                      }
                      image {
                        alt
                        url
                        fluid(maxWidth: 1200) {
                          width
                          srcSet
                          src
                          sizes
                          height
                          base64
                          aspectRatio
                        }
                      }
                    }
                  }
                }
                ... on DatoCmsAccordionfaq {
                  backgroundColor
                  title
                  text
                  accordion {
                    accordionTabs {
                      title
                      text
                    }
                  }
                }
                ... on DatoCmsImage {
                  image {
                    alt
                    url
                    fluid(maxWidth: 2000) {
                      aspectRatio
                      base64
                      height
                      sizes
                      src
                      srcSet
                      width
                    }
                  }
                }
                ... on DatoCmsFormSection {
                  text
                  title
                  formRight
                  form {
                    formName
                    submitTitle
                    succesPage {
                      slug
                    }
                    formFields {
                      ... on DatoCmsTextField {
                        name
                        helpText
                        required
                        placeholder
                        label
                        internal {
                          type
                        }
                      }
                      ... on DatoCmsTextareaField {
                        name
                        helpText
                        label
                        required
                        placeholder
                        internal {
                          type
                        }
                      }
                      ... on DatoCmsNumberField {
                        name
                        helpText
                        required
                        placeholder
                        label
                        internal {
                          type
                        }
                      }
                      ... on DatoCmsEmailField {
                        name
                        helpText
                        label
                        placeholder
                        required
                        internal {
                          type
                        }
                      }
                      ... on DatoCmsSelectField {
                        name
                        helpText
                        label
                        options
                        placeholder
                        required
                        internal {
                          type
                        }
                      }
                      ... on DatoCmsCheckbox {
                        name
                        checkboxes
                        helpText
                        label
                        required
                        minimumSelection
                        maximumSelection
                        internal {
                          type
                        }
                      }
                      ... on DatoCmsRadioButtonField {
                        name
                        helpText
                        label
                        required
                        radioButtons
                        internal {
                          type
                        }
                      }
                    }
                  }
                }
                ... on DatoCmsVoucherSignup {
                  environment
                  backgroundColor
                  bottomGradiantColor {
                    hex
                  }
                  footnote
                  linkTitle
                  text
                  title
                  topGradiantColor {
                    hex
                  }
                }
              }
            }
          }
        }
      }
      `).then(result => {
        result.data.allDatoCmsPage.edges.forEach(async function(item) {
          const locale = item.node.locale
          const prefix = locale !== 'en' ? locale : ''
          let p = `${prefix}/${item.node.slug ? item.node.slug : ''}`
          // let p = item.node.homepage ? '/' : `/${item.node.slug}`
          await createPage({
            path: p,
            component: path.resolve(`./src/templates/page.js`),
            context: {
              title: item.node.title,
              data: item.node
            },
          })
        })
      })
  //   })
  // )
}


