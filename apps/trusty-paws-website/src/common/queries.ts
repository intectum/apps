import { graphql } from '../graphql/gql';

export const PageQuery = graphql(`
  query PageQuery($path: String!) {
    pageCollection(where: { path: $path }, limit: 1) {
      items {
        title
        content {
          json
          links {
            entries {
              inline {
                sys {
                  id
                }
                __typename
              }
              block {
                sys {
                  id
                }
                __typename
                ... on CallToAction {
                  title
                  description
                  link
                  linkLabel
                }
                ... on ContactForm {
                  title
                }
                ... on Hero {
                  title
                  content {
                    json
                  }
                  image {
                    title
                    url
                  }
                  imageOnLeft
                  theme
                }
                ... on Services {
                  title
                  servicesCollection {
                    items {
                      sys {
                        id
                      }
                      title
                      description
                    }
                  }
                }
                ... on StepByStep {
                  title
                  description
                  stepsCollection {
                    items {
                      sys {
                        id
                      }
                      title
                      description
                      image {
                        title
                        url
                      }
                      icon
                    }
                  }
                }
                ... on Testimonials {
                  title
                  testimonialsCollection {
                    items {
                      sys {
                        id
                      }
                      author
                      link
                      content
                    }
                  }
                }
              }
            }
            assets {
              block {
                sys {
                  id
                }
                url
                title
              }
            }
          }
        }
      }
    }
  }
`);
