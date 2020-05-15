import React, { useState, useEffect } from 'react'
import algoliasearch from 'algoliasearch/lite'
import '../assets/styles.css'

import Layout from '../components/Layout'
import { InstantSearch, SearchBox, connectHits, PoweredBy, connectSearchBox, Stats, connectStats } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
const contentful = require('contentful')

const appId = 'BMTIE850GI'
const key = 'c95143f2e88d73b40746a5c464d48685'
const index = 'produtos'

const searchClient = algoliasearch(appId, key)
const contentfulClient = contentful.createClient({
  space: 'fvqr4f6g2179',
  accessToken: 'XZRxBYLNAeB-m1at72HKFgSUnHX9dMJyPJ5MhckLrpc'
})

const Image = ({ imgs }) => {
  const mainImg = imgs[0]
  const [imgUrl, setImgUrl] = useState('')
  useEffect(() => {
    const findImg = async() => {
      const asset = await contentfulClient.getAsset(mainImg.sys.id)
      setImgUrl(asset.fields.file.url)
    }
    findImg()
  }, [imgs])
  if (imgUrl === '') {
    return <span>Carregando...</span>
  }
  return (
    <img
      className="w-full"
      src={imgUrl}
      alt="Sunset in the mountains"
     />
  )
}

const Hit = ({ hit }) => {
  const product = hit.fields
  return (
    <div key={product.slug['en-US']} className="w-1/3 m-4 overflow-hidden shadow-lg border-gray-100 border-2 hover:border-black hover:shadow-2xl">
      <Link to={'/'+product.slug['en-US']}>
        <Image imgs={product.images['en-US']} />
      </Link>
      <div className="px-6 py-4">
        <Link to={'/'+product.slug['en-US']}>
          <div className="text-center font-bold text-xl mb-2">{product.product['en-US']}</div>
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
}

const Produtos = ({ hits }) => {
  return (
    <div className='flex flex-wrap'>
      { hits.map(hit => <Hit hit={hit} />)}
    </div>
  )
}

const ConnectedProdutos = connectHits(Produtos)

const CaixaBusca = ({ currentRefinement, refine }) => {
  return (
    <div className="pt-2 relative mx-auto inline-block text-gray-600">
      <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type='search' value={currentRefinement} onChange={e => refine(e.currentTarget.value)} name="search" placeholder="Search" />
      <span className="absolute right-0 top-0 mt-5 mr-4">
        <svg className="text-gray-600 h-4 w-4 fill-current"
          version="1.1" id="Capa_1" x="0px" y="0px"
          viewBox="0 0 56.966 56.966" style={{enableBackground: 'new 0 0 56.966 56.966;'}}
          width="512px" height="512px">
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </span>
    </div>
  )
}

const ConnectedCaixaBusca = connectSearchBox(CaixaBusca)

const Estatisticas = ({ nbHits }) => {
  if (nbHits === 0) {
    return <p>Nenhum produto encontrado</p>
  } else if (nbHits === 1){
    return <p>{nbHits} produto encontrado</p>
  } else {
    return <p>{nbHits} produtos encontrados</p>
  }
}

const ConnectedEstatisticas = connectStats(Estatisticas)

const Index = () => {
  return (
    <Layout>
      <h1>Home</h1>
      <InstantSearch indexName={index} searchClient={searchClient}>
          <ConnectedCaixaBusca />
          <ConnectedEstatisticas />

          <ConnectedProdutos />
          <PoweredBy />
      </InstantSearch>
    </Layout>
  )
}

export default Index
