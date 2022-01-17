
# Strapi + nextjs notion clone

<https://strapi.io/blog/how-to-build-a-notion-clone-with-strapi-and-next-js>
<https://strapi.io/blog/how-to-build-a-notion-clone-with-strapi-and-next-js-part-2>

Some things to note: the graphql schema changed in their most recent version I believe, and this basically invalidated all the tutorial graphql code lol. Really weaksauce on the documentation unfortunately.

```graphql
mutation createPage {
  createPage(data: {
      title: "New Page"
  }) {
    data {
      id,
      attributes {
        title
      }
    }
  }
}

query getOnePage {
  page(id:1) {
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
}

mutation updatePage {
  updatePage(
    id:"1",

    data: {
      title: "New Title"
    }
  ) {
    data {
      id
      attributes {
        title
      }
    }
  }
}

query getAllPages {
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
}
```
