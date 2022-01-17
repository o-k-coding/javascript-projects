export const Mutations = {
  Page: {
    createPage: `mutation createPage($title: String!) {
      createPage(data: {
          title: $title
      }) {
        data {
          id,
          attributes {
            title
          }
        }
      }
    }`,

    updatePage: `mutation updatePage($id: ID!, $title: String!) {
      updatePage(
        id: $id,

        data: {
          title: $title
        }
      ) {
        data {
          id
          attributes {
            title
          }
        }
      }
    }`,

    deletePage: `
      mutation deletePage($id: ID!) {
        deletePage(id:$id) {
          data {
            id,
            attributes {
              title
            }
          }
        }
      }
    `,
  },

  ContentBlock: {
    createContentBlock: `mutation createContentBlock($content: String!, $pageId: ID!) {
      createContentBlock(data: {
          content: $content,
          page: $pageId
      }) {
        data {
          id,
          attributes {
            page {
              data {
                id
              }
            },

            content,

          }
        }
      }
    }`,

    updateContentBlock: `mutation updateContentBlock( $id: ID!, $content: String!) {
      updateContentBlock(
        id: $id,

        data: {
          content: $content
        }
      ) {
        data {
          id
          attributes {
            content
          }
        }
      }
    }`,

    deletePage: `
      mutation deletePage($id: ID!) {
        deletePage(id:$id) {
          data {
            id,
            attributes {
              content
            }
          }
        }
      }
    `,
  },
};

export const Queries = {
  Page: {
    getOne: `query getOnePage($id: ID!) {
      page(id: $id) {
        data {
          id,

          attributes {
            title,
            content_blocks {
              data {
                id,
                attributes {
                  content
                }
              }
            }
          }
        }
      }
    }`,

    getAll: `query getAllPages {
      pages(
        pagination:{ start:0, limit: 10 },
        publicationState: PREVIEW
      ) {
        data {
          id,
          attributes {
            title
          }
        }
      }
    }`,
  },

  ContentBlock: {
    getOne: `query getOnePage($id: ID!) {
      page(id: $id) {
        data {
          id,

          attributes {
            title,
            content_blocks {
              data {
                id,
                attributes {
                  content
                }
              }
            }
          }
        }
      }
    }`,

    getAll: `query getAllPages {
      pages(
        pagination:{ start:0, limit: 10 },
        publicationState: PREVIEW
      ) {
        data {
          id,
          attributes {
            title
          }
        }
      }
    }`,
  },
};
