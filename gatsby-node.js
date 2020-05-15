const path = require('path')

exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions
  
  const { data } = await graphql(`
    query MyQuery {
      categories: allContentfulCategory {
        edges {
          node {
            category
            slug
          }
        }
      }
      products: allContentfulProduct {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const { categories, products } = data
  
  const categoryTemplate = path.resolve('src/templates/category.js')
  categories.edges.forEach(category => {
    createPage({
      path: '/' + category.node.slug,
      component: categoryTemplate,
      context: {
        slug: category.node.slug
      }
    })
  })

  const productTemplate = path.resolve('src/templates/product.js')
  products.edges.forEach(product => {
    createPage({
      path: '/' + product.node.slug,
      component: productTemplate,
      context: {
        slug: product.node.slug
      }
    })
  })
}
