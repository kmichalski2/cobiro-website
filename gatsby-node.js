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
                ... on DatoCmsContactPerson {
                  bgColor {
                    hex
                  }
                  personEmail
                  personName
                  personWorkTitle
                  sectionTitle
                  textColor
                  personImage {
                    url
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
                ... on DatoCmsMediaDownload {
                    mediaDownloadCardText
                    mediaDownloadCardTitle
                    mediaDownloadFiles
                    mediaDownloadIcon {
                      url
                      fluid {
                        width
                        height
                        srcSet
                        base64
                        aspectRatio
                        src
                        sizes
                      }
                    }
                    mediaDownloadText
                    mediaDownloadTitle
                  }
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
                  secondaryLinkTitle
                  secondaryLink {
                    ... on DatoCmsPage {
                      slug
                    }
                    ... on DatoCmsBlogPage {
                      slug
                    }
                  }
                  secondaryExternalLinkUrl
                  alignment
                  bgColor {
                    hex
                  }
                  icon {
                    url
                    fixed(height: 100) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                    }
                  }
                  iconTitle
                  textColor
                  imageToEdges
                  image {
                    path
                    url
                    alt
                    width
                    height
                    fluid(maxWidth: 1200, imgixParams: {q: 50}) {
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
                  formType
                  footnote
                  topGradiantColor {
                    hex
                  }
                  bottomGradiantColor {
                    hex
                  }
                  bgColor {
                    hex
                  }
                  textColor
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
                  bgColor {
                    hex
                  }
                  textColor
                  title
                  text
                  bigIcons
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
                  bgColor {
                    hex
                  }
                  textColor
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
                ... on DatoCmsGallery {
                  title
                  text
                  primaryLinkTitle
                  secondaryLinkTitle
                  primaryExternalLink
                  secondaryExternalLink
                  primaryInternalLink {
                    slug
                  }
                  secondaryInternalLink {
                    slug
                  }
                  images {
                    alt
                    url
                    fluid(maxWidth: 400) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                      sizes
                    }
                  }
                  bgColor {
                    hex
                  }
                  textColor
                }
                ... on DatoCmsBlogLatest {
                  title
                  text
                  bgColor {
                    hex
                  }
                  textColor
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
                  testimonialBgColor
                  testimonialColor {
                    hex
                  }
                  testimonialTextColor
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
                  icon {
                    url
                    alt
                    fixed(width: 160) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                    }
                  }
                  ctaBgColor
                  textColor
                  ctaBackgroundColor {
                    hex
                  }
                  backgroundImage {
                    url
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
                  title
                  text
                  linkTitle
                  link {
                    slug
                  }
                  secondaryLinkTitle
                  secondaryLink {
                    ... on DatoCmsPage {
                      slug
                    }
                    ... on DatoCmsBlogPage {
                      slug
                    }
                  }
                  secondaryExternalLinkUrl
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
                  textColor
                  quotesBgColor
                  quotesColor {
                    hex
                  }
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
                        fixed(width: 48) {
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
                        fixed(width: 48) {
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
                ... on DatoCmsPricingTable {
                  columnHeadings
                  pricingTables {
                    row {
                      columns
                      labelText
                      labelColor
                      nestedRow
                      rowName
                    }
                    tableName
                    icon {
                      url
                      alt
                      fixed(height: 10) {
                        aspectRatio
                        height
                        sizes
                        src
                        srcSet
                        width
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
                  title
                  text
                  narrowImage
                  videoEmbedCode
                  bgColor {
                    hex
                  }
                  textColor
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
                  featuresWIcon {
                    features {
                      ... on DatoCmsFeatureItem {
                        icon {
                          url
                        }
                        text
                      }
                    }
                  }
                }
                ... on DatoCmsFormSection {
                  text
                  title
                  formPlacement
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
                  formType
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
                  bgColor {
                    hex
                  }
                  textColor
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


      await graphql(`
      {
        allDatoCmsBlogPost(sort: {fields: meta___publishedAt}, filter: {title: {ne: null}}) {
          nodes {
            locale
            title
            seoTags {
              title
              description
            }
            slug
            featuredImage {
              fluid {
                aspectRatio
                width
                height
                src
                srcSet
                sizes
              }
              alt
            }
            subtitle
            content {
              ... on DatoCmsTextSection {
                __typename
                text
                internal {
                  type
                }
              }
              ... on DatoCmsImageSection {
                __typename
                image {
                  url
                  alt
                  fluid {
                    aspectRatio
                    height
                    src
                    srcSet
                    width
                    sizes
                  }
                }
                credits
              }
              ... on DatoCmsQuoteSection {
                __typename
                quote
                quotedPerson
                bgColor {
                  hex
                }
                textColor
              }
              ... on DatoCmsCtaSection {
                __typename
                externalLink
                gradiantBackground
                bottomColor {
                  hex
                }
                topColor {
                  hex
                }
                bgColor {
                  hex
                }
                textColor
                linkExternal
                linkInternal {
                  ... on DatoCmsBlogPost {
                    slug
                    internal {
                      type
                    }
                  }
                  ... on DatoCmsPage {
                    slug
                    internal {
                      type
                    }
                  }
                }
                linkTitle
                text
                title
              }
            }
            writer
            writerImage {
              fixed(width: 48) {
                width
                height
                srcSet
                base64
                aspectRatio
                src
              }
              url
              alt
            }
            category {
              category
              slug
            }
            readLength
            meta {
              createdAt(formatString: "MMMM DD")
              publishedAt(formatString: "MMMM DD")
            }
            internal {
              content
            }
          }
        }
        datoCmsBlogPage {
          quote
          quotedPerson
          quoteImage {
            alt
            url
            fluid {
              aspectRatio
              height
              sizes
              src
              srcSet
              width
            }
          }
          quoteTextColor
          quoteBgColor {
            hex
          }
          ctaLinks {
            ... on DatoCmsInternalLink {
              internalLink {
                ... on DatoCmsPage {
                  slug
                  __typename
                }
                ... on DatoCmsBlogPost {
                  slug
                  __typename
                }
              }
              linkTitle
            }
            ... on DatoCmsExternalLink {
              linkTitle
              externalLink
            }
          }
          footerCtaText
          footerCtaTitle
          topGradiantColor {
            hex
          }
          bottomGradiantColor {
            hex
          }
          ctaBgColor {
            hex
          }
          footerCtaTextColor
        }
        allDatoCmsBlogCategory(filter: {category: {ne: null}}) {
          nodes {
            category
            slug
            locale
          }
        }
      }      
      `).then(result => {

        let posts = []

        let otherPosts = []

        for(i = 0; i < 3 && i < result.data.allDatoCmsBlogPost.nodes.length; i++) {
          otherPosts.push(result.data.allDatoCmsBlogPost.nodes[i])
        }

        result.data.allDatoCmsBlogPost.nodes.forEach(async function(item) {
          const locale = item.locale
          const prefix = locale !== 'en' ? `blog/${locale}` : 'blog'
          let p = `${prefix}/${item.slug ? item.slug : ''}`
          // let p = item.node.homepage ? '/' : `/${item.node.slug}`
          posts.push(item)

          

          if(item.title) {
            await createPage({
              path: p,
              component: path.resolve(`./src/templates/blogPost/blogPost.js`),
              context: {
                title: item.title,
                featuredImage: item.featuredImage,
                subtitle: item.subtitle,
                content: item.content,
                writer: item.writer,
                writerImage: item.writerImage,
                category: item.category,
                readLength: item.readLength,
                date: item.meta.publishedAt || item.meta.createdAt,
                ctaBackgroundColor: result.data.datoCmsBlogPage.ctaBgColor,
                textColor: result.data.datoCmsBlogPage.footerCtaTextColor,
                topGradiantColor: result.data.datoCmsBlogPage.topGradiantColor ? result.data.datoCmsBlogPage.topGradiantColor.hex : "#004BD5",
                bottomGradiantColor: result.data.datoCmsBlogPage.bottomGradiantColor ? result.data.datoCmsBlogPage.bottomGradiantColor.hex : "#62C9FF",
                footerCtaTitle: result.data.datoCmsBlogPage.footerCtaTitle,
                footerCtaText: result.data.datoCmsBlogPage.footerCtaText,
                ctaLinks: result.data.datoCmsBlogPage.ctaLinks,
                otherPosts: otherPosts
              },
            })
          }
        })

        result.data.allDatoCmsBlogCategory.nodes.forEach(async function(item) {
          const locale = item.locale
          const prefix = locale !== 'en' ? `blog/${locale}` : 'blog'
          let p = `${prefix}/${item.slug ? item.slug : ''}`

          filteredPosts = []

          posts.filter(post => post.category.some(cat => cat.category === item.category)).forEach(blogItem => {
            filteredPosts.push({
                title: blogItem.title,
                featuredImage: blogItem.featuredImage,
                subtitle: blogItem.subtitle,
                category: blogItem.category,
                readLength: blogItem.readLength,
                slug: blogItem.slug
            })
          })


          await createPage({
            path: p,
              component: path.resolve(`./src/templates/blogCategory/blogCategory.js`),
              context: {
                title: item.category,
                posts: filteredPosts,
                topGradiantColor: result.data.datoCmsBlogPage.topGradiantColor ? result.data.datoCmsBlogPage.topGradiantColor.hex : "#004BD5",
                bottomGradiantColor: result.data.datoCmsBlogPage.bottomGradiantColor ? result.data.datoCmsBlogPage.bottomGradiantColor.hex : "#62C9FF",
                bgColor: result.data.datoCmsBlogPage.ctaBgColor,
                textColor: result.data.datoCmsBlogPage.footerCtaTextColor,
                footerCtaTitle: result.data.datoCmsBlogPage.footerCtaTitle,
                footerCtaText: result.data.datoCmsBlogPage.footerCtaText,
                ctaLinks: result.data.datoCmsBlogPage.ctaLinks,
                quote: result.data.datoCmsBlogPage.quote,
                person: result.data.datoCmsBlogPage.quotedPerson, 
                quoteBgColor: result.data.datoCmsBlogPage.quoteBgColor, 
                quoteImage: result.data.datoCmsBlogPage.quoteImage, 
                testimonialTextColor: result.data.datoCmsBlogPage.quoteTextColor
              }
          })
        })
      })

}


