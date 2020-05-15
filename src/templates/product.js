import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { useCart } from '../lib/CartContext'

const ShowProductInfo = ({ product }) => {
  const cart = useCart()
  const addToCart = () => {
    cart.addToCart(product, 1)
  }
  return (
    <div className='flex'>
      <div className='w-2/3'>
        <img alt={product.product} src={product.images[0].resize.src} />
      </div>
      <div className='w-1/3 p-4'>
        <h2 className='text-xl font-bold'>{product.product}</h2>
        <input type='text' placeholder='Quantidade' />
        <br />
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  )
}

const Product = ({ data }) => {
  const { product } = data
  return (
    <Layout>
      <ShowProductInfo product={product} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    product: contentfulProduct(slug: {eq: $slug}) {
      product
      slug
      price
      images {
        resize(height: 1000, width: 1000) {
          src
        }
      }
    }
  }
`

export default Product