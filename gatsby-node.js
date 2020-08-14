const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require('lodash');

require("dotenv").config({
  path: `.env`,
})


exports.createPages = async function({ graphql, actions }) {
  const { createPage } = actions
  // const locales = ["en", "es", "da", "nb", "sv", "de", "fr", "es-ES", "it", "pt-PT", "pl-PL"]

  // locales.forEach(locale => {
  //   const prefix = locale === "en" ? "" : `/${locale}`
  //   createPage({
  //     path: `${prefix}/`,
  //     component: path.resolve(`./src/templates/page.js`),
  //     context: { locale },
  //   })
  // })

let locales
  await graphql(`
  query LanguagesPublished {
    allDatoCmsLanguage {
      nodes {
        locale
        title
        published
      }
    }
  }`).then(result => {
    if(process.env.NODE_ENV === 'production' || process.env.GATSBY_ENVIRONMENT === 'production') {
      locales = [...result.data.allDatoCmsLanguage.nodes.filter(lang => lang.published)]
    } else {
      locales = [...result.data.allDatoCmsLanguage.nodes]
    }
  })

  Promise.all(
    locales.map(locale => {
    graphql(`
      {
        allDatoCmsPage(filter: {locale: {eq: "${locale.locale}"}}) {
          edges {
            node {
              title
              homepage
              slug
              hideSignupButtons
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
              seoMetaTags {
                tags
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
                  linkTitle
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
                    linkTitle
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
                  imagesInsteadOfIcons
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
                ... on DatoCmsExpandablePersonsCard {
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
                  formEndpoint
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
        result.data.allDatoCmsPage.edges.filter((item) => item.node.title).forEach(item => {
          const curLocale = item.node.locale
          const prefix = curLocale !== 'en' ? curLocale : ''
          let p = `${prefix}/${item.node.slug ? item.node.slug : ''}`
          // let p = item.node.homepage ? '/' : `/${item.node.slug}`
          actions.createPage({
            path: p,
            component: path.resolve(`./src/templates/page.js`),
            context: {
              title: item.node.title,
              data: item.node,
              locales: item.node._allSlugLocales.filter(locale => locales.find(l => l.locale === locale.locale)).map(locale => ({...locale, value: locale.locale ==! 'en' ? `${locale.locale}/${locale.value}` : locale.value, title: locales.find(l => l.locale === locale.locale).title }))
            },
          })
        })
      })
    }))


      await graphql(`
      {
        allDatoCmsBlogPost(sort: {fields: date}, filter: {title: {ne: null}}) {
          nodes {
            _allSlugLocales {
              locale
              value
            }
            locale
            title
            date
            seoTags {
              title
              description
            }
            seoMetaTags {
              tags
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
              _allCategoryLocales {
                locale
                value
              }
              _allSlugLocales {
                locale
                value
              }
            }
            readLength
            locale

            meta {
              createdAt(formatString: "MMMM DD")
              publishedAt(formatString: "MMMM DD")
            }
            internal {
              content
            }
          }
        }
        allDatoCmsBlogPage {
          nodes {
            locale
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
            otherPostsTitle
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
        }
        allDatoCmsBlogCategory(filter: {category: {ne: null}}) {
          nodes {
            category
            slug
            locale
            _allCategoryLocales {
              locale
              value
            }
            _allSlugLocales {
              locale
              value
            }
          }
        }
      }      
      `).then(result => {

        let posts = []

        


        

        result.data.allDatoCmsBlogPost.nodes.forEach(async function(item) {
          
          const createBlogPostPage = async (item, p, locale, category) => {
            if(item.title) {
              const localBlogPage = result.data.allDatoCmsBlogPage.nodes.find(bp => bp.locale === locale)

              let otherPosts = []

        const localPosts = result.data.allDatoCmsBlogPost.nodes.filter(post => {
           
          if(post.locale === locale) {
            return true
          } else {
           if(!post._allSlugLocales.some(sl => sl.locale === locale)) {
               return true
           } else {
             return false
           }
          }
        }).map(post => {
          if(post.locale !== locale && post.locale === 'en') {
            let newPost = _.cloneDeep(post)
    
            newPost.locale = locale
            newPost.category.map(c => {
              if(c.locale !== locale) {
    
    
                let newCat = c
    
                c._allCategoryLocales.map(cl => {
                  if(cl.locale === locale) {
                   newCat.category = cl.value
                  }
                })
    
                c._allSlugLocales.map(cl => {
                 if(cl.locale === locale) {
                   newCat.slug = cl.value
                 }
               })
                
    
               return newCat
              } else {
                return c
              }
            })
    
            return newPost
          } else {
            return post
          }
        })

        for(i = 0; i < 3 && i < result.data.allDatoCmsBlogPost.nodes.length; i++) {
          otherPosts.push(localPosts[i])
        }

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
                  category: category || item.category,
                  readLength: item.readLength,
                  date: item.date,
                  ctaBackgroundColor: localBlogPage.ctaBgColor,
                  textColor: localBlogPage.footerCtaTextColor,
                  topGradiantColor: localBlogPage.topGradiantColor ? localBlogPage.topGradiantColor.hex : "#004BD5",
                  bottomGradiantColor: localBlogPage.bottomGradiantColor ? localBlogPage.bottomGradiantColor.hex : "#62C9FF",
                  footerCtaTitle: localBlogPage.footerCtaTitle,
                  footerCtaText: localBlogPage.footerCtaText,
                  ctaLinks: localBlogPage.ctaLinks,
                  otherPostsTitle: localBlogPage.otherPostsTitle,
                  otherPosts: otherPosts,
                  seoMetaTags: item.seoMetaTags,
                  locale: locale
                },
              })
              
            }
          }


          await locales.map(l => {
            if(!item._allSlugLocales.find(sl => sl.locale === l.locale)) {
              // If a published locale does not exist in __allSlugLocales
              const locale = l.locale
              const prefix = locale !== 'en' ? `${locale}/blog` : 'blog'
              let p = `${prefix}/${item.slug ? item.slug : ''}`
              const category = item.category.map(c => { 
                const currCatLocale = c._allCategoryLocales.find(cl => cl.locale === locale)
                if (currCatLocale) {
                  const categoryObj = {category: currCatLocale.value, slug: result.data.allDatoCmsBlogCategory.nodes.find(bc => bc.category === currCatLocale.value).slug}
                  
                  // item.category = categoryObj

                  return categoryObj
                } else {
                  return item.category
                }
              })
              
              posts.push(item)
              createBlogPostPage(item, p, locale, category)
            } else {
              const locale = item.locale
              const prefix = locale !== 'en' ? `${locale}/blog` : 'blog'
              let p = `${prefix}/${item.slug ? item.slug : ''}`
              // let p = item.node.homepage ? '/' : `/${item.node.slug}`

              posts.push(item)
              createBlogPostPage(item, p, locale)
            }
          })
        })

        result.data.allDatoCmsBlogCategory.nodes.forEach(async function(item) {
          const locale = item.locale
          const prefix = locale !== 'en' ? `${locale}/blog` : 'blog'
          let p = `${prefix}/${item.slug ? item.slug : ''}`

          filteredPosts = []
          // posts.filter(post => {
          //   if(post.category.some(cat => cat.category === item.category)) {
          //     return true
          //   } else if (item._allCategoryLocales.find(cl => cl.value === post.category)) {
          //     return true
          //   }
          // }
            
          // ).forEach(blogItem => {
          //   filteredPosts.push({
          //     title: blogItem.title,
          //     featuredImage: blogItem.featuredImage,
          //     subtitle: blogItem.subtitle,
          //     category: blogItem.category,
          //     readLength: blogItem.readLength,
          //     slug: blogItem.slug
          // })
          // })

          // || cat.category._allCategoryLocales.find(cl => cl.value === item.category)
          const localPosts = result.data.allDatoCmsBlogPost.nodes.filter(post => {
           
            if(post.locale === locale) {
              return true
            } else {
             if(!post._allSlugLocales.some(sl => sl.locale === locale)) {
                 return true
             } else {
               return false
             }
            }
          }).map(post => {
            if(post.locale !== locale && post.locale === 'en') {
              let newPost = _.cloneDeep(post)
 
              newPost.locale = locale
              newPost.category.map(c => {
                if(c.locale !== locale) {
 
 
                  let newCat = c
 
                  c._allCategoryLocales.map(cl => {
                    if(cl.locale === locale) {
                     newCat.category = cl.value
                    }
                  })
 
                  c._allSlugLocales.map(cl => {
                   if(cl.locale === locale) {
                     newCat.slug = cl.value
                   }
                 })
                  
 
                 return newCat
                } else {
                  return c
                }
              })
 
              return newPost
            } else {
              return post
            }
          }).filter(p => {
            if(p.category.some(cat => cat._allCategoryLocales.find(cl => cl.value === item.category))) {
              return true
            } else {
              return false
            }
          })

          // posts.filter(post => post.category.some(cat => cat.category === item.category)).filter(post => post.locale === item.locale).forEach(blogItem => {

          //   filteredPosts.push({
          //       title: blogItem.title,
          //       featuredImage: blogItem.featuredImage,
          //       subtitle: blogItem.subtitle,
          //       category: blogItem.category,
          //       readLength: blogItem.readLength,
          //       slug: blogItem.slug
          //   })
          // })

          const localBlogPage = result.data.allDatoCmsBlogPage.nodes.find(bp => bp.locale === locale)

          await createPage({
            path: p,
              component: path.resolve(`./src/templates/blogCategory/blogCategory.js`),
              context: {
                title: item.category,
                posts: localPosts,
                topGradiantColor: localBlogPage.topGradiantColor ? localBlogPage.topGradiantColor.hex : "#004BD5",
                bottomGradiantColor: localBlogPage.bottomGradiantColor ? localBlogPage.bottomGradiantColor.hex : "#62C9FF",
                bgColor: localBlogPage.ctaBgColor,
                textColor: localBlogPage.footerCtaTextColor,
                footerCtaTitle: localBlogPage.footerCtaTitle,
                footerCtaText: localBlogPage.footerCtaText,
                ctaLinks: localBlogPage.ctaLinks,
                quote: localBlogPage.quote,
                person: localBlogPage.quotedPerson, 
                quoteBgColor: localBlogPage.quoteBgColor, 
                quoteImage: localBlogPage.quoteImage, 
                testimonialTextColor: localBlogPage.quoteTextColor,
                locale: item.locale
              }
          })
        })
      })




      /**  BLOG PAGE **/

      await graphql(`
      query BlogQuery {
        allDatoCmsBlogPage(filter: {title: {ne: null}}) {
          nodes {
            title
            locale
            _allSlugLocales {
              locale
              value
            }
            seoTags {
              title
              description
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
            searchTitle
            footerCtaText
            footerCtaTitle
            promiseList
            footerCtaTextColor
            ctaBgColor {
              hex
            }
            categoriesTextColor
            categoriesBgColor {
              hex
            }
            categoriesTitle
            categoriesText
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
            topGradiantColor {
              hex
            }
            bottomGradiantColor {
              hex
            }
            promiseSignature {
              fixed(width: 150) {
                aspectRatio
                srcSet
                src
                width
                height
                sizes
              }
              alt
              url
            }
            promiseSignatureTitle
            promiseTitle
            subtitle
          }
        }
        allDatoCmsBlogPost(filter: {title: {ne: null}}, sort: {fields: meta___createdAt, order: DESC}) {
            nodes {
              locale
              title
              readLength
              subtitle
              slug
              writer
              category {
                category
                slug
                _allCategoryLocales {
                  locale
                  value
                }
                _allSlugLocales {
                  locale
                  value
                }
              }
              _allSlugLocales {
                locale
                value
              }
              featuredImage {
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
            }
          }
        allDatoCmsBlogCategory(filter: {category: {ne: null}}) {
            nodes {
              category
              slug
              locale
            }
          }
          localSearchBlogposts {
            store
            index
          }
      }
      
      `).then(result => {

        result.data.allDatoCmsBlogPage.nodes.forEach(async function(item) {
          const locale = item.locale
          const prefix = locale !== 'en' ? locale : ''
          let p = `${prefix}/${item.slug ? item.slug : 'blog'}`
          
          const page = item

          /*
          using _allSlugLocales check if el exists in current language. If not use en.
          
          .map(cat => cat._allSlugLocales.find(sl => sl.locale === locale) ? || cat._allSlugLocales.find(sl => sl.locale === 'en')

          .filter(n => locales.find(l => l.locale === n.locale)).
          */
         const localPosts = result.data.allDatoCmsBlogPost.nodes.filter(post => {
           
           if(post.locale === locale) {
             return true
           } else {
            if(!post._allSlugLocales.some(sl => sl.locale === locale)) {
                return true
            } else {
              return false
            }
           }
         }).map(post => {
           if(post.locale !== locale && post.locale === 'en') {
             let newPost = _.cloneDeep(post)

             newPost.locale = locale
             newPost.category.map(c => {
               if(c.locale !== locale) {


                 let newCat = c

                 c._allCategoryLocales.map(cl => {
                   if(cl.locale === locale) {
                    newCat.category = cl.value
                   }
                 })

                 c._allSlugLocales.map(cl => {
                  if(cl.locale === locale) {
                    newCat.slug = cl.value
                  }
                })
                 

                return newCat
               } else {
                 return c
               }
             })

             return newPost
           } else {
             return post
           }
         })

         await locales.map(async l => {
          if(l.locale === item.locale) {
            if(item.title) {
              
              

              await createPage({
                path: p,
                component: path.resolve(`./src/templates/blogPage/blogPage.js`),
                context: {
                  page: page,
                  posts: localPosts,
                  categories: result.data.allDatoCmsBlogCategory.nodes.filter(n => n.locale === locale),
                  locales: item._allSlugLocales.filter(locale => locales.find(l => l.locale === locale.locale)).map(locale => ({...locale, value: locale.locale ==! 'en' ? `${locale.locale}/${locale.value}` : locale.value, title: locales.find(l => l.locale === locale.locale).title }))
                },
              })
            }
          }
        })
          
        })
      })
    }
