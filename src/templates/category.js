import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Alert from '../components/Alert'

const Category = ({ data }) => {
  const { products } = data
  return (
    <Layout>
      {
        products.edges.length === 0 && (
        <Alert title='Ops...' >Nenhum produto disponível nessa categoria.</Alert>
      )}
      <div className='flex flex-wrap'>
        {
          products.edges.map(product => {
            return (
              <div key={product.node.slug} className="w-1/3 m-4 overflow-hidden shadow-lg border-gray-100 border-2 hover:border-black hover:shadow-2xl">
                <Link to={'/'+product.node.slug}>
                  <img className="w-full" src={product.node.images[0].resize.src} alt="Sunset in the mountains" />
                </Link>
                <div className="px-6 py-4">
                  <Link to={'/'+product.node.slug}>
                    <div className="text-center font-bold text-xl mb-2">{product.node.product}</div>
                  </Link>
                  <p className="text-center text-gray-700 text-base">
                    descrição
                  </p>
                </div>
                <div className="flex items-center px-6 py-4">
                  <span className="flex-1 text-center inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-12 ml-12">Add to cart</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    products: allContentfulProduct(filter: {categories: {elemMatch: {slug: {eq: $slug}}}}) {
      edges {
        node {
          product
          slug
          images {
            description
            resize(width: 480, height: 320) {
              src
            }
          }
        }
      }
    }
  }
`

export default Category
